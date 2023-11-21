import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Stack,
  Chip,
} from "@mui/material";
import { AvailableStates, GlobalContext } from "../../globalContext";
import { useContext } from "react";
import EnsembleDetailTable from "../tables/EnsembleDetailTable";
import EnsembleInfoCard from "./EnsembleInfoCard";

export default function InfoCard() {


  return (
    <Card
      sx={{
        minWidth: 275,
        minHeight: "35vh",
      }}>
        <EnsembleInfoCard/>
      
    </Card>
  );
}
