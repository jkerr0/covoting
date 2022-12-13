import { Button } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCredentials } from "Services/auth-service";

export const LogoutButton: FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    deleteCredentials();
    navigate("/login");
  };
  return (
    <Button onClick={handleLogout} variant="contained">
      Logout
    </Button>
  );
};

export default LogoutButton;
