
import { useState } from "react";
import { useStompClient } from "react-stomp-hooks";
import { Voting } from "Utils/data";

const useCurrentVotingWithCallback = (sessionId: number, onUpdate: (v: Voting) => void) => {
  const stompClient = useStompClient();

  const [voting, setVoting] = useState<Voting | undefined>();

  stompClient?.subscribe(`/topic/current-voting.${sessionId}`, (message) => {
    const voting = JSON.parse(message.body);
    setVoting(voting);
    onUpdate(voting);
  });

  return voting;
};

export default useCurrentVotingWithCallback;