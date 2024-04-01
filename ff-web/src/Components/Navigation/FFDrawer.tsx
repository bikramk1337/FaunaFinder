import React, { Dispatch } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import {
  EmojiNatureOutlined,
  GroupsOutlined,
  Logout,
  SettingsOutlined,
  SpaceDashboardOutlined,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { Toolbar } from "@mui/material";
import { useDispatch } from "react-redux";
import { setIsLoggedOut } from "../../Redux/Slices/authSlice";

const drawerWidth = 240;

interface Props {
  showDrawer: boolean;
  handleDrawerClose: () => void;
  handleDrawerTransitionEnd: () => void;
}

const FFDrawer = (props: Props) => {
  const { showDrawer, handleDrawerClose, handleDrawerTransitionEnd } = props;
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const handleLogOutClick = () => {
    dispatch(setIsLoggedOut());
    navigate("/");
  };

  const drawer = (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      flexGrow="1"
    >
      <List>
        <ListItem>
          <ListItemButton
            selected={location.pathname.includes("dashboard")}
            disableRipple
            onClick={() => {
              navigate("dashboard");
            }}
          >
            <ListItemIcon>
              <SpaceDashboardOutlined />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton
            disableRipple
            selected={location.pathname.includes("users")}
            onClick={() => {
              navigate("users");
            }}
          >
            <ListItemIcon>
              <GroupsOutlined />
            </ListItemIcon>
            <ListItemText primary={"Users"} />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            disableRipple
            selected={location.pathname.includes("species")}
            onClick={() => {
              navigate("species");
            }}
          >
            <ListItemIcon>
              <EmojiNatureOutlined />
            </ListItemIcon>
            <ListItemText primary={"Species"} />
          </ListItemButton>
        </ListItem>
      </List>

      <List>
        <ListItem disablePadding>
          <ListItemButton
            disableRipple
            onClick={() => {
              navigate("settings");
            }}
          >
            <ListItemIcon>
              <SettingsOutlined />
            </ListItemIcon>
            <ListItemText primary={"Settings"} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton disableRipple onClick={handleLogOutClick}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const drawerMobile = (
    <List>
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => {
            navigate("dashboard");
            handleDrawerClose();
          }}
        >
          <ListItemIcon>
            <SpaceDashboardOutlined />
          </ListItemIcon>
          <ListItemText primary={"Dashboard"} />
        </ListItemButton>
      </ListItem>
      <Divider />
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => {
            navigate("users");
            handleDrawerClose();
          }}
        >
          <ListItemIcon>
            <GroupsOutlined />
          </ListItemIcon>
          <ListItemText primary={"Users"} />
        </ListItemButton>
      </ListItem>
      <Divider />
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => {
            navigate("species");
            handleDrawerClose();
          }}
        >
          <ListItemIcon>
            <EmojiNatureOutlined />
          </ListItemIcon>
          <ListItemText primary={"Species"} />
        </ListItemButton>
      </ListItem>
      <Divider />
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => {
            navigate("settings");
            handleDrawerClose();
          }}
        >
          <ListItemIcon>
            <SettingsOutlined />
          </ListItemIcon>
          <ListItemText primary={"Settings"} />
        </ListItemButton>
      </ListItem>
      <Divider />
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => {
            navigate("/auth");
            handleDrawerClose();
          }}
        >
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText primary={"Logout"} />
        </ListItemButton>
      </ListItem>
    </List>
  );

  return (
    <Box sx={{ display: "flex", bgcolor: "yellow" }}>
      <Drawer
        variant="temporary"
        open={showDrawer}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        <Toolbar />
        {drawerMobile}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        <Toolbar />
        {drawer}
      </Drawer>
    </Box>
  );
};

export default FFDrawer;
