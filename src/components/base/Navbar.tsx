// import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import * as VscIcons from "react-icons/vsc";
import "../css/Navbar.css";
import { GlobalContext } from "../../globalContext";
import seahawks from "../images/Seattle-Seahawks-Logo.png";

// function Navbar() {
//   const { state, dispatch } = useContext(GlobalContext);
//   let clusterAnalysis = state[state.length - 1].clusterAnalysis;
//   const NavbarOptions = [
//     {
//       title: "Cluster Analysis",
//       path: "/",
//       icon: <VscIcons.VscGraphScatter />,
//       cName: "nav-text",
//       selected: clusterAnalysis,
//       onClick: () =>
//         dispatch({ type: "PAGE_CHANGE", payload: !clusterAnalysis }),
//     },
//     {
//       title: "Distance Measures",
//       path: "/distances",
//       icon: <VscIcons.VscMap />,
//       cName: "nav-text",
//       selected: !clusterAnalysis,
//       onClick: () =>
//         dispatch({ type: "PAGE_CHANGE", payload: !clusterAnalysis }),
//     },
//   ];

//   return (
//     <>
//       <div className="navbar">
//         <div className="navbar-title">
//           <h1>GerryCast</h1>
//           <img id="seahawks-logo" src={seahawks} alt="Logo" />
//         </div>
//         {/* <Link to='#' className="menu-bars">
//             <FaIcons.FaBars onClick={showSidebar}/>
//           </Link> */}
//         <div id="space-between" />
//         <ul className="navbar-options">
//           {NavbarOptions.map((item, index) => {
//             return (
//               <li key={index} onClick={item.onClick} className={item.cName}>
//                 <Link to={item.path} className="icon">
//                   {item.icon}
//                   <span>{item.title}</span>
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>
//       </div>

//       <hr />
//     </>
//   );
// }

// export default Navbar;
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useContext } from "react";
import Button from "@mui/material/Button/Button";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
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

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
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
          >
            <HomeIcon fontSize="large"/>
          </IconButton>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            GerryCast
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {
              NavbarOptions.map((option,index) => {
                return <Link to={option.path}><Button key={index} variant="contained" sx={{margin : "0.5rem"}}>{option.title}</Button></Link>
              })
            }
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}