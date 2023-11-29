import React, { FC, useState, useContext, useEffect } from "react";
import "../css/TableData.css";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import { GlobalContext, InfoCardType } from "../../globalContext";
import Ensembles from "../summary/EnsemblesList";
import DistrictPlanData from "../summary/ClusterDetail";
import ClusterSummary from "../summary/ClusterSummary";
import { ClusterData } from "../interfaces/AnalysisInterface";

interface TableDataProps {
  selectedState: string;
  onDistrictSelection: (
    district_num: number,
    coordinates: Array<number>
  ) => void;
}

function TableData(props: TableDataProps) {
  const { state, dispatch } = useContext(GlobalContext);

  let currentStep = state[state.length - 1].step;

  const [ensemble, setEnsemble] = useState(0);
  const [cluster, setCluster] = useState(0);

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
    handleStepChange(0, 0, "0");
  }, [props.selectedState]);

  function handleStepChange(
    step: number,
    ensemble: number,
    ensembleId: string
  ) {
    if(step === 0 && state[state.length - 1].step !== 0) {
      dispatch ({
        type : "CHANGE_INFO_CARD",
        payload : {
          infoCardType : InfoCardType.ensembleInfo
        }
      })
    }
    if (step === 1) {
      setEnsemble(ensemble);
      dispatch({
        type: "SET_ENSEMBLE",
        payload: {
          ensemble: ensemble,
          ensembleId: ensembleId,
        },
      });

      dispatch ({
        type : "CHANGE_INFO_CARD",
        payload : {
          infoCardType : InfoCardType.clusterSummary
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

  function handleDistrictChange(district_num: number, coords: Array<number>) {
    props.onDistrictSelection(district_num, coords);
  }

  function handleClusterSelection(clusterData: ClusterData) {
    setCluster(clusterData.cluster_number);
    dispatch({
      type: "SET_CLUSTER",
      payload: {
        cluster: clusterData.cluster_number,
        clusterId: clusterData.cluster_id,
        districtPlanIds: clusterData.district_plans,
      },
    });
  }


  /**
   *
   * Table Data for ensembles
   */

  function BackButton() {
    if (currentStep > 0) {
      return (
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() =>
              handleStepChange(
                currentStep - 1,
                ensemble,
                state[state.length - 1].ensembleId
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
      <div className="navigation-container">
        <BackButton />
        <div className="stepper-container">
          <Stepper activeStep={currentStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton
                  color="inherit"
                  onClick={() =>
                    handleStepChange(
                      index,
                      ensemble,
                      state[state.length - 1].ensembleId
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
      {/* <div style={{display:'flex', width: '100%'}}> */}
        <div className='table-info'>
          {currentStep == 1 && (
            <div className="ensemble-number">Viewing Ensemble {ensemble}</div>
          )}
          {currentStep == 2 && (
            <div className="ensemble-number">
              Viewing Ensemble {ensemble}, Cluster {cluster}
            </div>
          )}
        </div>
      {/* </div> */}

      {/* State Details */}
      {currentStep == 0 && (
        <Ensembles showToggle={true} handleStep={handleStepChange} />
      )}
      {/* Summary of Cluster */}
      {currentStep == 1 && (
        <ClusterSummary onClusterSelection={handleClusterSelection} />
      )}
      {/* <AverageMeasureTable/> <Party Affilations, Association of Clusters*/}
      {currentStep == 2 && (
        <DistrictPlanData onDistrictSelection={handleDistrictChange} />
      )}
    </div>
  );
}

export default TableData;
