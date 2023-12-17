import React, { useState, useContext, useEffect } from "react";
import {
  AvailableStates,
  GlobalContext,
  GlobalTypes,
  InfoCardType,
} from "../../globalContext";
import "../css/Distance.css";
import "../css/StateMap.css";
import "../../App.css";
import StateMap from "../state-map/StateMap";
import Navbar from "./Navbar";
import { Stack, IconButton, Stepper, Step, StepButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DistanceMeasureInfo from "../summary/DistanceMeasureInfo";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDistanceMeasureData } from "../apiClient";
import { DistanceMeasureType } from "../interfaces/AnalysisInterface";
import DistanceChart from "../graphs/DistanceChart";

function DistanceMeasures() {
  const { state, dispatch } = useContext(GlobalContext);
  const { stateName, ensembleId } = useParams<{
    stateName: AvailableStates;
    ensembleId: string;
  }>();
  const currentState = stateName || AvailableStates.Unselected;
  const currentEnsembleId = ensembleId || "000000";
  const [distanceMeasuresData, setDistanceMeasuresData] = useState<
    Array<DistanceMeasureType>
  >([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getDistanceMeasureData() {
      try {
        const response = await fetchDistanceMeasureData(
          currentState,
          currentEnsembleId
        );

        console.log("Distance measure data", response);
        if (response) {
          dispatch({
            type: GlobalTypes.SetDistanceMeasuresData,
            payload: { compareDistanceMeasuresData: response.data },
          });
          setDistanceMeasuresData(response.data);
        }
      } catch (error) {
        throw error;
      }
    }
    getDistanceMeasureData();
  }, [stateName,ensembleId]);

  function BackButton() {
    return (
      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton
          aria-label="delete"
          size="large"
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon fontSize="inherit" />
        </IconButton>
      </Stack>
    );
  }

  return (
    <div className="Home">
      <div className="Home-content">
        <Navbar aboutPage={false} />
        <div className="StateMap-content">
          <header className="StateMap-header">
            <div className="State-map">
              <StateMap currentState={stateName || AvailableStates.Unselected}/>
            </div>
            <div className="distance-table-container">
              <div className="navigation-container">
                <BackButton />
              </div>

              <DistanceChart />
            </div>
          </header>
        </div>
      </div>
    </div>
  );
}

export default DistanceMeasures;
