import React, { useState, useContext, useEffect } from "react";
import "../css/Distance.css";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import "../css/TableData.css";
import TabPanel from "@mui/lab/TabPanel";
import DistanceGraph from "./DistanceGraph";
import { GlobalContext } from "../../globalContext";
import { Stack, IconButton } from "@mui/material";
import * as sampleData from "../SampleData"
import  Ensembles  from "../summary/EnsemblesSummary"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function DistanceTable() {
  const steps = ["Select an Ensemble", "Compare Distance Measures"];
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const { state, dispatch } = useContext(GlobalContext);

  let currentStep = state[state.length - 1].step;


  function handleStepChange(step: number) {
    dispatch({
      type : "STEP_CHANGE",
      payload : {
        step : step
      }
    })
    if (step === 1) {
      dispatch({
        type: "DISTRICT_MAP",
        payload: {
          dismap: true,
        },
      });
    } else {
      dispatch({
        type: "STATE_MAP",
        payload: {
          dismap: false,
        },
      });
    }
    
  }

  useEffect(() => {
    if(currentStep === 1){
      dispatch({
        type: "DISTRICT_MAP",
        payload: {
          dismap: true,
        },
      });
    }
  })

  function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  function BackButton() {
    if (currentStep > 0) {
      return (
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => handleStepChange(currentStep - 1)}
          >
            <ArrowBackIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      );
    }
    return null;
  }



  return (
    <div className="distance-table-container">
      <div className="stepper-container">
        <Stepper activeStep={currentStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton
                color="inherit"
                onClick={() => handleStepChange(index)}
              >
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </div>
      <BackButton />
      {/* State Details */}
      {currentStep === 0 && <Ensembles showToggle={false} handleStep={handleStepChange} />}
      {/* Summary of Cluster */}
      {currentStep === 1 && <DistanceGraph />}
    </div>
  );
}

export default DistanceTable;
