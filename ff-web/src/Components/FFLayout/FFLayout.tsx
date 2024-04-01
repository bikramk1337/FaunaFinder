import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { FFDrawer } from "../Navigation";
import { Outlet } from "react-router-dom";
import { Menu } from "@mui/icons-material";
import { Logo, LogoText } from "../Logo";

const drawerWidth = 240;

type Props = {};

const FFLayout = (props: Props) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setShowDrawer(!showDrawer);
    }
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setShowDrawer(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        variant="outlined"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "white",
          // borderBottom: 1,
          // borderBottomColor: "grey.500",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <Menu />
          </IconButton>
          <Box sx={{ mr: 2, display: { xs: "none", md: "block" } }}>
            <Logo size={40} />
          </Box>
          <LogoText variant="h6" />
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <FFDrawer
          showDrawer={showDrawer}
          handleDrawerClose={handleDrawerClose}
          handleDrawerTransitionEnd={handleDrawerTransitionEnd}
        />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default FFLayout;
