package pl.jkerro.covoting.voting_session.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.jkerro.covoting.voting_session.model.PresenceConfirm;
import pl.jkerro.covoting.voting_session.model.PresenceConfirmId;

import java.util.List;

public interface PresenceConfirmRepository extends JpaRepository<PresenceConfirm, PresenceConfirmId> {
    List<PresenceConfirm> findAllByVotingSessionId(Integer votingSessionId);

    void deleteAllByVotingSessionId(Integer votingSessionId);
}
