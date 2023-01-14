package pl.jkerro.covoting.voting_session;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.jkerro.covoting.voting_session.model.MajorityType;
import pl.jkerro.covoting.voting_session.model.Voting;
import pl.jkerro.covoting.voting_session.model.VotingResult;
import pl.jkerro.covoting.voting_session.repositories.VotingRepository;

import java.util.List;

@RequiredArgsConstructor
@Service
public class VoteResultServiceImpl implements VoteResultService {

    private final VoteCountingService voteCountingService;
    private final VotingRepository votingRepository;

    @Override
    public List<VotingResult> calculateResultsForVotingSession(Integer sessionId) {
        return votingRepository.findAllByVotingSessionIdAndSeqLessThanCurrent(sessionId)
                .stream()
                .map(Voting::getId)
                .map(this::calculateResultForVoting)
                .toList();
    }

    @Override
    public VotingResult calculateResultForVoting(Integer votingId) {
        Voting voting = votingRepository.findById(votingId)
                .orElseThrow();
        Integer forCount = voteCountingService.getVotesForCount(votingId);
        Integer againstCount = voteCountingService.getVotesAgainstCount(votingId);
        Integer abstainCount = voteCountingService.getVotesAbstainedCount(votingId);
        return VotingResult.builder()
                .name(voting.getName())
                .forCount(forCount)
                .abstainCount(abstainCount)
                .againstCount(againstCount)
                .accepted(isAccepted(forCount, againstCount, abstainCount, voting.getMajorityType()))
                .build();
    }

    private boolean isAccepted(Integer forCount, Integer against, Integer abstained, MajorityType majorityType) {
        if (majorityType.equals(MajorityType.SIMPLE)) {
            return forCount > against;
        } else {
            double forPercentage = (Double.valueOf(forCount) * 100) / (double) (forCount + against + abstained);
            return forPercentage > majorityType.getRequiredForPercentage();
        }
    }
}
