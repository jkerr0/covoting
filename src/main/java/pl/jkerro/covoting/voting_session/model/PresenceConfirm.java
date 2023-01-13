package pl.jkerro.covoting.voting_session.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Table(name = "presence_confirm")
@Entity
@IdClass(PresenceConfirmId.class)
public class PresenceConfirm {
    @Id
    private Integer userId;
    @Id
    private Integer votingSessionId;
}
