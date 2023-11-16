import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "../css/InfoCard.css";
import { GlobalContext } from "../../globalContext";
import { useContext } from 'react';

interface DistrictInfoCardProps  {
    currentState : string
}

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const DistrictInfoCard =  ({currentState} : DistrictInfoCardProps) => {

  const { state } = useContext(GlobalContext);
  let stateInfo : string = "";
  if(currentState === "NEVADA"){
    if(!state[state.length - 1].dismap){
      stateInfo = "Nevada State Map"
    }
    else
      stateInfo = "Nevada State Assembly Districts 2023";
  }
  else if(currentState === "TEXAS"){
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
  return (
    <Card className="card" sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {stateInfo}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default DistrictInfoCard;
