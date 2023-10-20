import React, {useContext} from "react";
import "../css/InfoCard.css";
import { GlobalContext } from "../../globalContext";


interface DistrictInfoCardProps  {
    currentState : string
}
const DistrictInfoCard =  ({currentState} : DistrictInfoCardProps) => {

  const { state } = useContext(GlobalContext);

  let stateInfo : string = "";
  if(currentState === "Nevada"){
    if(!state[state.length - 1].dismap){
      stateInfo = "Nevada State Map"
    }
    else
      stateInfo = "Nevada State Assembly Districts 2023";
  }
  else if(currentState === "Texas"){
    if(!state[state.length - 1].dismap)
      stateInfo = "Texas State Map";
    else  
      stateInfo = "Texas Congressional District Plan 2021";
  }
  else{
    if(!state[state.length - 1].dismap)
      stateInfo = "Virginia State Map";
    else
      stateInfo = "Virginia House of Delgates District Plan 2021";

  }
  return <div className="card">{stateInfo}</div>;
};


export default DistrictInfoCard;
