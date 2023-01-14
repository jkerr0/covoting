package pl.jkerro.covoting.voting_session;

import pl.jkerro.covoting.voting_session.model.VotingResult;

import java.util.List;

public interface VoteResultService {
    List<VotingResult> calculateResultsForVotingSession(Integer sessionId);

    VotingResult calculateResultForVoting(Integer votingId);
}
