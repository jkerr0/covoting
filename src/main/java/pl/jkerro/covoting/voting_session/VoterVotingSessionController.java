package pl.jkerro.covoting.voting_session;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.jkerro.covoting.authentication.JwtTokenService;
import pl.jkerro.covoting.voting_session.model.Voting;
import pl.jkerro.covoting.voting_session.model.VotingSession;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("voter/voting_sessions")
@RestController
public class VoterVotingSessionController {

    private final VotingSessionService votingSessionService;
    private final JwtTokenService jwtTokenService;

    @GetMapping
    public List<VotingSession> getSessionsList() {
        return votingSessionService.findPublishedVotingSessions();
    }

    @GetMapping("{id}/voting_list")
    public List<Voting> getSessionVotingList(@PathVariable Integer id) {
        return votingSessionService.findVotingSessionById(id)
                .filter(VotingSession::getIsPublished)
                .map(VotingSession::getVotingList)
                .orElse(List.of());
    }

    @GetMapping("{id}/current_voting/can_vote")
    public boolean getCanUserVote(@PathVariable Integer id,
                                  @RequestHeader("Authorization") String authHeader) {
        return jwtTokenService.findUsernameFromHeader(authHeader)
                .map(email -> votingSessionService.canUserVote(email, id))
                .orElseThrow();
    }
}
