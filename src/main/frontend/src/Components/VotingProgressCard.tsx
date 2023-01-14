import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { FC } from "react";

interface VotingProgressCardProps {
  currentVotes: number | undefined;
  maxVotes: number | undefined;
  isLoading: boolean;
}

const VotingProgressCard: FC<VotingProgressCardProps> = ({ currentVotes, maxVotes, isLoading }) => {

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


export default VotingProgressCard;
