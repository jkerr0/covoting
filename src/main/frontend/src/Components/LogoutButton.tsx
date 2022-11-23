import { Button } from '@mui/material'
import React, { FC } from 'react'
import { deleteCredentials } from '../Services/auth-service'

interface LogoutButtonProps {
    afterLogout?: () => void
}

export const LogoutButton: FC<LogoutButtonProps> = ({afterLogout}) => {

    const handleLogout = () => {
        deleteCredentials()
        if (afterLogout) {
            afterLogout()
        }
    }
  return (
    <Button onClick={handleLogout} variant="contained">Logout</Button>
  )
}
