package pl.jkerro.covoting.voting_session;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("admin/voting_sessions")
@RestController
public class AdminVotingSessionController implements VotingSessionController {

    private final VotingSessionService votingSessionService;

    @Override
    @PutMapping
    public void updateSession(@RequestBody VotingSession votingSession) {
        votingSessionService.updateVotingSession(votingSession);
    }

    @Override
    @DeleteMapping("{id}")
    public void deleteSessionById(@PathVariable Integer id) {
        votingSessionService.deleteSessionById(id);
    }

    @Override
    @GetMapping
    public List<VotingSession> getSessionsList() {
        return votingSessionService.findAllVotingSessions();
    }

    @Override
    @GetMapping("{id}/voting_list")
    public List<Voting> getSessionVotingList(@PathVariable Integer id) {
        return votingSessionService.findVotingListBySession(id);
    }

    @Override
    @PostMapping
    public VotingSession createSession(@RequestBody VotingSession votingSession) {
        votingSessionService.createVotingSession(votingSession);
        return votingSession;
    }
}
