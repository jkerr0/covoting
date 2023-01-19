import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import useIsUserPresent from "Hooks/useIsUserPresent";
import { FC, MouseEventHandler, useState } from "react";
import { useStompClient } from "react-stomp-hooks";
import { getAuthorizationHeader } from "Services/auth-service";

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

interface VoteCastCardProps {
  sessionId: number;
  votingEnabled: boolean | undefined;
  isLoading: boolean;
  noNextVoting: boolean;
  onVote: () => void;
}

const VoteCastCard: FC<VoteCastCardProps> = ({
  sessionId,
  votingEnabled,
  onVote,
  isLoading,
  noNextVoting,
}) => {
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [voteType, setVoteType] = useState<VoteType | undefined>();
  const { isUserPresent, isLoading: isUserPresentLoading } =
    useIsUserPresent(sessionId);

  const voteHandler = useVoteCastHandler(sessionId);

  const handleVoteConfirmed = () => {
    if (!voteType) {
      throw new Error("No vote type selected");
    }
    voteHandler(voteType);
    onVote();
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
          {isLoading || isUserPresentLoading ? (
            <CircularProgress />
          ) : votingEnabled && isUserPresent ? (
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
          ) : (
            <Typography>
              {isUserPresent
                ? noNextVoting
                  ? "There will be no more votings."
                  : "Please wait for the next voting."
                : "Sorry you haven't confirmed your presence."}
            </Typography>
          )}
        </CardContent>
      </Card>
      <ConfirmDialog />
    </>
  );
};

const useVoteCastHandler = (sessionId: number) => {
  const stompClient = useStompClient();

  return (voteType: VoteType) =>
    stompClient?.publish({
      destination: `/app/session/${sessionId}/vote`,
      body: voteType.toUpperCase(),
      headers: { Authorization: getAuthorizationHeader() },
    });
};

export default VoteCastCard;
