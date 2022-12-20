package pl.jkerro.covoting.voting_session;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VotingSessionRepository extends JpaRepository<VotingSession, Integer> {
    List<VotingSession> findAllByOrderByStartDateDesc();

    List<VotingSession> findAllByIsPublishedOrderByStartDateDesc(boolean isPublished);
}
