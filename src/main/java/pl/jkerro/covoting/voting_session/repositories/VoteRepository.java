package pl.jkerro.covoting.voting_session.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import pl.jkerro.covoting.voting_session.model.Vote;
import pl.jkerro.covoting.voting_session.model.VoteId;

public interface VoteRepository extends CrudRepository<Vote, VoteId> {

    @Query(value = "SELECT sum(weight) FROM Vote where votingId=:votingId")
    Integer sumAllByVotingId(@Param("votingId") Integer votingId);

    @Query(value = "SELECT sum(weight) FROM Vote where votingId=:votingId and voteType='FOR'")
    Integer sumForByVotingId(@Param("votingId") Integer votingId);

    @Query(value = "SELECT sum(weight) FROM Vote where votingId=:votingId and voteType='AGAINST'")
    Integer sumAgainstByVotingId(@Param("votingId") Integer votingId);

    @Query(value = "SELECT sum(weight) FROM Vote where votingId=:votingId and voteType='ABSTAIN'")
    Integer sumAbstainedByVotingId(@Param("votingId") Integer votingId);
}
