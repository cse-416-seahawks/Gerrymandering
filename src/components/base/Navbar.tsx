import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/Navbar.css";
import {
  AvailableStates,
  GlobalContext,
  GlobalTypes,
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
  const [header, setHeader] = useState("Select a state from the map");
  const { stateName } = useParams();
  const currentPathname = window.location.pathname;

  useEffect(() => {
    if (aboutPage) setHeader("About GerryCast");
  }, []);

  const handleGoHome = () => {
    dispatch({
      type: GlobalTypes.ResetPage,
      payload: {
        clean: true,
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
          {!stateName || aboutPage ? (
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
                {currentPathname.includes("/distance/") &&
                  state[state.length - 1].currentInfoCard !==
                    InfoCardType.distanceMeasure && (
                    <Link underline="none" color="white">
                      {state[state.length - 1].distanceMeasure}
                    </Link>
                  )}
                {currentPathname.includes("/ensemble/") && (
                  <Link underline="none" color="white">
                    Ensemble {state[state.length - 1].ensemble}
                  </Link>
                )}
                {currentPathname.includes("/cluster/") && (
                  <Link underline="none" color="white">
                    Cluster {state[state.length - 1].cluster}
                  </Link>
                )}
              </Breadcrumbs>
            </>
          )}
          <Box sx={{ flexGrow: 1 }} />{" "}
          {aboutPage ? (
            <div></div>
          ) : (
            <>
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
