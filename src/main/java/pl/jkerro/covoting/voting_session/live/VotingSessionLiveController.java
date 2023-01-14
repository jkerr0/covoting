package pl.jkerro.covoting.voting_session.live;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import pl.jkerro.covoting.authentication.JwtTokenService;
import pl.jkerro.covoting.users.ApplicationUser;
import pl.jkerro.covoting.voting_session.VoteCountingService;
import pl.jkerro.covoting.voting_session.VoteResultService;
import pl.jkerro.covoting.voting_session.model.VoteType;
import pl.jkerro.covoting.voting_session.model.Voting;
import pl.jkerro.covoting.voting_session.VotingSessionService;
import pl.jkerro.covoting.voting_session.model.VotingResult;

import java.util.Optional;

@RequiredArgsConstructor
@MessageMapping("session/{sessionId}")
@Controller
public class VotingSessionLiveController {

    private final VotingSessionService votingSessionService;
    private final VoteCountingService voteCountingService;
    private final VoteResultService voteResultService;
    private final JwtTokenService jwtTokenService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("next-voting")
    public void handleNextVoting(@DestinationVariable Integer sessionId,
                                 @Header(name = "Authorization") String authorizationHeader) {
        Optional<VotingResult> resultOptional = votingSessionService.findCurrentVoting(sessionId)
                .map(Voting::getId)
                .map(voteResultService::calculateResultForVoting);

        Optional<Voting> votingOptional = jwtTokenService.findUsernameFromHeader(authorizationHeader)
                .flatMap(email -> votingSessionService.proceedToNextVoting(sessionId, email));

        votingOptional.ifPresent(voting -> simpMessagingTemplate.convertAndSend(String.format("/topic/current-voting.%d", sessionId), voting));
        resultOptional.ifPresent(result -> simpMessagingTemplate.convertAndSend(String.format("/topic/new-result.%d", sessionId), result));
    }

    @MessageMapping("vote")
    @SendTo("/topic/voting-progress.{sessionId}")
    public Integer handleVote(@DestinationVariable Integer sessionId,
                              @Payload String voteType,
                              @Header(name = "Authorization") String authorizationHeader) {
        jwtTokenService.findUsernameFromHeader(authorizationHeader)
                .ifPresent(email -> votingSessionService.castVote(sessionId, email, VoteType.valueOf(voteType)));

        return votingSessionService.findCurrentVoting(sessionId)
                .map(Voting::getId)
                .map(voteCountingService::getAllVotesCount)
                .orElse(null);
    }

    @MessageMapping("presence-confirm")
    @SendTo("/topic/presence-list.{sessionId}")
    public ApplicationUser handlePresenceConfirm(@DestinationVariable Integer sessionId,
                                                 @Header(name = "Authorization") String authorizationHeader) {
        return jwtTokenService.findUsernameFromHeader(authorizationHeader)
                .map(email -> votingSessionService.confirmPresence(email, sessionId))
                .orElse(null);
    }

}
