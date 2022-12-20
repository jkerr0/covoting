import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { Container } from "@mui/system";
import PageHeader from "Components/PageHeader";
import SideMenu from "Components/SideMenu";
import VotingInfoCard from "Components/VotingInfoCard";
import VotingParticipantsCard from "Components/VotingParticipantsCard";
import VotingProgressCard from "Components/VotingProgressCard";
import WithNavbar from "Components/WithNavbar";
import useNumberParam from "Hooks/useNumberParam";
import React, { FC, useState } from "react";
import { MajorityType } from "Utils/data";

interface VotingControlPageProps {
  invalidParamUrl: string;
}

const VotingControlPage: FC<VotingControlPageProps> = ({ invalidParamUrl }) => {
  const id = useNumberParam("id", invalidParamUrl);
  const [menuOpen, setMenuOpen] = useState(false);

  const theme = useTheme();
  const smallerThanMedium = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <WithNavbar>
      <Container maxWidth="xl" component={"div"}>
        <SideMenu open={menuOpen} setOpen={setMenuOpen} />
        <PageHeader>{`Voting session control panel ${id}`}</PageHeader>
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
                <VotingInfoCard
                  votingCount={25}
                  withControl
                  voting={{
                    name: "Name",
                    majorityType: MajorityType.SIMPLE,
                    seq: 1,
                  }}
                />
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
    </WithNavbar>
  );
};

export default VotingControlPage;
