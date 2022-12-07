import { Box } from "@mui/material";
import React, { FC, ReactElement, useState } from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

interface WithNavbarProps {
  children: ReactElement;
}

const WithNavbar: FC<WithNavbarProps> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Navbar onMenuIconClick={() => setMenuOpen(true)}/>
        <SideMenu open={menuOpen} setOpen={setMenuOpen}/>
      </Box>
      {children}
    </>
  );
};

export default WithNavbar;
