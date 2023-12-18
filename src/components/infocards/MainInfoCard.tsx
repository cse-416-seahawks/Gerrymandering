import * as React from "react";
import Card from "@mui/material/Card";
import {
  GlobalContext,
  InfoCardType,
} from "../../globalContext";
import { useContext } from "react";
import ClusterAssociationInfoCard from "./ClusterAssociation";
import ScatterPlotOptions from "./ScatterPlotOptions";
import DistanceMeasureCard from "./DistanceMeasureCard";
import EnsembleSummary from "./EnsembleSummary";
import DistrictPlansCard from "./DistrictPlansCard";
import ClusterSummaryCard from "./ClusterSummaryCard";
import StateSummaryCard from "./StateSummaryCard";

export default function InfoCard() {
  const { state, dispatch } = useContext(GlobalContext);

  switch (state[state.length - 1].currentInfoCard) {
    case InfoCardType.ensembleInfo:
      return (
        <Card
          sx={{
            minWidth: 275,
            height: "35vh",
          }}
        >
          <StateSummaryCard />
        </Card>
      );
    case InfoCardType.associationDetail:
      return (
        <Card
          sx={{
            minWidth: 275,
            height: "35vh",
          }}
        >
          <ClusterAssociationInfoCard />
        </Card>
      );
    case InfoCardType.clusterPlotOptions:
      return (
        <Card
          sx={{
            minWidth: 275,
            height: "35vh",
          }}
        >
          <ScatterPlotOptions />
        </Card>
      );
    case InfoCardType.distanceMeasure:
      return (
        <Card
          sx={{
            minWidth: 275,
            height: "35vh",
          }}
        >
          <DistanceMeasureCard />
        </Card>
      );
    case InfoCardType.ensembleSummary:
      return (
        <Card
          sx={{
            minWidth: 275,
            height: "35vh",
          }}
        >
          <EnsembleSummary />
        </Card>
      );
      case InfoCardType.districtPlans:
      return (
        <Card
          sx={{
            minWidth: 275,
            height: "35vh",
          }}
        >
          <DistrictPlansCard/>
        </Card>
      );
      case InfoCardType.clusterSummary:
        return (
          <Card
          sx={{
            minWidth: 275,
            height: "35vh",
          }}
        >
          <ClusterSummaryCard />
        </Card>
        );
    default:
      return (
        <Card>
        </Card>
      );
  }
}
