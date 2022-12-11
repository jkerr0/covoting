import { Button, Stack, Typography } from '@mui/material'
import { FC } from 'react'
import CenteredContainer from 'Components/CenteredContainer'

const ErrorPage: FC = () => {
  return (
    <CenteredContainer>
      <Stack>
        <Typography textAlign={'center'}>Unexpected error occured</Typography>
        <Button href='/'>Go to home page</Button>
      </Stack>
    </CenteredContainer>

  )
}

export default ErrorPage