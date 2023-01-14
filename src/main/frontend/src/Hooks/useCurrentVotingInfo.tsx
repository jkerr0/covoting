import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { getVotingSessionCurrentVotingInfo } from "Services/voting-session-api-service";
import { CurrentVotingInfo } from "Utils/data";
import useErrorHandler from "./useErrorHandler";

const useCurrentVotingInfo = (sessionId: number) => {
  const getQueryName = () => `current-voting-${sessionId}`;

  const {
    isLoading,
    data: votingInfo,
    error,
  } = useQuery<CurrentVotingInfo, AxiosError>(getQueryName(), () =>
    getVotingSessionCurrentVotingInfo(sessionId)
  );
  useErrorHandler(error);

  return { isLoading, votingInfo };
};

export default useCurrentVotingInfo;