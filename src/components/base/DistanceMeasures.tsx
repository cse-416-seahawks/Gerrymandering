import React, { useState, useContext } from "react";
import { GlobalContext, InfoCardType } from "../../globalContext";
import "../css/Distance.css";
import "../css/StateMap.css";
import "../../App.css";
import StateMap from "../statemap/StateMap";
import Navbar from "./Navbar";
import { GlobalProvider } from "../../globalContext";
import DistanceTable from "../tables/DistanceTable";
import DistanceGraph from "../summary/DistanceMeasureInfo";
import { Stack, IconButton, Stepper, Step, StepButton } from "@mui/material";
import Ensembles from "../summary/EnsemblesList";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DistanceMeasureInfo from "../summary/DistanceMeasureInfo";
import { useNavigate } from "react-router-dom";

function Distance() {
  const [selectedDistrict, setSelectedDistrict] = useState<number>(-1);
  const [centerCoordinates, setCenterCoordinates] = useState<Array<number>>([
    38.5, -116.5,
  ]);

  const { state, dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleDistrictSelection = (
    district_num: number,
    coordinates: Array<number>
  ) => {
    setSelectedDistrict(district_num);
    setCenterCoordinates(coordinates);
  };

  const steps = ["Select an Ensemble", "Compare Distance Measures"];
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});


  let currentStep = state[state.length - 1].step;

  function handleStepChange(step: number) {
    if(step === 0){
      dispatch ({
        type : "CHANGE_INFO_CARD",
        payload : {
          infoCardType : InfoCardType.ensembleInfo
        }
      })
    }
    dispatch({
      type: "STEP_CHANGE",
      payload: {
        step: step,
      },
    });
  }

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
              <StateMap
                selectedState={state[state.length - 1].currentState}
                centerCoordinates={[38.5, -116.5]}
                selectedDistrict={selectedDistrict}
              />
            </div>
            <div className="distance-table-container">
              <div className="navigation-container">
                <BackButton />
              </div>
              {/* State Details */}
              {currentStep === 0 && (
                <Ensembles showToggle={false} handleStep={handleStepChange} />
              )}
              {/* Summary of Cluster */}
              {currentStep === 1 && <DistanceMeasureInfo/>}
            </div>
          </header>
        </div>
      </div>
    </div>
  );
}

export default Distance;
