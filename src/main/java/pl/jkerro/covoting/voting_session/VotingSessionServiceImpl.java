package pl.jkerro.covoting.voting_session;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class VotingSessionServiceImpl implements VotingSessionService {

    private final VotingSessionRepository votingSessionRepository;
    private final VotingRepository votingRepository;

    @Override
    public void createVotingSession(VotingSession session) {
        votingSessionRepository.save(session);
        saveSessionVotingList(session);
    }

    @Transactional
    @Override
    public void updateVotingSession(VotingSession session) {
        if (session.getId() == null) {
            throw new IllegalArgumentException("id cannot be null");
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
    public CurrentVotingInfo findVotingSessionCurrentVotingInfoById(Integer id) {
        VotingSession session = votingSessionRepository.findById(id)
                .orElseThrow();

        return CurrentVotingInfo.builder()
                .voting(session.getCurrentVoting().orElse(null))
                .votingCount(session.getVotingList().size())
                .build();
    }
}
