import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { FC } from "react";
import HomeIcon from "@mui/icons-material/Home";

interface MenuProps {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
}

const SideMenu: FC<MenuProps> = ({ open, setOpen }) => {
  return (
    <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
      <Box onClick={() => setOpen(false)}>
        <List>
          <ListItem>
            <ListItemButton href="/">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText>Voting sessions</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default SideMenu;
