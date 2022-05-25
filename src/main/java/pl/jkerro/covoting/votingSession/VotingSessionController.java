package pl.jkerro.covoting.votingSession;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("voting_sessions")
@RestController
public class VotingSessionController {

    private final VotingSessionService votingSessionService;

    @GetMapping
    public List<VotingSession> getSessionsList() {
        return votingSessionService.findAllVotingSessions();
    }

    @PostMapping
    public void createSession(@RequestBody VotingSession votingSession) {
        votingSessionService.createVotingSession(votingSession);

    }
}
