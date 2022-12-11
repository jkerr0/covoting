package pl.jkerro.covoting.voting_session;

import org.springframework.data.jpa.repository.JpaRepository;

public interface VotingRepository extends JpaRepository<Voting, Integer> {
    void deleteAllByVotingSession(VotingSession votingSession);
}
