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
import HomeIcon from "@mui/icons-material/Home";
import { Breadcrumbs, Button, Link } from "@mui/material";

export default function PrimarySearchAppBar() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(GlobalContext);
  const [isStateUnselected, setStateUnselected] = useState(
    state[state.length - 1].currentState === AvailableStates.Unselected
  );

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
      <AppBar position="static" color="primary">
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
            component="div"
            fontWeight={"bold"}
            fontSize={"1.5rem"}
            sx={{ mr: 2, display: { xs: "none", sm: "block" } }}
          >
            GerryCast
          </Typography>
          <Box sx={{ flexGrow: 1 }} />

          {isStateUnselected ? (
            <div> Select a state from the map </div>
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
                {state[state.length - 1].step > 0 && state[state.length - 1].currentInfoCard !==
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
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit">About</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
