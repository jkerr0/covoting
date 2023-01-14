import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { FC, useState } from "react";
import { useStompClient } from "react-stomp-hooks";
import { VotingResult } from "Utils/data";
import VotingResultCard from "./VotingResultCard";

interface NewResultPopupProps {
  sessionId: number;
}

const NewResultPopup: FC<NewResultPopupProps> = ({ sessionId }) => {
  const { popupOpen, result, closePopup } = useResultPopup(sessionId);
  return (
    <Dialog open={popupOpen}>
      <DialogTitle>Voting result</DialogTitle>
      <DialogContent>
        {result && <VotingResultCard {...result} />}
      </DialogContent>
      <DialogActions>
        <Button onClick={closePopup}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

const useResultPopup = (sessionId: number) => {
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const [result, setResult] = useState<VotingResult | undefined>();

  const stompClient = useStompClient();
  stompClient?.subscribe(`/topic/new-result.${sessionId}`, (message) => {
    const result: VotingResult = JSON.parse(message.body);
    setResult(result);
    setPopupOpen(true);
  });
  return { popupOpen, result, closePopup: () => setPopupOpen(false) };
};

export default NewResultPopup;
