import React, { FC, useState, useContext, useEffect } from "react";
import "../css/TableData.css";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import {
  AvailableStates,
  GlobalContext,
  InfoCardType,
} from "../../globalContext";
import EnsemblesList from "../summary/EnsemblesList";
import ClusterSummary from "../summary/ClusterSummary";
import { ClusterData } from "../interfaces/AnalysisInterface";
import { Card, CardContent } from "@mui/material";
import ClusterDetail from "../summary/ClusterDetail";
import { useNavigate } from "react-router-dom";

interface ClusterAnalysisProps {
  selectedState: AvailableStates;
  ensembleId?: string;
  clusterId?: string;
}

export default function ClusterAnalysis({
  selectedState,
  ensembleId,
  clusterId,
}: ClusterAnalysisProps) {
  const { state, dispatch } = useContext(GlobalContext);
  const [ensemble, setEnsemble] = useState(0);
  const [cluster, setCluster] = useState(0);
  const navigate = useNavigate();
  const [completed, setCompleted] = useState<{ [k: number]: boolean }>({});

  let step = 0;
  if (ensembleId && clusterId) {
    step = 2;
  } else if (ensembleId) {
    step = 1;
  }

  const steps = [
    "Select an Ensemble",
    "Select a Cluster",
    "Select a District Plan",
  ];

  // When the state changes from the menu drop down, stepper should go to 'Select an Ensemble'

  function handleStepChange(
    newStep: number,
  ) {
    if (newStep === 0 && step !== 0) {
      dispatch({
        type: "CHANGE_INFO_CARD",
        payload: {
          infoCardType: InfoCardType.ensembleInfo,
        },
      });
    } else if (newStep === 1) {
      dispatch({
        type: "CHANGE_INFO_CARD",
        payload: {
          infoCardType: InfoCardType.ensembleSummary,
        },
      });
    } else if (newStep === 2) {
      dispatch({
        type: "CHANGE_INFO_CARD",
        payload: {
          infoCardType: InfoCardType.districtPlans,
        },
      });
    }
    navigate(0 - (step - newStep));
  }

  function handleClusterSelection(clusterData: ClusterData) {
    setCluster(clusterData.cluster_number);

    dispatch([
      {
        type: "SET_CLUSTER",
        payload: {
          cluster: clusterData.cluster_number,
          clusterId: clusterData.cluster_id,
          clusterPlanIds: clusterData.district_plans,
        },
      },
      {
        type: "CHANGE_INFO_CARD",
        payload: {
          infoCardType: InfoCardType.clusterDetails,
        },
      },
    ]);
  }

  function BackButton() {
    if (step > 0) {
      return (
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() =>
              handleStepChange(
                step - 1,
              )
            }
          >
            <ArrowBackIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      );
    }
    return null;
  }

  return (
    <div className="table-container">
      <Card sx={{ height: "87vh" }}>
        <CardContent>
          <div className="navigation-container">
            <BackButton />
            <div className="stepper-container">
              <Stepper activeStep={step}>
                {steps.map((label, index) => (
                  <Step key={label} completed={completed[index]}>
                    <StepButton
                      color="inherit"
                      onClick={() =>
                        handleStepChange(
                          index,
                        )
                      }
                    >
                      {label}
                    </StepButton>
                  </Step>
                ))}
              </Stepper>
            </div>
          </div>
          {!ensembleId && !clusterId && (
            <EnsemblesList currState={selectedState} showToggle={true} />
          )}

          {ensembleId && !clusterId && (
            <ClusterSummary
              currentState={selectedState}
              ensembleId={ensembleId}
              onClusterSelection={handleClusterSelection}
            />
          )}
          {ensembleId && clusterId && (
            <ClusterDetail
              currentState={selectedState}
              clusterId={clusterId}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
