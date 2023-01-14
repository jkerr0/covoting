import {
  Box,
  CircularProgress,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Container } from "@mui/system";
import CenteredContainer from "Components/CenteredContainer";
import NewResultPopup from "Components/NewResultPopup";
import PageHeader from "Components/PageHeader";
import VotingInfoCard from "Components/VotingInfoCard";
import VotingParticipantsCard from "Components/VotingParticipantsCard";
import VotingProgressCard from "Components/VotingProgressCard";
import WithNavbar from "Components/WithNavbar";
import useCurrentVoting from "Hooks/useCurrentVoting";
import useCurrentVotingInfo from "Hooks/useCurrentVotingInfo";
import useNumberParam from "Hooks/useNumberParam";
import useVoteProgress from "Hooks/useVoteProgress";
import useVotingSession from "Hooks/useVotingSession";
import { FC } from "react";
import { useStompClient } from "react-stomp-hooks";
import { getAuthorizationHeader } from "Services/auth-service";

interface VotingControlPageProps {
  invalidParamUrl: string;
}

const VotingControlPage: FC<VotingControlPageProps> = ({ invalidParamUrl }) => {
  const sessionId = useNumberParam("id", invalidParamUrl);

  const theme = useTheme();
  const smallerThanMedium = useMediaQuery(theme.breakpoints.down("md"));

  const { isLoading: isVotingInfoLoading, votingInfo } =
    useCurrentVotingInfo(sessionId);
  const {
    currentVotes,
    maxVotes,
    isLoading: isVoteProgressLoading,
    resetProgress,
  } = useVoteProgress(sessionId);
  const currentVoting = useCurrentVoting(sessionId);
  const nextVotingHandler = useNextVotingHandler(sessionId, resetProgress);

  const { votingSession, isLoading: isVotingSessionLoading } =
    useVotingSession(sessionId);

  return (
    <WithNavbar>
      {isVotingInfoLoading ? (
        <CenteredContainer>
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </CenteredContainer>
      ) : (
        <Container maxWidth="xl" component={"div"}>
          {isVotingSessionLoading ? (
            <CircularProgress />
          ) : (
            <PageHeader>{`Voting session control panel for session: ${votingSession?.name}`}</PageHeader>
          )}
          <Grid
            container
            justifyContent="space-around"
            alignItems="stretch"
            direction={smallerThanMedium ? "column" : "row"}
            spacing={2}
          >
            <Grid item sm={6}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  {votingInfo && (
                    <VotingInfoCard
                      {...votingInfo}
                      voting={currentVoting || votingInfo.voting}
                      onNextVoting={nextVotingHandler}
                      sessionId={sessionId}
                      withControl
                    />
                  )}
                </Grid>
                <Grid item>
                  <VotingProgressCard
                    currentVotes={currentVotes}
                    maxVotes={maxVotes}
                    isLoading={isVoteProgressLoading}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={6}>
              <VotingParticipantsCard sessionId={sessionId} />
            </Grid>
          </Grid>
          <NewResultPopup sessionId={sessionId} />
        </Container>
      )}
    </WithNavbar>
  );
};

const useNextVotingHandler = (sessionId: number, resetProgress: () => void) => {
  const stompClient = useStompClient();

  return () => {
    stompClient?.publish({
      destination: `/app/session/${sessionId}/next-voting`,
      headers: { Authorization: getAuthorizationHeader() },
    });
    resetProgress();
  };
};

export default VotingControlPage;
