package pl.jkerro.covoting.voting_session.model;

import lombok.Builder;
import lombok.Value;

@Builder
@Value
public class VotingResult {
    String name;
    Integer forCount;
    Integer againstCount;
    Integer abstainCount;
    boolean accepted;
}
