import {Box, CircularProgress, Grid, useMediaQuery, useTheme,} from "@mui/material";
import {Container} from "@mui/system";
import CenteredContainer from "Components/CenteredContainer";
import PageHeader from "Components/PageHeader";
import VotingInfoCard from "Components/VotingInfoCard";
import VotingParticipantsCard from "Components/VotingParticipantsCard";
import VotingProgressCard from "Components/VotingProgressCard";
import WithNavbar from "Components/WithNavbar";
import useCurrentVoting from "Hooks/useCurrentVoting";
import useCurrentVotingInfo from "Hooks/useCurrentVotingInfo";
import useNumberParam from "Hooks/useNumberParam";
import {FC} from "react";
import {useStompClient} from "react-stomp-hooks";
import {getAuthorizationHeader} from "Services/auth-service";

interface VotingControlPageProps {
  invalidParamUrl: string;
}

const VotingControlPage: FC<VotingControlPageProps> = ({ invalidParamUrl }) => {
  const id = useNumberParam("id", invalidParamUrl);

  const theme = useTheme();
  const smallerThanMedium = useMediaQuery(theme.breakpoints.down("md"));

  const { isLoading, votingInfo } = useCurrentVotingInfo(id);
  const currentVoting = useCurrentVoting(id);
  const nextVotingHandler = useNextVotingHandler(id);

  return (
    <WithNavbar>
      {isLoading ? (
        <CenteredContainer>
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </CenteredContainer>
      ) : (
        <Container maxWidth="xl" component={"div"}>
          <PageHeader>Voting session control panel</PageHeader>
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
                      withControl
                    />
                  )}
                </Grid>
                <Grid item>
                  <VotingProgressCard />
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={6}>
              <VotingParticipantsCard />
            </Grid>
          </Grid>
        </Container>
      )}
    </WithNavbar>
  );
};

const useNextVotingHandler = (sessionId: number) => {
  const stompClient = useStompClient();

  return () =>
      stompClient?.publish({
        destination: `/app/session/${sessionId}/next-voting`,
        headers: {Authorization: getAuthorizationHeader()},
      });
};

export default VotingControlPage;
