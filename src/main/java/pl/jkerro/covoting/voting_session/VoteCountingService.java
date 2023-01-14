package pl.jkerro.covoting.voting_session;

import pl.jkerro.covoting.voting_session.model.VotingProgress;

public interface VoteCountingService {

    Integer getAllVotesCount(Integer votingId);

    Integer getVotesForCount(Integer votingId);

    Integer getVotesAgainstCount(Integer votingId);

    Integer getVotesAbstainedCount(Integer votingId);

    VotingProgress getVotingProgress(Integer votingId);
}
