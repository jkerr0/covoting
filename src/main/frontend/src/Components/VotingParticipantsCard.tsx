import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import usePresentList from "Hooks/usePresenceList";
import React, { FC } from "react";

interface VotingPresenceCardProps {
  sessionId: number;
}

const VotingPresenceCard: FC<VotingPresenceCardProps> = ({ sessionId }) => {
  const { presentList, isLoading } = usePresentList(sessionId);

  return (
    <Card>
      <CardHeader title={"List of participants"} />
      <CardContent>
        {isLoading ? (
          <CircularProgress />
        ) : (
          presentList && (
            <List>
              {presentList.map((user) => (
                <ListItem>
                  <ListItemAvatar><Avatar/></ListItemAvatar>
                  <ListItemText>{user.fullName}</ListItemText>
                </ListItem>
              ))}
            </List>
          )
        )}
      </CardContent>
    </Card>
  );
};

export default VotingPresenceCard;
