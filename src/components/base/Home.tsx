import React, { useState, useContext, useEffect } from "react";
import { GlobalContext, AvailableStates, GlobalTypes } from "../../globalContext";
import "../../App.css";
import StateMap from "../state-map/StateMap";
import Navbar from "./Navbar";
import TableData from "./ClusterAnalysis";
import { fetchMapData } from "../apiClient";
import ClusterAnalysis from "./ClusterAnalysis";
import {  useParams } from "react-router-dom";

function Home() {
  const { stateName, ensembleId, clusterId } = useParams<{ stateName : AvailableStates, ensembleId : string, clusterId : string}>();
  const { state, dispatch } = useContext(GlobalContext);


  useEffect(() => {
    async function getMapData() {
      const response = await fetchMapData();
      if (response) {
        dispatch({
          type: GlobalTypes.SetMapData,
          payload: {
            mapData: response.stateMapData,
            districtPlanTypes: response.stateDistrictPlanType,
          },
        });
      }
    }
    getMapData();
  }, []);

  const currentState = stateName || AvailableStates.Unselected;

  const renderClusterAnalysis = () => {
    if(ensembleId && clusterId){
      return <ClusterAnalysis selectedState={currentState} ensembleId={ensembleId} clusterId={clusterId}/>
    }
    else if(ensembleId){
      return <ClusterAnalysis selectedState={currentState} ensembleId={ensembleId}/>
    }
    else{
      return <ClusterAnalysis selectedState={currentState}/>
    }
  }

  return (
    <div className="Home">
      <div className="Home-content">
        <Navbar aboutPage={false} />
        <div className="StateMap-content">
          <header className="StateMap-header">
            <div className="State-map">
              <StateMap currentState={currentState} />
            </div>
            { renderClusterAnalysis() }
          </header>
        </div>
      </div>
    </div>
  );
}

export default Home;
