package pl.jkerro.covoting.votingSession;

import org.springframework.data.jpa.repository.JpaRepository;

public interface VotingSessionRepository extends JpaRepository<VotingSession, Integer> {
}
