import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const VotingProgressCard = () => {
  const [votesCast] = useState<number>(0);
  const maxVotes = 10;

  return (
    <Card>
      <CardHeader title={"Voting progress"} />
      <CardContent>
        <Box bgcolor="#EEEEEE" px={3} py={1}>
          <Stack>
            <Typography variant="h6">Votes cast</Typography>
            <Typography variant="h3" color="red">
              {`${votesCast}/${maxVotes}`}
            </Typography>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default VotingProgressCard;
