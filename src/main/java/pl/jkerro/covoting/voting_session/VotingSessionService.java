package pl.jkerro.covoting.voting_session;

import pl.jkerro.covoting.users.ApplicationUser;
import pl.jkerro.covoting.voting_session.model.*;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public interface VotingSessionService {

    void createVotingSession(VotingSession session);

    void updateVotingSession(VotingSession session);

    List<VotingSession> findAllVotingSessions();

    List<VotingSession> findPublishedVotingSessions();

    void deleteSessionById(Integer id);

    List<Voting> findVotingListBySession(Integer votingSessionId);

    Optional<VotingSession> findVotingSessionById(Integer id);

    Optional<CurrentVotingInfo> findVotingSessionCurrentVotingInfoById(Integer id);

    Optional<Voting> proceedToNextVoting(Integer id);

    void castVote(Integer sessionId, String email, VoteType voteType);

    @Transactional
    Optional<Voting> findCurrentVoting(Integer sessionId);

    Optional<VotingProgress> findCurrentVotingProgress(Integer sessionId);

    boolean canUserVote(String email, Integer sessionId);

    ApplicationUser confirmPresence(String email, Integer sessionId);

    List<ApplicationUser> getPresentUsers(Integer sessionId);

    boolean isUserPresent(String email, Integer sessionId);
}
