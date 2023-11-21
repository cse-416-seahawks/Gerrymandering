// import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as VscIcons from "react-icons/vsc";
import "../css/Navbar.css";
import { AvailableStates, GlobalContext } from "../../globalContext";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useContext } from "react";
import Button from "@mui/material/Button/Button";

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const isMenuOpen = Boolean(anchorEl);
  const { state, dispatch } = useContext(GlobalContext);
  let clusterAnalysis = state[state.length - 1].clusterAnalysis;
  const NavbarOptions = [
    {
      title: "Cluster Analysis",
      path: "/Home",
      icon: <VscIcons.VscGraphScatter />,
      cName: "nav-text",
      selected: clusterAnalysis,
      onClick: () =>
        dispatch({ type: "PAGE_CHANGE", payload: !clusterAnalysis }),
    },
    {
      title: "Distance Measures",
      path: "/distances",
      icon: <VscIcons.VscMap />,
      cName: "nav-text",
      selected: !clusterAnalysis,
      onClick: () =>
        dispatch({ type: "PAGE_CHANGE", payload: !clusterAnalysis }),
    },
  ];

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => {
              navigate("/");
            }}
          >
            <HomeIcon fontSize="large" />
          </IconButton>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            GerryCast
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {state[state.length - 1].currentState ==
          AvailableStates.Unselected ? (
            <div>Select a state from the map</div>
          ) : (
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {NavbarOptions.map((option, index) => {
                return (
                  <Link to={option.path}>
                    <Button
                      key={index}
                      variant="outlined"
                      sx={{ margin: "0.5rem", color : "white" }}
                    >
                      {option.title}
                    </Button>
                  </Link>
                );
              })}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
