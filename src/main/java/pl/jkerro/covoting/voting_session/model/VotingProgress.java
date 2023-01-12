package pl.jkerro.covoting.voting_session.model;

import lombok.Builder;
import lombok.Value;

@Builder
@Value
public class VotingProgress {
    Integer currentVotes;
    Integer maxVotes;
}
