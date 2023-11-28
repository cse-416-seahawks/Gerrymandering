import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Stack, Chip } from "@mui/material";
import {
  AvailableStates,
  GlobalContext,
  InfoCardType,
} from "../../globalContext";
import { useContext } from "react";
import EnsembleDetailTable from "../tables/EnsembleDetailTable";
import EnsembleInfoCard from "./EnsembleInfoCard";
import ClusterAssociationInfoCard from "./ClusterAssociation";

export default function InfoCard() {
  const { state, dispatch } = useContext(GlobalContext);

  switch (state[state.length - 1].currentInfoCard) {
    case InfoCardType.ensembleInfo:
      return (
        <Card
          sx={{
            minWidth: 275,
            minHeight: "35vh",
          }}
        >
          <EnsembleInfoCard />
        </Card>
      );
    case InfoCardType.associationDetail:
      return (
        <Card
          sx={{
            minWidth: 275,
            minHeight: "35vh",
          }}
        >
          <ClusterAssociationInfoCard />
        </Card>
      );
    case InfoCardType.clusterPlotOptions:
      return <Card></Card>;
    case InfoCardType.distanceMeasure:
      return <Card></Card>;
    default:
      return <Card></Card>;
  }
}
