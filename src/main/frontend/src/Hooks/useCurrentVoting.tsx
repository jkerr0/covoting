
import { useState } from "react";
import { useStompClient } from "react-stomp-hooks";
import { Voting } from "Utils/data";

const useCurrentVoting = (sessionId: number, onUpdate?: (v: Voting) => void) => {
  const stompClient = useStompClient();

  const [voting, setVoting] = useState<Voting | undefined>();

  stompClient?.subscribe(`/topic/current-voting.${sessionId}`, (message) => {
    const voting = JSON.parse(message.body);
    setVoting(voting);
    if (onUpdate) {
      onUpdate(voting);
    }
  });

  return voting;
};

export default useCurrentVoting;