package pl.jkerro.covoting.voting_session.live;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import pl.jkerro.covoting.voting_session.Voting;
import pl.jkerro.covoting.voting_session.VotingSessionService;

@RequiredArgsConstructor
@MessageMapping("session/{sessionId}")
@Controller
public class VotingProgressController {

    private final VotingSessionService votingSessionService;

    @MessageMapping("next-voting")
    @SendTo("/topic/current-voting.{sessionId}")
    public Voting handleNextVoting(@DestinationVariable Integer sessionId,
                                   @Header(name = "Authorization") String authorizationHeader) {
        return votingSessionService.proceedToNextVoting(sessionId)
                .orElse(null);
    }

    @MessageMapping("vote")
    @SendTo("/topic/voting-progress.{sessionId}")
    public Integer handleVote(@DestinationVariable Integer sessionId,
                              @Header(name = "Authorization") String authorizationHeader) {
        return 1;
    }

}
