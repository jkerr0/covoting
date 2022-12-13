import { Button, Stack, Typography } from "@mui/material";
import { FC } from "react";
import CenteredContainer from "Components/CenteredContainer";

const NotFoundPage: FC = () => {
  return (
    <CenteredContainer>
      <Stack>
        <Typography textAlign={'center'}>Page not found</Typography>
        <Button href='/'>Go to home page</Button>
      </Stack>
    </CenteredContainer>
  );
};

export default NotFoundPage;
