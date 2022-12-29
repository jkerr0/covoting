package pl.jkerro.covoting.voting_session;

import java.util.List;
import java.util.Optional;

public interface VotingSessionService {

    void createVotingSession(VotingSession session);

    void updateVotingSession(VotingSession session);

    List<VotingSession> findAllVotingSessions();

    List<VotingSession> findPublishedVotingSessions();

    void deleteSessionById(Integer id);

    List<Voting> findVotingListBySession(Integer votingSessionId);

    Optional<VotingSession> findVotingSessionById(Integer id);

    Optional<CurrentVotingInfo> findVotingSessionCurrentVotingInfoById(Integer id);

    Optional<Voting> proceedToNextVoting(Integer id);
}
