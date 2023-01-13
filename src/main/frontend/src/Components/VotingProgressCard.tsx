import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import useErrorHandler from "Hooks/useErrorHandler";
import usePresentList from "Hooks/usePresenceList";
import { FC, useState } from "react";
import { useQuery } from "react-query";
import { useStompClient } from "react-stomp-hooks";
import { getVotingSessionCurrentVotingProgress } from "Services/voting-session-api-service";

interface VotingProgressCardProps {
  sessionId: number;
}

const VotingProgressCard: FC<VotingProgressCardProps> = ({ sessionId }) => {
  const { currentVotes, maxVotes, isLoading } = useVoteProgress(sessionId);

  return (
    <Card>
      <CardHeader title={"Voting progress"} />
      <CardContent>
        <Box bgcolor="#EEEEEE" px={3} py={1}>
          <Stack>
            <Typography variant="h6">Votes cast</Typography>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Typography variant="h3" color="red">
                {`${currentVotes !== undefined ? currentVotes : "-"}/${
                  maxVotes !== undefined ? maxVotes : "-"
                }`}
              </Typography>
            )}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

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
  };
};

export default VotingProgressCard;
