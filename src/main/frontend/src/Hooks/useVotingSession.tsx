import { useQuery } from "react-query";
import { getVotingSessionById } from "Services/voting-session-api-service";
import useErrorHandler from "./useErrorHandler";

const useVotingSession = (sessionId: number) => {
  const errorHandler = useErrorHandler();
  const { data, isLoading } = useQuery(
    "voting-session",
    () => getVotingSessionById(sessionId),
    {
      onError: errorHandler,
    }
  );
  return { isLoading, votingSession: data };
};

export default useVotingSession;
