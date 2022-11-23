import {
  Alert,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import axiosInstance from "../axios-instance";
import { storeCredentials, Credentials } from "../Services/auth-service";

export default function LoginForm() {
  const [invalidCredentials, isInvalidCredentials] = useState<boolean>(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = () => {
    axiosInstance
      .post("/auth/login", {
        email,
        password,
      })
      .then(res => res.data as Credentials)
      .then(storeCredentials)
      .catch(() => isInvalidCredentials(true));
  };

  return (
    <Paper>
      <Stack spacing={2}>
        {invalidCredentials && (
          <Alert severity="error">Invalid credentials</Alert>
        )}
        <Typography variant="h6" component="h1">
          Login to co-voting
        </Typography>
        <TextField
          type="email"
          label="E-mail"
          onChange={(e) => setEmail(e.target.value)}
        ></TextField>
        <TextField
          type="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
        ></TextField>
        <Button variant="contained" onClick={handleFormSubmit}>
          Login
        </Button>
      </Stack>
    </Paper>
  );
}
