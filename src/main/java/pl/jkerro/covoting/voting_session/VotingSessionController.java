package pl.jkerro.covoting.voting_session;

import org.springframework.web.bind.annotation.*;

import java.util.List;

public interface VotingSessionController {
    @PutMapping
    void updateSession(@RequestBody VotingSession votingSession);

    @DeleteMapping("{id}")
    void deleteSessionById(@PathVariable Integer id);

    @GetMapping
    List<VotingSession> getSessionsList();

    @GetMapping("{id}/voting_list")
    List<Voting> getSessionVotingList(@PathVariable Integer id);

    @PostMapping
    VotingSession createSession(@RequestBody VotingSession votingSession);
}
