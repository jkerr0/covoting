import { Container } from "@mui/material";
import PageHeader from "Components/PageHeader";
import VotingSessionResults from "Components/VotingSessionResults";
import WithNavbar from "Components/WithNavbar";
import useNumberParam from "Hooks/useNumberParam";
import React, { FC } from "react";

interface ResultPageProps {
  invalidParamUrl: string;
}

const ResultsPage: FC<ResultPageProps> = ({ invalidParamUrl }) => {
  const sessionId = useNumberParam("id", invalidParamUrl);

  return (
    <WithNavbar>
      <Container maxWidth="xl">
        <PageHeader>Voting session results</PageHeader>
        <VotingSessionResults sessionId={sessionId} />
      </Container>
    </WithNavbar>
  );
};

export default ResultsPage;
