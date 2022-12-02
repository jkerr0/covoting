package pl.jkerro.covoting.voting_session;

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
    public VotingSession createSession(@RequestBody VotingSession votingSession) {
        votingSessionService.createVotingSession(votingSession);
        return votingSession;
    }

    @PutMapping
    public void updateSession(@RequestBody VotingSession votingSession) {
        votingSessionService.updateVotingSession(votingSession);
    }

    @DeleteMapping("{id}")
    public void deleteSessionById(@PathVariable Integer id) {
        votingSessionService.deleteSessionById(id);
    }
}
