import { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  Box,
  Typography,
  IconButton,
  AppBar,
  Drawer,
  Toolbar,
  CssBaseline,
  useMediaQuery,
} from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

import { AccountMenu } from "./AccountMenu";
import { MainMenu } from "./MainMenu";

import { useTheme, createTheme } from "@mui/material/styles";
const mdTheme = createTheme({});
const drawerWidth = 240;
const AppBarHeight = "64px";

export function CustomAppBar({ page, children }) {
  const theme = useTheme(mdTheme);
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar component="nav" color="primary">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: AppBarHeight,
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => {
              setDrawerOpen((prevState) => !prevState);
            }}
            sx={{ mr: 2, display: { md: "block", lg: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ margin: "auto" }}>
            <Typography component="h1" variant="h6" color="inherit">
              {page}
            </Typography>
          </Box>
          {isLargeScreen ? (
            <Box>
              <IconButton>
                <NavLink to="/profile/">
                  <AccountCircleIcon sx={{ color: "white" }} />
                </NavLink>
              </IconButton>
              <IconButton sx={{ mx: "15px" }}>
                <NavLink to="/logout/">
                  <PowerSettingsNewIcon sx={{ color: "white" }} />
                </NavLink>
              </IconButton>
            </Box>
          ) : (
            <AccountMenu />
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isLargeScreen ? "permanent" : "temporary"}
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            mt: AppBarHeight,
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open={isLargeScreen || drawerOpen}
        onClose={() => {
          setDrawerOpen((prevState) => !prevState);
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {MainMenu}
      </Drawer>

      <Box
        component="main"
        sx={{
          p: { lg: 3, xs: 0 },
          width: { lg: `calc(100% - ${drawerWidth}px)`, xs: "100%" },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
