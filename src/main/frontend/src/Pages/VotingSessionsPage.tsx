import { Container } from "@mui/material";
import { FC } from "react";
import LogoutButton from "../Components/LogoutButton";
import PageHeader from "../Components/PageHeader";
import VotingSessionList from "../Components/VotingSessionList";

const VotingSessionsPage: FC = () => {
  return (
    <Container maxWidth="xl">
      <LogoutButton></LogoutButton>
      <PageHeader>Voting sessions</PageHeader>
      <Container maxWidth='lg'>
        <VotingSessionList></VotingSessionList>
      </Container>
    </Container>
  );
};

export default VotingSessionsPage;
