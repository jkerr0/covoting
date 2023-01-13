package pl.jkerro.covoting.voting_session;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.jkerro.covoting.users.ApplicationUser;
import pl.jkerro.covoting.voting_session.model.CurrentVotingInfo;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("voting_sessions")
@RestController
public class VotingSessionController {

    private final VotingSessionService votingSessionService;

    @GetMapping("{id}/current_voting/info")
    public CurrentVotingInfo getCurrentVotingInfo(@PathVariable Integer id) {
        return votingSessionService.findVotingSessionCurrentVotingInfoById(id)
                .orElseThrow();
    }

    @GetMapping("{id}/present_list")
    public List<ApplicationUser> getPresentUsersFullNames(@PathVariable Integer id) {
        return votingSessionService.getPresentUsers(id)
                .stream()
                .toList();
    }
}
