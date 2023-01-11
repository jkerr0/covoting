import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { useStompClient } from "react-stomp-hooks";

interface VotingProgressCardProps {
  sessionId: number
}

const VotingProgressCard: FC<VotingProgressCardProps> = ({sessionId}) => {
  const maxVotes = 10;
  const voteProgress = useVoteProgress(sessionId);

  return (
    <Card>
      <CardHeader title={"Voting progress"} />
      <CardContent>
        <Box bgcolor="#EEEEEE" px={3} py={1}>
          <Stack>
            <Typography variant="h6">Votes cast</Typography>
            <Typography variant="h3" color="red">
              {`${voteProgress}/${maxVotes}`}
            </Typography>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

const useVoteProgress = (sessionId: number) => {
  const [voteProgress, setVoteProgress] = useState<number>(0);

  const stompClient = useStompClient();
  stompClient?.subscribe(`/topic/voting-progress.${sessionId}`, (message) => {
    setVoteProgress(JSON.parse(message.body));
  });

  return voteProgress;
};

export default VotingProgressCard;
