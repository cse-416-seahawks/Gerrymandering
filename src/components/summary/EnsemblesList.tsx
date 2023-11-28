import React, { useState, useContext, useEffect } from "react";
import "../css/TableData.css";
import {
  Tabs,
  Tab,
} from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import { GlobalContext, EnsembleData, InfoCardType } from "../../globalContext";
import { fetchStateEnsembles } from "../apiClient";
import EnsemblesList from "../tables/EnsembleTable";
import ClusterAssociationGraph from "../graphs/ClusterAssociationGraph";

interface EnsembleProps {
  showToggle: boolean;
  handleStep: (step: number, ensemble: number, ensembleId: string) => void;
}

const Ensembles: React.FC<EnsembleProps> = ({ showToggle, handleStep }) => {
  const { state, dispatch } = useContext(GlobalContext);

  const [currentTab, setCurrentTab] = useState("1");
  const [ensembleData, setEnsembleData] = useState<Array<EnsembleData>>([]);
  const [fetchedEnsembleData, setFetchedEnsembleData] = useState<any>({});
  function handleTabChange(event: React.ChangeEvent<{}>, newValue: number) {
    setCurrentTab(String(newValue));
  }


  useEffect(() => {
    const currState = state[state.length - 1].currentState;
    const distanceMeasure = state[state.length - 1].distanceMeasure;

    async function fetchStateEnsemble() {
      try {
        const response = await fetchStateEnsembles(currState);
        const ensembles: Array<EnsembleData> = [];
        for (var row of response.ensembles) {
          const ensemble_table = row.data.find(
            (item: any) => item.distance_measure == distanceMeasure
          );
          ensembles.push({
            ensemble: response.ensembles.indexOf(row) + 1,
            ensemble_id: row.ensemble_id,
            num_clusters: ensemble_table.num_clusters,
            num_dist_plans: row.num_district_plans,
            avg_dist_clusters: ensemble_table.avg_distance,
          });
        }
        setFetchedEnsembleData(response);
        setEnsembleData(ensembles);
      } catch (error) {
        throw error;
      }
    }
    fetchStateEnsemble();
  }, [
    state[state.length - 1].currentState,
    state[state.length - 1].distanceMeasure,
  ]);

  const handleEnsembleInfoCard = () => {
    dispatch({
      type: "CHANGE_INFO_CARD",
      payload: {
        infoCardType: InfoCardType.ensembleInfo,
      },
    });
  };

  const handleAssociationInfoCard = () => {
    dispatch({
      type: "CHANGE_INFO_CARD",
      payload: {
        infoCardType: InfoCardType.associationDetail,
      },
    });
  };

  return (
    <div>
      <TabContext value={currentTab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", width: "95%" }}>
          <Tabs value={currentTab} onChange={handleTabChange}>
            <Tab
              value="1"
              label="Ensemble Selection"
              sx={{ textTransform: "none" }}
              onClick={handleEnsembleInfoCard}
            />
            <Tab
              value="2"
              label="Cluster Association"
              sx={{ textTransform: "none" }}
              onClick={handleAssociationInfoCard}
            />
          </Tabs>
        </Box>
        <TabPanel value="1">
          <EnsemblesList
            ensembleData={ensembleData}
            handleStep={handleStep}
            showToggle={showToggle}
          />
          <br />
        </TabPanel>
        <TabPanel value="2">
          <ClusterAssociationGraph />
        </TabPanel>
      </TabContext>
    </div>
  );
};

export default Ensembles;
