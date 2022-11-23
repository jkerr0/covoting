package pl.jkerro.covoting.voting_session;

import org.springframework.data.jpa.repository.JpaRepository;

public interface VotingSessionRepository extends JpaRepository<VotingSession, Integer> {
}
