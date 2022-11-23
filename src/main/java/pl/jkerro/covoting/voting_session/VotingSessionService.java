package pl.jkerro.covoting.voting_session;

import java.util.List;

public interface VotingSessionService {

    void createVotingSession(VotingSession session);

    void updateVotingSession(VotingSession session);

    List<VotingSession> findAllVotingSessions();

    void deleteSessionById(Integer id);
}
