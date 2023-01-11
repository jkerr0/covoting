package pl.jkerro.covoting.voting_session.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.jkerro.covoting.voting_session.model.VotingSession;
import pl.jkerro.covoting.voting_session.model.Voting;

public interface VotingRepository extends JpaRepository<Voting, Integer> {
    void deleteAllByVotingSession(VotingSession votingSession);

    Integer countAllByVotingSession(VotingSession votingSession);
}
