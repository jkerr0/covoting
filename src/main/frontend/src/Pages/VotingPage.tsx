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
import { FC } from "react";

interface VotingPageProps {
  invalidParamUrl: string;
}

const VotingPage: FC<VotingPageProps> = ({ invalidParamUrl }) => {
  const id = useNumberParam("id", invalidParamUrl);
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));

  const { isLoading, votingInfo } = useCurrentVotingInfo(id);
  const currentVoting = useCurrentVoting(id);

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
              <VoteCastCard />
            </Grid>
          </Grid>
        )}
      </Container>
    </WithNavbar>
  );
};

export default VotingPage;
