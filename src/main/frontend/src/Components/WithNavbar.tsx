import { Box } from "@mui/material";
import { FC, ReactElement, useState } from "react";
import Navbar from "Components/Navbar";
import SideMenu from "Components/SideMenu";

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
