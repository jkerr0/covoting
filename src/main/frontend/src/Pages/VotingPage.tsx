import { CircularProgress, Container, Grid, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import CenteredContainer from "Components/CenteredContainer";
import PageHeader from "Components/PageHeader";
import VoteCastCard from "Components/VoteCastCard";
import VotingInfoCard from "Components/VotingInfoCard";
import WithNavbar from "Components/WithNavbar";
import useCurrentVoting from "Hooks/useCurrentVoting";
import useCurrentVotingInfo from "Hooks/useCurrentVotingInfo";
import useNumberParam from "Hooks/useNumberParam";
import { FC, useEffect, useState } from "react";
import { Voting } from "Utils/data";

interface VotingPageProps {
  invalidParamUrl: string;
}

const VotingPage: FC<VotingPageProps> = ({ invalidParamUrl }) => {
  const sessionId = useNumberParam("id", invalidParamUrl);
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));

  const { isLoading, votingInfo } = useCurrentVotingInfo(sessionId);
  const currentVoting = useCurrentVoting(sessionId);
  const { enabled, disable } = useVotingEnabled(currentVoting);

  return (
    <WithNavbar>
      <Container maxWidth="xl">
        <PageHeader>Voting session</PageHeader>
        {isLoading ? (
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
                  voting={currentVoting || votingInfo.voting}
                  withControl={false}
                />
              )}
            </Grid>
            <Grid item sm={6} xs={4}>
              <VoteCastCard
                sessionId={sessionId}
                votingEnabled={enabled}
                onVote={disable}
              />
            </Grid>
          </Grid>
        )}
      </Container>
    </WithNavbar>
  );
};

const useVotingEnabled = (currentVoting: Voting | undefined) => {
  const [enabled, setEnabled] = useState<boolean>(true);
  useEffect(() => {
    setEnabled(true);
  }, [currentVoting]);
  const disable = () => setEnabled(false);
  return { enabled, disable };
};

export default VotingPage;
