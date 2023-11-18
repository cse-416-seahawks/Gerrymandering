import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "../css/InfoCard.css";
import { GlobalContext } from "../../globalContext";
import { useContext, useState } from 'react';

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

const DistrictInfoCard =  () => {

  const { state } = useContext(GlobalContext);

  const [stateInfo, updateStateInfo] = useState("Current District Plan")
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
