import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import {
  AvailableStates,
  GlobalContext,
  InfoCardType,
} from "../../globalContext";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MapIcon from "@mui/icons-material/Map";
import { Breadcrumbs, Button, Link, Tooltip } from "@mui/material";

interface NavbarProps {
  aboutPage: boolean;
}
export default function Navbar({ aboutPage }: NavbarProps) {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(GlobalContext);
  const [isStateUnselected, setStateUnselected] = useState(
    state[state.length - 1].currentState === AvailableStates.Unselected
  );
  const [header, setHeader] = useState("Select a state from the map");

  useEffect(() => {
    if (aboutPage) setHeader("About GerryCast");
  }, []);

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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Tooltip title="Select State from Map">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={handleGoHome}
            >
              <MapIcon fontSize="large" />
            </IconButton>
          </Tooltip>
          <Typography
            component="div"
            fontWeight={"bold"}
            fontSize={"1.5rem"}
            sx={{ mr: 2, display: { xs: "none", sm: "block" } }}
          >
            GerryCast
          </Typography>
          <Box sx={{ flexGrow: 1 }} />

          {isStateUnselected || aboutPage ? (
            <Typography>{header}</Typography>
          ) : (
            <>
              <Breadcrumbs aria-label="breadcrumb">
                {state[state.length - 1].currentInfoCard ===
                InfoCardType.distanceMeasure ? (
                  <Link underline="none" color="white">
                    Distance Measure Comparision
                  </Link>
                ) : (
                  <Link underline="none" color="white">
                    Cluster Analysis
                  </Link>
                )}
                {state[state.length - 1].step > 0 &&
                  state[state.length - 1].currentInfoCard !==
                    InfoCardType.distanceMeasure && (
                    <Link underline="none" color="white">
                      {state[state.length - 1].distanceMeasure}
                    </Link>
                  )}
                {state[state.length - 1].step > 0 && (
                  <Link underline="none" color="white">
                    Ensemble {state[state.length - 1].ensemble}
                  </Link>
                )}
                {state[state.length - 1].step > 1 && (
                  <Link underline="none" color="white">
                    Cluster {state[state.length - 1].cluster}
                  </Link>
                )}
              </Breadcrumbs>
            </>
          )}

          {aboutPage ? (
            <div></div>
          ) : (
            <>
              <Box sx={{ flexGrow: 1 }} />{" "}
              <Button
                onClick={() => {
                  setHeader("");
                  navigate("/about");
                }}
                color="inherit"
              >
                About
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
