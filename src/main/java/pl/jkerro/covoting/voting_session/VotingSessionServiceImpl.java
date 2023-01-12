package pl.jkerro.covoting.voting_session;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.jkerro.covoting.users.ApplicationUser;
import pl.jkerro.covoting.users.UserRepository;
import pl.jkerro.covoting.voting_session.model.*;
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

    @Override
    public void createVotingSession(VotingSession session) {
        session.setDefaultCurrentVotingSeq();
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

    @Override
    public void deleteSessionById(Integer id) {
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
                        .build());
    }

    @Transactional
    @Override
    public Optional<Voting> proceedToNextVoting(Integer sessionId) {
        Optional<VotingSession> session = votingSessionRepository.findById(sessionId);
        Optional<Voting> voting = session.flatMap(VotingSession::nextVoting);
        session.ifPresent(votingSessionRepository::save);
        return voting;
    }

    @Transactional
    @Override
    public void castVote(Integer sessionId, String email, VoteType voteType) {
        Integer currentVotingId = findVotingSessionCurrentVotingInfoById(sessionId)
                .map(CurrentVotingInfo::getVoting)
                .map(Voting::getId)
                .orElseThrow();

        ApplicationUser user = userRepository.findApplicationUserByEmail(email)
                .orElseThrow();

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
        ApplicationUser user = userRepository.findApplicationUserByEmail(email).orElseThrow();
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
}
