package pl.jkerro.covoting.voting_session;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("voter/voting_sessions")
@RestController
public class VoterVotingSessionController implements VotingSessionController {

    private final VotingSessionService votingSessionService;


    @Override
    public void updateSession(VotingSession votingSession) {
        throw new UnsupportedOperationException();
    }

    @Override
    public void deleteSessionById(Integer id) {
        throw new UnsupportedOperationException();
    }

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

    @Override
    public VotingSession createSession(VotingSession votingSession) {
        throw new UnsupportedOperationException();
    }
}
