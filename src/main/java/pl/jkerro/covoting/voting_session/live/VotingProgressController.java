package pl.jkerro.covoting.voting_session.live;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.stereotype.Controller;
import pl.jkerro.covoting.authentication.JwtTokenService;
import pl.jkerro.covoting.voting_session.model.VoteType;
import pl.jkerro.covoting.voting_session.model.Voting;
import pl.jkerro.covoting.voting_session.VotingSessionService;

@RequiredArgsConstructor
@MessageMapping("session/{sessionId}")
@Controller
public class VotingProgressController {

    private final VotingSessionService votingSessionService;
    private final JwtTokenService jwtTokenService;

    @MessageMapping("next-voting")
    @SendTo("/topic/current-voting.{sessionId}")
    public Voting handleNextVoting(@DestinationVariable Integer sessionId,
                                   @Header(name = "Authorization") String authorizationHeader) {
        return jwtTokenService.findUsernameFromHeader(authorizationHeader)
                .flatMap(x -> votingSessionService.proceedToNextVoting(sessionId))
                .orElse(null);
    }

    @MessageMapping("vote")
    @SendTo("/topic/voting-progress.{sessionId}")
    public Integer handleVote(@DestinationVariable Integer sessionId,
                              @Payload String voteType,
                              @Header(name = "Authorization") String authorizationHeader) {
        return jwtTokenService.findUsernameFromHeader(authorizationHeader)
                .map(email -> votingSessionService.castVote(sessionId, email, VoteType.valueOf(voteType)))
                .orElse(null);
    }

}
