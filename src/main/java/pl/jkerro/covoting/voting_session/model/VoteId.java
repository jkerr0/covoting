package pl.jkerro.covoting.voting_session.model;

import lombok.*;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class VoteId implements Serializable {
    private Integer userId;
    private Integer votingId;
}
