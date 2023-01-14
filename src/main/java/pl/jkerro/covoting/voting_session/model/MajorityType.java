package pl.jkerro.covoting.voting_session.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum MajorityType {
    SIMPLE( 0),
    ABSOLUTE( 50),
    EFFECTIVE( (2.0/3.0)*100);

    private final double requiredForPercentage;
}
