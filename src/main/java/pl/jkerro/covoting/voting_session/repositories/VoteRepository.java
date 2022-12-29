package pl.jkerro.covoting.voting_session.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.jkerro.covoting.voting_session.model.Vote;
import pl.jkerro.covoting.voting_session.model.VoteId;

public interface VoteRepository extends JpaRepository<Vote, VoteId> {
}
