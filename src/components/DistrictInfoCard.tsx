import React from "react";
import "./css/InfoCard.css";

interface DistrictInfoCardProps  {
    currentState : string
}
const DistrictInfoCard =  ({currentState} : DistrictInfoCardProps) => {

  let stateInfo : string = "";
  if(currentState === "Nevada"){
    stateInfo = "Nevada State Assembly Districts 2023"
  }
  else if(currentState === "Texas"){
    stateInfo = "Texas Congressional District Plan 2021"
  }
  else{
    stateInfo = "Virginia House of Delgates District Plan 2021"

  }
  return <div className="card">{stateInfo}</div>;
};


export default DistrictInfoCard;
