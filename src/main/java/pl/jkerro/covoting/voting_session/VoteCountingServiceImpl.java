package pl.jkerro.covoting.voting_session;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.jkerro.covoting.users.ApplicationUser;
import pl.jkerro.covoting.users.UserRepository;
import pl.jkerro.covoting.voting_session.model.PresenceConfirm;
import pl.jkerro.covoting.voting_session.model.Voting;
import pl.jkerro.covoting.voting_session.model.VotingProgress;
import pl.jkerro.covoting.voting_session.repositories.PresenceConfirmRepository;
import pl.jkerro.covoting.voting_session.repositories.VoteRepository;
import pl.jkerro.covoting.voting_session.repositories.VotingRepository;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class VoteCountingServiceImpl implements VoteCountingService {

    private final VoteRepository voteRepository;
    private final VotingRepository votingRepository;
    private final PresenceConfirmRepository presenceConfirmRepository;
    private final UserRepository userRepository;

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
        Voting voting = votingRepository.findById(votingId).orElseThrow();
        Integer maxVotes = presenceConfirmRepository.findAllByVotingSessionId(voting.getVotingSession().getId())
                .stream()
                .map(PresenceConfirm::getUserId)
                .map(userRepository::findById)
                .flatMap(Optional::stream)
                .map(ApplicationUser::getVoteWeight)
                .reduce(Integer::sum)
                .orElse(0);

        return VotingProgress.builder()
                .currentVotes(getAllVotesCount(votingId))
                .maxVotes(maxVotes)
                .build();
    }
}
