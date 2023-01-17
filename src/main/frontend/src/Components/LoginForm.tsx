import {
  Alert,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AxiosError } from "axios";
import { FC, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { storeCredentials, Credentials } from "Services/auth-service";
import { useMutation, useQueryClient } from "react-query";
import { postLogin } from "Services/auth-api-service";
import { AuthContext } from "Utils/AuthContext";
import * as yup from "yup";
import { useFormik } from "formik";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const LoginForm: FC = () => {
  const [invalidCredentials, isInvalidCredentials] = useState<boolean>(false);

  const navigate = useNavigate();
  const { state } = useLocation();
  const tokenExpired: boolean = state ? state.tokenExpired : false;

  const authContext = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      loginMutation.mutate(values);
    },
  });


  const handleLoginError = (error: AxiosError) => {
    if (error.response?.status === 401) {
      isInvalidCredentials(true);
    }
  };

  const queryClient = useQueryClient();
  const loginMutation = useMutation(postLogin, {
    onSuccess: (credentials: Credentials) => {
      queryClient.invalidateQueries();
      storeCredentials(credentials);
      authContext.setCredentials(credentials);
      navigate("/");
    },
    onError: handleLoginError,
  });

  return (
    <Paper sx={{ p: 4 }} elevation={2}>
      <form onSubmit={formik.handleSubmit}>
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
            id="email"
            label="E-mail"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            id="password"
            type="password"
            label="Password"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.touched.password)}
            helperText={formik.touched.password && formik.touched.password}
          />
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default LoginForm;
