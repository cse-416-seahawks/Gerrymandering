import React, { useState } from "react";
import "./css/Distance.css";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";

function DistanceTable() {
  const steps = [
    "Select an Ensemble",
    "Compare Distance Measures",
  ];
  const [currentTab, setCurrentTab] = useState(0);

  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  function handleStepChange(step: number) {
    setCurrentTab(step);
  }

  return (
    <div className="distance-table-container">
      <div className="stepper-container">
        <Stepper activeStep={currentTab}>
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
    </div>
  );
}

export default DistanceTable;
