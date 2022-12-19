import { FC, ReactElement, useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "Utils/AuthContext";
import CenteredContainer from "./CenteredContainer";
import { CircularProgress } from "@mui/material";

interface AuthenticatedOnlyProps {
  children: ReactElement;
}

const AuthenticatedOnly: FC<AuthenticatedOnlyProps> = ({ children }) => {
  const shouldRender = useCredentialsOrRedirectToLogin();
  return shouldRender ? (
    children
  ) : (
    <CenteredContainer>
      <CircularProgress />
    </CenteredContainer>
  );
};

const useCredentialsOrRedirectToLogin = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (!authContext.credentials) {
      navigate("/login");
    } else {
      setShouldRender(true);
    }
  }, [authContext.credentials]);

  return shouldRender;
};

export default AuthenticatedOnly;
