import { Breakpoint, Container } from "@mui/material";
import { CSSProperties, FC, ReactElement } from "react";

const centeredStyle: CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

interface CenteredContainerProps {
  children: ReactElement;
  maxWidth?: Breakpoint;
}

const CenteredContainer: FC<CenteredContainerProps> = ({
  children,
  maxWidth,
}) => {
  return (
    <Container maxWidth={maxWidth} style={centeredStyle}>
      {children}
    </Container>
  );
};

export default CenteredContainer;
