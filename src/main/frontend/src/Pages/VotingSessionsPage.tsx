import { Container } from "@mui/material";
import { FC } from "react";
import CenteredContainer from "../Components/CenteredContainer";
import LogoutButton from "../Components/LogoutButton";
import VotingSessionList from "../Components/VotingSessionList";

const VotingSessionsPage: FC = () => {
  return (
    <Container maxWidth="xl">
      <LogoutButton></LogoutButton>
      <CenteredContainer>
        <VotingSessionList></VotingSessionList>
      </CenteredContainer>
    </Container>
  );
};

export default VotingSessionsPage;
