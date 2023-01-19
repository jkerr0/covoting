import { Box, Button, CircularProgress, Typography } from "@mui/material";
import useIsUserPresent from "Hooks/useIsUserPresent";
import { FC } from "react";
import { useStompClient } from "react-stomp-hooks";
import { getAuthorizationHeader } from "Services/auth-service";

interface ConfirmPresenceButtonProps {
  sessionId: number;
}

const ConfirmPresenceButton: FC<ConfirmPresenceButtonProps> = ({
  sessionId,
}) => {
  const { isUserPresent, isLoading } = useIsUserPresent(sessionId);
  const confirmHandler = useConfirmPresenceHandler(sessionId);

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {isUserPresent ? (
            <Typography>You have confirmed your presence.</Typography>
          ) : (
            <>
              <Typography>If you wish to vote: </Typography>
              <Button onClick={confirmHandler}>Confirm presence</Button>
            </>
          )}
        </Box>
      )}
    </>
  );
};

const useConfirmPresenceHandler = (sessionId: number) => {
  const stompClient = useStompClient();
  return () => {
    stompClient?.publish({
      destination: `/app/session/${sessionId}/presence-confirm`,
      headers: { Authorization: getAuthorizationHeader() },
    });
  }
};

export default ConfirmPresenceButton;
