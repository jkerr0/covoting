import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { FC, ReactElement } from "react";
import HomeIcon from "@mui/icons-material/Home";

interface MenuProps {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
}

interface MenuElementProps {
  href: string,
  icon: ReactElement,
  label: string
}

const MenuElement: FC<MenuElementProps> = ({href, icon, label}) => (
  <ListItem>
    <ListItemButton href={href}>
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      <ListItemText>{label}</ListItemText>
    </ListItemButton>
  </ListItem>
);

const SideMenu: FC<MenuProps> = ({ open, setOpen }) => {
  return (
    <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
      <Box onClick={() => setOpen(false)}>
        <List>
          <MenuElement href="/" icon={<HomeIcon />} label="Voting sessions"/>
        </List>
      </Box>
    </Drawer>
  );
};

export default SideMenu;
