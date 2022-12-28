package pl.jkerro.covoting.voting_session.live;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import pl.jkerro.covoting.voting_session.Voting;

@MessageMapping("progress/{sessionId}")
@Controller
public class VotingProgressController {

    @MessageMapping("next-voting")
    @SendTo("/topic/current-voting.{sessionId}")
    public Voting handleNextVoting(@DestinationVariable Integer sessionId,
                                   @Header(name="Authorization") String authorizationHeader) {
        return null;
    }

    @MessageMapping("confirm-voted")
    public void handleVoteConfirm(@DestinationVariable Integer sessionId,
                                  @Header(name="Authorization") String authorizationHeader) {

    }

}
