package pl.jkerro.covoting.voting_session;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.jkerro.covoting.voting_session.model.Voting;
import pl.jkerro.covoting.voting_session.model.VotingProgress;
import pl.jkerro.covoting.voting_session.model.VotingSession;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("admin/voting_sessions")
@RestController
public class AdminVotingSessionController {

    private final VotingSessionService votingSessionService;

    @PutMapping
    public void updateSession(@RequestBody VotingSession votingSession) {
        votingSessionService.updateVotingSession(votingSession);
    }

    @DeleteMapping("{id}")
    public void deleteSessionById(@PathVariable Integer id) {
        votingSessionService.deleteSessionById(id);
    }

    @GetMapping
    public List<VotingSession> getSessionsList() {
        return votingSessionService.findAllVotingSessions();
    }

    @GetMapping("{id}/voting_list")
    public List<Voting> getSessionVotingList(@PathVariable Integer id) {
        return votingSessionService.findVotingListBySession(id);
    }

    @PostMapping
    public VotingSession createSession(@RequestBody VotingSession votingSession) {
        votingSessionService.createVotingSession(votingSession);
        return votingSession;
    }

    @GetMapping("{id}/current_voting/progress")
    public VotingProgress getCurrentVotingProgress(@PathVariable Integer id) {
        return votingSessionService.findCurrentVotingProgress(id)
                .orElse(null);
    }
}
