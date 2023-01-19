package pl.jkerro.covoting.voting_session;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.jkerro.covoting.users.ApplicationUser;
import pl.jkerro.covoting.users.UserRepository;
import pl.jkerro.covoting.users.UserType;
import pl.jkerro.covoting.voting_session.model.*;
import pl.jkerro.covoting.voting_session.repositories.PresenceConfirmRepository;
import pl.jkerro.covoting.voting_session.repositories.VoteRepository;
import pl.jkerro.covoting.voting_session.repositories.VotingRepository;
import pl.jkerro.covoting.voting_session.repositories.VotingSessionRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class VotingSessionServiceImpl implements VotingSessionService {

    private final VoteCountingService voteCountingService;
    private final VotingSessionRepository votingSessionRepository;
    private final VotingRepository votingRepository;
    private final UserRepository userRepository;
    private final VoteRepository voteRepository;
    private final PresenceConfirmRepository presenceConfirmRepository;

    @Override
    public void createVotingSession(VotingSession session) {
        session.setDefaultCurrentVotingSeq();
        session.setIsClosed(false);
        votingSessionRepository.save(session);
        saveSessionVotingList(session);
    }

    @Transactional
    @Override
    public void updateVotingSession(VotingSession session) {
        if (session.getId() == null) {
            throw new IllegalArgumentException("id cannot be null");
        }
        votingSessionRepository.findById(session.getId())
                .map(VotingSession::getCurrentVotingSeq)
                .ifPresentOrElse(session::setCurrentVotingSeq,
                        session::setDefaultCurrentVotingSeq);

        if (session.getIsClosed() == null) {
            session.setIsClosed(false);
        }

        votingSessionRepository.save(session);
        votingRepository.deleteAllByVotingSession(session);
        saveSessionVotingList(session);
    }

    private void saveSessionVotingList(VotingSession session) {
        session.getVotingList()
                .forEach(voting -> voting.setVotingSession(session));
        votingRepository.saveAll(session.getVotingList());
    }

    @Override
    public List<VotingSession> findAllVotingSessions() {
        return votingSessionRepository.findAllByOrderByStartDateDesc();
    }

    @Override
    public List<VotingSession> findPublishedVotingSessions() {
        return votingSessionRepository.findAllByIsPublishedOrderByStartDateDesc(true);
    }

    @Transactional
    @Override
    public void deleteSessionById(Integer id) {
        presenceConfirmRepository.deleteAllByVotingSessionId(id);
        votingRepository.deleteAllByVotingSessionId(id);
        votingSessionRepository.deleteById(id);
    }

    @Override
    public List<Voting> findVotingListBySession(Integer votingSessionId) {
        return votingSessionRepository.findById(votingSessionId)
                .map(VotingSession::getVotingList)
                .orElse(List.of());
    }

    @Override
    public Optional<VotingSession> findVotingSessionById(Integer id) {
        return votingSessionRepository.findById(id);
    }

    @Override
    public Optional<CurrentVotingInfo> findVotingSessionCurrentVotingInfoById(Integer id) {
        return votingSessionRepository.findById(id)
                .map(session -> CurrentVotingInfo.builder()
                        .voting(session.getCurrentVoting().orElse(null))
                        .votingCount(session.getVotingList().size())
                        .sessionClosed(session.getIsClosed())
                        .build());
    }

    @Transactional
    @Override
    public Optional<Voting> proceedToNextVoting(Integer sessionId, String email) {
        boolean canUserProceed = userRepository.findApplicationUserByEmail(email)
                .map(ApplicationUser::getUserType)
                .filter(UserType.ADMIN::equals)
                .isPresent();
        if (!canUserProceed) {
            return Optional.empty();
        }
        VotingSession session = votingSessionRepository.findById(sessionId).orElseThrow();
        boolean lastVoting = session.getCurrentVotingSeq().equals(session.getVotingList().size());
        if (lastVoting) {
            session.setIsClosed(true);
            votingSessionRepository.save(session);
            return Optional.empty();
        } else {
            Optional<Voting> voting = session.nextVoting();
            votingSessionRepository.save(session);
            return voting;
        }
    }

    @Transactional
    @Override
    public void castVote(Integer sessionId, String email, VoteType voteType) {
        Integer currentVotingId = findCurrentVoting(sessionId).map(Voting::getId).orElseThrow();

        ApplicationUser user = getUser(email);

        Vote vote = Vote.builder()
                .userId(user.getId())
                .votingId(currentVotingId)
                .voteType(voteType)
                .weight(user.getVoteWeight())
                .build();

        voteRepository.save(vote);
    }

    @Transactional
    @Override
    public Optional<Voting> findCurrentVoting(Integer sessionId) {
        return findVotingSessionById(sessionId).flatMap(VotingSession::getCurrentVoting);
    }

    @Override
    public Optional<VotingProgress> findCurrentVotingProgress(Integer sessionId) {
        return findCurrentVoting(sessionId)
                .map(Voting::getId)
                .map(voteCountingService::getVotingProgress);
    }

    @Override
    public boolean canUserVote(String email, Integer sessionId) {
        ApplicationUser user = getUser(email);
        Voting voting = findCurrentVoting(sessionId).orElse(null);
        if (voting == null) {
            return false;
        }
        VoteId voteId = VoteId.builder()
                .votingId(voting.getId())
                .userId(user.getId())
                .build();

        return voteRepository.findById(voteId)
                .isEmpty();
    }

    @Override
    public ApplicationUser confirmPresence(String email, Integer sessionId) {
        ApplicationUser user = getUser(email);
        PresenceConfirm presenceConfirm = PresenceConfirm.builder()
                .userId(user.getId())
                .votingSessionId(sessionId)
                .build();

        presenceConfirmRepository.save(presenceConfirm);
        return user;
    }

    @Override
    public List<ApplicationUser> getPresentUsers(Integer sessionId) {
        return presenceConfirmRepository.findAllByVotingSessionId(sessionId)
                .stream()
                .map(PresenceConfirm::getUserId)
                .map(userRepository::findById)
                .flatMap(Optional::stream)
                .toList();
    }

    @Override
    public boolean isUserPresent(String email, Integer sessionId) {
        ApplicationUser user = getUser(email);
        PresenceConfirmId confirmId = PresenceConfirmId.builder()
                .userId(user.getId())
                .votingSessionId(sessionId)
                .build();

        return presenceConfirmRepository.findById(confirmId)
                .isPresent();
    }

    private ApplicationUser getUser(String email) {
        return userRepository.findApplicationUserByEmail(email).orElseThrow();
    }
}
