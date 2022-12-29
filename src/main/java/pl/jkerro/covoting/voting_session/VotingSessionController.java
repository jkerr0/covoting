package pl.jkerro.covoting.voting_session;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("voting_sessions")
@RestController
public class VotingSessionController {

    private final VotingSessionService votingSessionService;

    @GetMapping("{id}/current_voting")
    public CurrentVotingInfo getCurrentVotingInfo(@PathVariable Integer id) {
        return votingSessionService.findVotingSessionCurrentVotingInfoById(id)
                .orElseThrow();
    }
}
