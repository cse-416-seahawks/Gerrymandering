import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as VscIcons from "react-icons/vsc";
import "../css/Navbar.css";
import { AvailableStates, GlobalContext } from "../../globalContext";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button/Button";
import { Link } from "@mui/material";

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { state, dispatch } = useContext(GlobalContext);
  const [isStateUnselected, setStateUnselected] = useState(
    state[state.length - 1].currentState === AvailableStates.Unselected
  );
  let clusterAnalysis = state[state.length - 1].clusterAnalysis;

  const [breadcrumbs, setBreadcrumbs] = useState<Array<React.JSX.Element>>([]);

  const NavbarOptions = [
    {
      title: "Cluster Analysis",
      path: "/home",
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


  const handleGoHome = () => {
    setStateUnselected(true);
    dispatch({
      type: "CHANGE_STATE",
      payload: {
        currentState: AvailableStates.Unselected,
      },
    });
    navigate("/");
  };

  const handleClick = (path : string) => {
    dispatch({
      type : "CHANGE_STATE",
      payload : {
        currentState : state[state.length - 1].currentState
      }
    })
    navigate(path);
  }

  const menuId = "primary-search-account-menu";

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
            onClick={handleGoHome}
          >
            <HomeIcon fontSize="large" />
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{ mr: 2, display: { xs: "none", sm: "block" } }}
          >
            GerryCast
          </Typography>
          <Box sx={{ flexGrow: 1 }} />

          {isStateUnselected ? (
            <div>Select a state from the map</div>
          ) : (
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {NavbarOptions.map((option, index) => {
                return (
                    <Button
                      key={index}
                      variant="outlined"
                      sx={{ margin: "0.5rem", color: "white" }}
                      onClick={() => {handleClick(option.path)}}
                    >
                      {option.title}
                    </Button>
                );
              })}
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
