package pl.jkerro.covoting.voting_session.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Objects;

@NoArgsConstructor
@Getter
@Setter
@Table
@Entity(name = "voting")
public class Voting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    private Integer seq;

    public Voting(Integer id, Integer seq, String name, String majorityType, VotingSession votingSession) {
        this.id = id;
        this.seq = seq;
        this.name = name;
        this.majorityType = MajorityType.valueOf(majorityType);
        this.votingSession = votingSession;
    }

    private String name;

    @Enumerated(EnumType.STRING)
    private MajorityType majorityType;

    @ManyToOne
    @JoinColumn(name = "voting_session_id")
    @JsonIgnore
    private VotingSession votingSession;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Voting voting = (Voting) o;
        return id != null && Objects.equals(id, voting.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
