import React from "react";
import "./App.css";
import { Container } from "@mui/system";
import VotingSessionList from "./Components/VotingSessionList";
import LoginForm from "./Components/LoginForm";
import { LogoutButton } from "./Components/LogoutButton";


function App() {


  return (
      <Container maxWidth="xl">
        <VotingSessionList></VotingSessionList>
        <LoginForm></LoginForm>
        <LogoutButton></LogoutButton>
      </Container>
  );
}

export default App;
