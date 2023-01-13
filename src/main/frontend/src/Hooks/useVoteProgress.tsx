import { useState } from "react";
import { useQuery } from "react-query";
import { useStompClient } from "react-stomp-hooks";
import { getVotingSessionCurrentVotingProgress } from "Services/voting-session-api-service";
import useErrorHandler from "Hooks/useErrorHandler";
import usePresentList from "Hooks/usePresenceList";

const useVoteProgress = (sessionId: number) => {
  const [currentVotes, setCurrentVotes] = useState<number | undefined>();

  const errorHandler = useErrorHandler();
  const { data, isLoading: isProgressLoading } = useQuery(
    "vote-progress",
    () => getVotingSessionCurrentVotingProgress(sessionId),
    { onError: errorHandler }
  );

  const stompClient = useStompClient();
  stompClient?.subscribe(`/topic/voting-progress.${sessionId}`, (message) => {
    setCurrentVotes(JSON.parse(message.body));
  });

  const { presentList, isLoading: isUserListLoading } =
    usePresentList(sessionId);
  const currentMaxVotes =
    presentList &&
    presentList.map((user) => user.voteWeight).reduce((x, y) => x + y, 0);

  return {
    currentVotes: currentVotes || data?.currentVotes,
    maxVotes: currentMaxVotes || data?.maxVotes,
    isLoading: isProgressLoading || isUserListLoading,
    resetProgress: () => setCurrentVotes(0),
  };
};

export default useVoteProgress;
