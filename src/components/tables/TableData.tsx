import React, { FC, useState, useContext, useEffect } from "react";
import "../css/TableData.css";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import { GlobalContext } from "../../globalContext";
import Ensembles from "./Ensembles";
import ClusterTable from "./ClusterTable";
import AssociationClusters from "./AssociationClusters";


function TableData(props: {
  selectedState: string;
  onDistrictSelection: (
    district_num: number,
    coordinates: Array<number>
  ) => void;
}) {

  const { state, dispatch } = useContext(GlobalContext);

  let currentStep = state[state.length - 1].step;

  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  
  const steps = [
    "Select an Ensemble",
    "Select a Cluster",
    "Select a District Plan",
  ];


  // When the state changes from the menu drop down, stepper should go to 'Select an Ensemble'
  useEffect(() => {
    handleStepChange(0);
  }, [props.selectedState]);

  function handleStepChange(step: number) {
    
    if (step === 2) {
      console.log("CHANGING TO DISTRICT MAP");
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
    dispatch({
      type : "STEP_CHANGE",
      payload : {
        step : step
      }
    })

    console.log("step changed ", step);
  }

  function handleDistrictChange(district_num: number, coords: Array<number>) {
    props.onDistrictSelection(district_num, coords);
  }

  function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   *
   * Table Data for ensembles
   */
  
  
  function BackButton() {
    if (currentStep > 0) {
      // console.log("slay")
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
    // console.log("not slay")
    return null;
  }

  return (
    <div className="table-container">
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
      {currentStep == 0 && <Ensembles showToggle={true} handleStep={handleStepChange} />}
      {/* Summary of Cluster */}
      {currentStep == 1 && <ClusterTable />}
      {/* <AverageMeasureTable/> <Party Affilations, Association of Clusters*/}
      {currentStep == 2 && (
        <AssociationClusters onDistrictSelection={handleDistrictChange} />
      )}
    </div>
  );
}

export default TableData;

