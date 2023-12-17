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
} from "@mui/material";
import { AvailableStates, GlobalContext } from "../../globalContext";
import { useContext } from "react";
import EnsembleDetailTable from "../tables/EnsembleDetailTable";
import { useParams } from "react-router-dom";
import { style } from "d3";

export default function EnactedPlanDetails() {
  const { state, dispatch } = useContext(GlobalContext);
  const [curDetails, setDetails] = React.useState("");
  const { stateName } = useParams<{ stateName: AvailableStates }>();

  const currentState = stateName || AvailableStates.Unselected;

  useEffect(() => {
    setDetails(state[state.length - 1].districtPlanTypes[currentState]);
  }, [stateName]);

  const style = {
    width: "100%",
    bgcolor: "background.paper",
  };

  const details = [
    {
      "Republican Districts": 21,
      "Democratic Districts": 22,
    },
    {
      "Average % Republican Voters": 51,
      "Average % of Democratic Voters": 54,
    },
    {
      "Caucasian Population": 0.3,
      "African American Population": 0.1,
    },
    {
      "Hispanic": 0.3,
      "Other": 0.1,
    },
  ];

  return (
    <CardContent>
      <Typography
        align="left"
        sx={{ fontSize: 14 }}
        color="text.secondary"
        gutterBottom
      >
        Plan 1
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" component="div">
          {curDetails}
        </Typography>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          {details.map((detail, index) => (
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
    </CardContent>
  );
}
