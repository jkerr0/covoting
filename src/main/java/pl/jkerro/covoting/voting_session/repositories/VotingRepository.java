package pl.jkerro.covoting.voting_session.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import pl.jkerro.covoting.voting_session.model.VotingSession;
import pl.jkerro.covoting.voting_session.model.Voting;

import java.util.List;

public interface VotingRepository extends CrudRepository<Voting, Integer> {
    void deleteAllByVotingSession(VotingSession votingSession);

    Integer countAllByVotingSession(VotingSession votingSession);

    @Query(value = "SELECT v FROM Voting v where v.votingSession.id=:votingSessionId and v.seq < v.votingSession.currentVotingSeq order by v.seq asc")
    List<Voting> findAllByVotingSessionIdAndSeqLessThanCurrent(@Param("votingSessionId") Integer votingSessionId);
}
