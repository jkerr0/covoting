import { CircularProgress, Container, Grid, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import CenteredContainer from "Components/CenteredContainer";
import PageHeader from "Components/PageHeader";
import VoteCastCard from "Components/VoteCastCard";
import VotingInfoCard from "Components/VotingInfoCard";
import WithNavbar from "Components/WithNavbar";
import useCurrentVotingInfo from "Hooks/useCurrentVotingInfo";
import useCurrentVoting from "Hooks/useCurrentVoting";
import useNumberParam from "Hooks/useNumberParam";
import { FC, useState } from "react";
import { useQuery } from "react-query";
import { getVotingEnabled } from "Services/voting-session-api-service";
import NewResultPopup from "Components/NewResultPopup";
import useVotingSession from "Hooks/useVotingSession";

interface VotingPageProps {
  invalidParamUrl: string;
}

const VotingPage: FC<VotingPageProps> = ({ invalidParamUrl }) => {
  const sessionId = useNumberParam("id", invalidParamUrl);
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));

  const { isLoading: isVotingInfoLoading, votingInfo } =
    useCurrentVotingInfo(sessionId);
  const {
    enabled,
    disable,
    isLoading: isVotingEnabledLoading,
    onVotingChange,
  } = useVotingEnabled(sessionId);
  const currentVoting = useCurrentVoting(sessionId, onVotingChange);
  const voting = currentVoting || votingInfo?.voting;

  const { votingSession, isLoading: isVotingSessionLoading } =
    useVotingSession(sessionId);

  return (
    <WithNavbar>
      <Container maxWidth="xl">
        {isVotingSessionLoading ? (
          <CircularProgress />
        ) : (
          <PageHeader>{`Voting session voting panel for session: ${votingSession?.name}`}</PageHeader>
        )}
        {votingInfo?.sessionClosed ? (
          "Session closed"
        ) : isVotingInfoLoading ? (
          <CenteredContainer>
            <CircularProgress />
          </CenteredContainer>
        ) : (
          <Grid
            container
            justifyContent="space-around"
            alignItems="stretch"
            spacing={2}
            direction={md ? "column" : "row"}
          >
            <Grid item sm={6} xs={4}>
              {votingInfo && (
                <VotingInfoCard
                  {...votingInfo}
                  sessionId={sessionId}
                  voting={voting}
                  withControl={false}
                />
              )}
            </Grid>
            <Grid item sm={6} xs={4}>
              <VoteCastCard
                sessionId={sessionId}
                votingEnabled={enabled}
                isLoading={isVotingEnabledLoading}
                onVote={disable}
                noNextVoting={voting?.seq === votingInfo?.votingCount}
              />
            </Grid>
          </Grid>
        )}
        <NewResultPopup sessionId={sessionId} />
      </Container>
    </WithNavbar>
  );
};

const useVotingEnabled = (sessionId: number) => {
  const [enabled, setEnabled] = useState<boolean | undefined>();

  const { isLoading } = useQuery(
    "voting-enabled",
    () => getVotingEnabled(sessionId),
    {
      onSuccess: (enabled) => setEnabled(enabled),
    }
  );

  return {
    enabled,
    disable: () => setEnabled(false),
    isLoading,
    onVotingChange: () => setEnabled(true),
  };
};

export default VotingPage;
