package pl.jkerro.covoting.voting_session.model;

import lombok.*;
import org.springframework.data.domain.Persistable;

import javax.persistence.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "vote")
@IdClass(VoteId.class)
public class Vote implements Persistable<VoteId> {
    @Id
    Integer userId;
    @Id
    Integer votingId;
    @Enumerated(EnumType.STRING)
    VoteType voteType;

    @Override
    public VoteId getId() {
        return VoteId.builder()
                .userId(userId)
                .votingId(votingId)
                .build();
    }

    @Override
    public boolean isNew() {
        return true;
    }
}
