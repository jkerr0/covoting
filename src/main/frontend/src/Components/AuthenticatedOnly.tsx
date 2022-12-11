import { FC, ReactElement, useEffect } from "react";
import { findCredentials } from "Services/auth-service";
import { useNavigate } from "react-router-dom";

interface AuthenticatedOnlyProps {
  children: ReactElement;
}

const AuthenticatedOnly: FC<AuthenticatedOnlyProps> = ({ children }) => {
  useCredentialsOrRedirectToLogin();
  return children;
};

const useCredentialsOrRedirectToLogin = () => {
  const navigate = useNavigate();
  const isNotAuthenticated = (): boolean => !findCredentials().credentials;

  useEffect(() => {
    if (isNotAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);
}

export default AuthenticatedOnly;
