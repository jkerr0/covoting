import { Container } from "@mui/material";
import { FC } from "react";
import PageHeader from "../Components/PageHeader";
import VotingSessionList from "../Components/VotingSessionList";
import WithNavbar from "../Components/WithNavbar";

const VotingSessionsPage: FC = () => {
  return (
    <WithNavbar>
      <Container maxWidth="xl">
        <PageHeader>Voting sessions</PageHeader>
        <Container maxWidth="lg">
          <VotingSessionList/>
        </Container>
      </Container>
    </WithNavbar>
  );
};

export default VotingSessionsPage;
