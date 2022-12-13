import {
  Alert,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AxiosError } from "axios";
import { FC, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { storeCredentials, Credentials } from "Services/auth-service";
import { useMutation } from "react-query";
import { postLogin } from "Services/auth-api-service";

export const LoginForm: FC = () => {
  const [invalidCredentials, isInvalidCredentials] = useState<boolean>(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { state } = useLocation();
  const tokenExpired: boolean = state ? state.tokenExpired : false;

  const handleLoginError = (error: AxiosError) => {
    if (error.response?.status === 401) {
      isInvalidCredentials(true);
    }
  };

  const loginMutation = useMutation(postLogin, {
    onSuccess: (credentials: Credentials) => {
      storeCredentials(credentials);
      navigate("/");
    },
    onError: handleLoginError,
  });

  const handleFormSubmit = () => {
    loginMutation.mutate({ email, password });
  };

  return (
    <Paper sx={{ p: 4 }} elevation={2}>
      <Stack spacing={2}>
        {invalidCredentials && (
          <Alert severity="error">Invalid credentials</Alert>
        )}
        {tokenExpired && (
          <Alert severity="info">
            Your session expired. Please log in again.
          </Alert>
        )}
        <Typography variant="h6" component="h1">
          Login to co-voting
        </Typography>
        <TextField
          type="email"
          label="E-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" onClick={handleFormSubmit}>
          Login
        </Button>
      </Stack>
    </Paper>
  );
};

export default LoginForm;
