package pl.jkerro.covoting.voting_session;

import lombok.Builder;
import lombok.Value;

@Builder
@Value
public class CurrentVotingInfo {
    Voting voting;
    Integer votingCount;
}
