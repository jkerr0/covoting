import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { FC } from "react";
import LogoutButton from "Components/LogoutButton";
import MenuIcon from '@mui/icons-material/Menu';

interface NavbarProps {
    onMenuIconClick?: () => void
}

const Navbar: FC<NavbarProps> = ({onMenuIconClick}) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={onMenuIconClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Co-voting
        </Typography>
        <LogoutButton/>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
