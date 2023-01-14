import { CircularProgress, Container } from "@mui/material";
import PageHeader from "Components/PageHeader";
import VotingSessionResults from "Components/VotingSessionResults";
import WithNavbar from "Components/WithNavbar";
import useNumberParam from "Hooks/useNumberParam";
import useVotingSession from "Hooks/useVotingSession";
import React, { FC } from "react";

interface ResultPageProps {
  invalidParamUrl: string;
}

const ResultsPage: FC<ResultPageProps> = ({ invalidParamUrl }) => {
  const sessionId = useNumberParam("id", invalidParamUrl);
  const { votingSession, isLoading } = useVotingSession(sessionId);

  return (
    <WithNavbar>
      <Container maxWidth="xl">
        {isLoading ? (
          <CircularProgress />
        ) : (
          <PageHeader>{`Voting results for session: ${votingSession?.name}`}</PageHeader>
        )}
        <VotingSessionResults sessionId={sessionId} />
      </Container>
    </WithNavbar>
  );
};

export default ResultsPage;
