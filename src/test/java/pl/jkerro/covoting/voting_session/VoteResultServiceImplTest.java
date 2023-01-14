package pl.jkerro.covoting.voting_session;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import pl.jkerro.covoting.voting_session.model.MajorityType;
import pl.jkerro.covoting.voting_session.model.Voting;
import pl.jkerro.covoting.voting_session.model.VotingResult;
import pl.jkerro.covoting.voting_session.repositories.VotingRepository;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(classes = {VoteResultServiceImpl.class})
class VoteResultServiceImplTest {

    @MockBean
    private VoteCountingService voteCountingService;

    @MockBean
    private VotingRepository votingRepository;

    private VoteResultService voteResultService;

    private static final Integer TEST_VOTING_ID = 1;

    @BeforeEach
    void setup() {
        voteResultService = new VoteResultServiceImpl(voteCountingService, votingRepository);
    }

    @Test
    void shouldAcceptWhenMoreForThanAgainstInSimple() {
        // when
        mockVoting(10, 5, 10, MajorityType.SIMPLE);
        // given
        VotingResult votingResult = getVotingResult();
        // then
        assertTrue(votingResult.isAccepted());
    }

    @Test
    void shouldRejectWhenLessForThanAgainstInSimple() {
        // when
        mockVoting(5, 10, 10, MajorityType.SIMPLE);
        // given
        VotingResult votingResult = getVotingResult();
        // then
        assertFalse(votingResult.isAccepted());
    }

    @Test
    void shouldAcceptWhenMoreThanHalfInAbsolute() {
        // when
        mockVoting(11, 4, 5, MajorityType.ABSOLUTE);
        // given
        VotingResult votingResult = getVotingResult();
        // then
        assertTrue(votingResult.isAccepted());
    }

    @Test
    void shouldRejectWhenLessThanHalfInAbsolute() {
        // when
        mockVoting(9, 6, 5, MajorityType.ABSOLUTE);
        // given
        VotingResult votingResult = getVotingResult();
        // then
        assertFalse(votingResult.isAccepted());

    }

    @Test
    void shouldAcceptWhenMoreThanTwoThirdsInEffective() {
        // when
        mockVoting(21, 4, 5, MajorityType.EFFECTIVE);
        // given
        VotingResult votingResult = getVotingResult();
        // then
        assertTrue(votingResult.isAccepted());
    }

    @Test
    void shouldRejectWhenLessThanTwoThirdsInEffective() {
        // when
        mockVoting(10, 4, 5, MajorityType.EFFECTIVE);
        // given
        VotingResult votingResult = getVotingResult();
        // then
        assertFalse(votingResult.isAccepted());
    }

    private VotingResult getVotingResult() {
        return voteResultService.calculateResultForVoting(TEST_VOTING_ID);
    }

    private void mockVoting(Integer forCount, Integer againstCount, Integer abstainCount, MajorityType majorityType) {
        Mockito.when(voteCountingService.getVotesForCount(TEST_VOTING_ID)).thenReturn(forCount);
        Mockito.when(voteCountingService.getVotesAgainstCount(TEST_VOTING_ID)).thenReturn(againstCount);
        Mockito.when(voteCountingService.getVotesAbstainedCount(TEST_VOTING_ID)).thenReturn(abstainCount);
        Mockito.when(votingRepository.findById(TEST_VOTING_ID)).thenReturn(Optional.of(Voting.builder().majorityType(majorityType).build()));
    }
}