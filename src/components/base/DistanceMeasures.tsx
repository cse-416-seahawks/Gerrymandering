import React, { useState, useContext } from "react";
import { GlobalContext, InfoCardType } from "../../globalContext";
import "../css/Distance.css";
import "../css/StateMap.css";
import "../../App.css";
import StateMap from "../statemap/StateMap";
import Navbar from "./Navbar";
import { Stack, IconButton, Stepper, Step, StepButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DistanceMeasureInfo from "../summary/DistanceMeasureInfo";
import { useNavigate } from "react-router-dom";

function DistanceMeasures() {
  const { state, dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();
  let currentStep = state[state.length - 1].step;

  function BackButton() {
    if (currentStep > 0) {
      return (
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => navigate("/home")}
          >
            <ArrowBackIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      );
    }
    return null;
  }

  return (
    <div className="Home">
      <div className="Home-content">
        <Navbar />
        <div className="StateMap-content">
          <header className="StateMap-header">
            <div className="State-map">
              <StateMap/>
            </div>
            <div className="distance-table-container">
              <div className="navigation-container">
                <BackButton />
              </div>

              {currentStep === 1 && <DistanceMeasureInfo/>}

            </div>
          </header>
        </div>
      </div>
    </div>
  );
}

export default DistanceMeasures;
