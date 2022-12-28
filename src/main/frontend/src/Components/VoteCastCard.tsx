import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { FC, MouseEventHandler, useState } from "react";

interface VoteButtonProps {
  children?: string;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
    | undefined;
  onClick?: MouseEventHandler;
}
const VoteButton: FC<VoteButtonProps> = ({ color, children, onClick }) => (
  <Button
    onClick={onClick !== undefined ? onClick : () => {}}
    sx={{ py: 2, px: 4 }}
    size="large"
    color={color}
    variant="contained"
  >
    {children || ""}
  </Button>
);

type VoteType = "for" | "against" | "abstain";

const VoteCastCard = () => {
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [voteType, setVoteType] = useState<VoteType | undefined>();

  const handleVoteConfirmed = () => {
    setVoteType(undefined);
    setConfirmOpen(false);
  };

  const handleVote = (type: VoteType) => {
    setVoteType(type);
    setConfirmOpen(true);
  };

  const ConfirmDialog = () => (
    <Dialog open={confirmOpen} fullWidth>
      <DialogTitle>Confirm vote</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure? Your vote is: {voteType}.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleVoteConfirmed}>Ok</Button>
        <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <>
      <Card style={{ height: "100%" }}>
        <CardHeader title={"Cast a vote"} />
        <CardContent>
          <Box sx={{ display: "flex" }} justifyContent="space-around" gap={2}>
            <VoteButton color="success" onClick={() => handleVote("for")}>
              Vote for
            </VoteButton>
            <VoteButton color="error" onClick={() => handleVote("against")}>
              Vote against
            </VoteButton>
            <VoteButton onClick={() => handleVote("abstain")}>
              Abstain
            </VoteButton>
          </Box>
        </CardContent>
      </Card>
      <ConfirmDialog />
    </>
  );
};

export default VoteCastCard;
