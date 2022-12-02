import { FC } from "react";
import { Typography } from "@mui/material";

interface PageHeaderProps {
  children: string;
}

const PageHeader: FC<PageHeaderProps> = ({ children }) => {
  return (
    <Typography variant="h5" component="h1" mt={5} color={'#707070'}>
      {children}
    </Typography>
  );
};

export default PageHeader;
