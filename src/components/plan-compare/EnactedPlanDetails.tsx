import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Stack,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  TableContainer,
  Table,
  TableCell,
  TableRow,
  Grid,
} from "@mui/material";
import { AvailableStates, GlobalContext } from "../../globalContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";
interface DetailsItem {
  [key: string]: number | string; // Assuming values can be either number or string
}
export default function EnactedPlanDetails() {
  const { state, dispatch } = useContext(GlobalContext);
  const [curDetails, setDetails] = React.useState("");
  const { stateName } = useParams<{ stateName: AvailableStates }>();
  const [mainDetails, setMainDetails] = useState<DetailsItem[]>([]);

  const currentState = stateName || AvailableStates.Unselected;

  useEffect(() => {
    setDetails(state[state.length - 1].districtPlanTypes[currentState]);
  }, [stateName]);

  const style = {
    width: "100%",
    bgcolor: "background.paper",
  };

  const curPlanDetails: DetailsItem[] = [
    {
      "% Republican Voters": 0.469,
      "% of Democratic Voters": 0.531,

      "Opportunity Districts": 16,
    },
  ];

  useEffect(() => {
    const details: DetailsItem[] = [
      {
        "Average % Republican Voters":
          state[state.length - 1].comparedPlan.avg_republican,
        "Average % of Democratic Voters":
          state[state.length - 1].comparedPlan.avg_democrat,
        "Opportunity Districts":
          state[state.length - 1].comparedPlan.opportunity_districts,
      },
    ];
    setMainDetails(details);
  }, [state]);

  return (
    <CardContent>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            align="left"
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          >
            Plan 1
          </Typography>
          <Typography align="left" variant="h5" component="div">
            {curDetails}
          </Typography>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              {mainDetails.map((detail, index) => (
                <TableRow key={index}>
                  {Object.entries(detail).map(([key, value]) => (
                    <React.Fragment key={key}>
                      <TableCell>{key}</TableCell>
                      <TableCell>{value}</TableCell>
                    </React.Fragment>
                  ))}
                </TableRow>
              ))}
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <Typography
            align="left"
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          >
            Plan 2
          </Typography>
          <Typography align="left" variant="h5" component="div">
            {currentState.charAt(0).toUpperCase() +
              currentState.slice(1).toLowerCase()}{" "}
            District Plan {state[state.length - 1].comparedPlan.district_plan}
          </Typography>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              {mainDetails.map((detail, index) => (
                <TableRow key={index}>
                  {Object.entries(detail).map(([key, value]) => (
                    <React.Fragment key={key}>
                      <TableCell>{key}</TableCell>
                      <TableCell>{value}</TableCell>
                    </React.Fragment>
                  ))}
                </TableRow>
              ))}
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </CardContent>
  );
}
