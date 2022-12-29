package pl.jkerro.covoting.voting_session.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.jkerro.covoting.voting_session.model.VotingSession;

import java.util.List;

public interface VotingSessionRepository extends JpaRepository<VotingSession, Integer> {
    List<VotingSession> findAllByOrderByStartDateDesc();

    List<VotingSession> findAllByIsPublishedOrderByStartDateDesc(boolean isPublished);
}
