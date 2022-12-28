import { Container, Grid, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import PageHeader from "Components/PageHeader";
import VoteCastCard from "Components/VoteCastCard";
import VotingInfoCard from "Components/VotingInfoCard";
import WithNavbar from "Components/WithNavbar";
import { MajorityType } from "Utils/data";

const VotingPage = () => {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <WithNavbar>
      <Container maxWidth="xl">
        <PageHeader>Voting session</PageHeader>
        <Grid
          container
          justifyContent="space-around"
          alignItems="stretch"
          spacing={2}
          direction={md ? "column" : "row"}
        >
          <Grid item sm={6} xs={4}>
            <VotingInfoCard
              votingCount={1}
              voting={{
                name: "abc",
                majorityType: MajorityType.ABSOLUTE,
                seq: 1,
              }}
              withControl={false}
            />
          </Grid>
          <Grid item sm={6} xs={4}>
            <VoteCastCard />
          </Grid>
        </Grid>
      </Container>
    </WithNavbar>
  );
};

export default VotingPage;
