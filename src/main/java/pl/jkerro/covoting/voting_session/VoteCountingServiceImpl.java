package pl.jkerro.covoting.voting_session;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.jkerro.covoting.voting_session.model.VotingProgress;
import pl.jkerro.covoting.voting_session.repositories.VoteRepository;

@RequiredArgsConstructor
@Service
public class VoteCountingServiceImpl implements VoteCountingService {

    private final VoteRepository voteRepository;

    @Override
    public Integer getAllVotesCount(Integer votingId) {
        return voteRepository.sumAllByVotingId(votingId);
    }

    @Override
    public Integer getVotesForCount(Integer votingId) {
        return voteRepository.sumForByVotingId(votingId);
    }

    @Override
    public Integer getVotesAgainstCount(Integer votingId) {
        return voteRepository.sumAgainstByVotingId(votingId);
    }

    @Override
    public Integer getVotesAbstainedCount(Integer votingId) {
        return voteRepository.sumAbstainedByVotingId(votingId);
    }

    @Override
    public VotingProgress getVotingProgress(Integer votingId) {
        return VotingProgress.builder()
                .currentVotes(getAllVotesCount(votingId))
                .maxVotes(10) // TODO - voting presence
                .build();
    }
}
