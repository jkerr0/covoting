package pl.jkerro.covoting.voting_session;

import pl.jkerro.covoting.voting_session.model.CurrentVotingInfo;
import pl.jkerro.covoting.voting_session.model.VoteType;
import pl.jkerro.covoting.voting_session.model.Voting;
import pl.jkerro.covoting.voting_session.model.VotingSession;

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

    Integer castVote(Integer sessionId, String email, VoteType voteType);
}
