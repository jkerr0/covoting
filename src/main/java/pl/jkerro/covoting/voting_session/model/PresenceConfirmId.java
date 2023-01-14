package pl.jkerro.covoting.voting_session.model;

import lombok.*;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class PresenceConfirmId implements Serializable {
    private Integer userId;
    private Integer votingSessionId;
}
