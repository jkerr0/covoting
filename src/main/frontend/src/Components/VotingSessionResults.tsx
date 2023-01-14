import { CircularProgress, Stack } from "@mui/material";
import useErrorHandler from "Hooks/useErrorHandler";
import { FC } from "react";
import { useQuery } from "react-query";
import { getResults } from "Services/voting-session-api-service";
import VotingResultCard from "./VotingResultCard";

interface VotingSessionResultsProps {
  sessionId: number;
}

const VotingSessionResults: FC<VotingSessionResultsProps> = ({ sessionId }) => {
  const { isLoading, data: results } = useResults(sessionId);

  return (
    <Stack>
      {isLoading ? (
        <CircularProgress />
      ) : results && results.length > 0 ? (
        results.map((result) => <VotingResultCard {...result} />)
      ) : (
        "No results are available yet."
      )}
    </Stack>
  );
};

const useResults = (sessionId: number) => {
  const errorHandler = useErrorHandler();
  return useQuery("results", () => getResults(sessionId), {
    onError: errorHandler,
  });
};

export default VotingSessionResults;
