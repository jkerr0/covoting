package pl.jkerro.covoting.voting_session;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "voting_session")
public class VotingSession {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Integer id;
    private Date startDate;
    private String name;

    @OneToMany(mappedBy = "votingSession", orphanRemoval = true)
    @OrderBy("seq ASC")
    @JsonDeserialize
    private List<Voting> votingList = new ArrayList<>();

    private Boolean isPublished;
}
