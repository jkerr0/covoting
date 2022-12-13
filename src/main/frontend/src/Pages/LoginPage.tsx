import { FC } from "react";
import CenteredBox from "Components/CenteredContainer";
import LoginForm from "Components/LoginForm";

const LoginPage: FC = () => {
  return (
    <CenteredBox maxWidth="sm">
      <LoginForm/>
    </CenteredBox>
  );
};

export default LoginPage;
