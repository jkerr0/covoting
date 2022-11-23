package pl.jkerro.covoting.voting_session;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class VotingSessionServiceImpl implements VotingSessionService {

    private final VotingSessionRepository votingSessionRepository;

    @Override
    public void createVotingSession(VotingSession session) {
        votingSessionRepository.save(session);
    }

    @Override
    public void updateVotingSession(VotingSession session) {
        if (session.getId() == null) {
            throw new IllegalArgumentException("id cannot be null");
        }
        votingSessionRepository.save(session);

    }

    @Override
    public List<VotingSession> findAllVotingSessions() {
        return votingSessionRepository.findAll();
    }

    @Override
    public void deleteSessionById(Integer id) {
        votingSessionRepository.deleteById(id);
    }
}
