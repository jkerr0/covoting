import { useState } from "react";
import { useQuery } from "react-query";
import { useStompClient } from "react-stomp-hooks";
import { getPresentList } from "Services/voting-session-api-service";
import { ApplicationUser } from "Utils/data";
import useErrorHandler from "./useErrorHandler";

const usePresentList = (
  sessionId: number,
  onNewUser?: (user: ApplicationUser) => void
) => {
  const [presentList, setPresentList] = useState<
    ApplicationUser[] | undefined
  >();

  const errorHandler = useErrorHandler();
  const { isLoading } = useQuery(
    "present-list",
    () => getPresentList(sessionId),
    {
      onSuccess: setPresentList,
      onError: errorHandler,
    }
  );

  const stompClient = useStompClient();
  stompClient?.subscribe(`/topic/presence-list.${sessionId}`, (message) => {
    const user = JSON.parse(message.body);
    setPresentList(presentList && [...presentList, user]);
    if (onNewUser) {
      onNewUser(user);
    }
  });

  return { presentList, isLoading };
};

export default usePresentList;
