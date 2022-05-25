package pl.jkerro.covoting.votingSession;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class VotingSessionService {

    private final VotingSessionRepository votingSessionRepository;

    public void createVotingSession(VotingSession session) {
        votingSessionRepository.save(session);
    }

    public void updateVotingSession(VotingSession session) {
        if (session.getId() == null) {
            throw new IllegalArgumentException("id cannot be null");
        }
        votingSessionRepository.save(session);

    }

    public List<VotingSession> findAllVotingSessions() {
        return votingSessionRepository.findAll();
    }
}
