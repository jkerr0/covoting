import { useState } from "react";
import { useStompClient } from "react-stomp-hooks";
import { Voting } from "Utils/data";

const useCurrentVoting = (sessionId: number) => {
  const stompClient = useStompClient();

  const [voting, setVoting] = useState<Voting | undefined>();

  stompClient?.subscribe(`/topic/current-voting.${sessionId}`, (message) => {
    setVoting(JSON.parse(message.body));
  });

  return voting;
};

export default useCurrentVoting;
