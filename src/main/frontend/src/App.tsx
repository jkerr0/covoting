import React from "react";
import "./App.css";
import { Container } from "@mui/system";
import VotingSessionList from "./Components/VotingSessionList";


function App() {


  return (
      <Container maxWidth="xl">
        <VotingSessionList></VotingSessionList>
      </Container>
  );
}

export default App;
