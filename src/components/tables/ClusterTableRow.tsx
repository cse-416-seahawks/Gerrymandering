import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import PolylineIcon from "@mui/icons-material/Polyline";
import { Button, TextField, Tooltip } from "@mui/material";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import {
  AvailableStates,
  GlobalContext,
  GlobalTypes,
  InfoCardType,
} from "../../globalContext";
import { ClusterData } from "../interfaces/AnalysisInterface";
import { updateClusterName } from "../apiClient";
import { useNavigate } from "react-router-dom";

interface ClusterTableRowProps {
  data: ClusterData;
  currentState: AvailableStates;
  ensembleId: string;
  onClusterSelection: (cluster: ClusterData) => void;
}

export default function ClusterTableRow({
  data,
  currentState,
  ensembleId,
  onClusterSelection,
}: ClusterTableRowProps) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [clusterName, setName] = useState(data.name);
  const { state, dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleEdit = () => {
    setEditing(true);
  };

  async function handleChangeName(
    event: React.KeyboardEvent<HTMLDivElement>,
    clusterId: string
  ) {
    if (event.key == "Enter") {
      const { distanceMeasure } = state[state.length - 1];
      const response = await updateClusterName(
        currentState,
        ensembleId,
        distanceMeasure,
        clusterId,
        clusterName
      );
    }
  }

  const handleSelectCluster = (
    clusterId: string,
    clusterNum: number,
    planIds: string[]
  ) => {
    dispatch([
      {
        type: GlobalTypes.ChangeCard,
        payload: {
          infoCardType: InfoCardType.clusterSummary,
        },
      },
      {
        type: GlobalTypes.SetCluster,
        payload: {
          cluster: clusterNum,
          clusterPlanIds: planIds,
        },
      },
      {
        type: GlobalTypes.ShowTypicalPlan,
        payload: {
          clusterId: "",
        },
      },
    ]);
    const currentPathname = window.location.pathname;
    navigate(`${currentPathname}/cluster/${clusterId}`);
  };

  const handleBlur = () => {
    setEditing(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEditing(false);
    if (clusterName == "") {
      setName(data.name);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    // POST endpoint to save to database
  };

  function handleShowTypicalPlan(
    cluster_id: string,
    cluster_num : number,
    planIds: string[]
  ): void {
    dispatch([{
      type: GlobalTypes.ShowTypicalPlan,
      payload: {
        cluster_id: cluster_id,
      },
    },
    {
      type : GlobalTypes.SetCluster,
      payload : {
        cluster : cluster_num,
        clusterPlanIds : planIds
      }
    },
    {
      type: GlobalTypes.ChangeCard,
      payload: {
        infoCardType : InfoCardType.districtPlans
      },
    }]);

    const currentPathname = window.location.pathname;
    navigate(`${currentPathname}/cluster/${cluster_id}`);
  }

  function getStyles(cluster_id: string) {
    if (state[state.length - 1].typicalPlan === cluster_id) {
      return {
        fontWeight: "bold",
        color: "orange",
      };
    } else {
      return {};
    }
  }

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand demographics"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <KeyboardArrowUpIcon />
            ) : (
              <Tooltip title="View demographics">
                <KeyboardArrowDownIcon />
              </Tooltip>
            )}
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <Button
            variant="text"
            size="medium"
            style={getStyles(data.cluster_id)}
            onClick={() => {
              handleSelectCluster(
                data.cluster_id,
                data.cluster_number,
                data.district_plans
              );
            }}
          >
            {data.cluster_number}
          </Button>
        </TableCell>

        <TableCell align="center">
          {editing ? (
            <form
              className="form-control"
              onSubmit={(event) => handleSubmit(event)}
            >
              <TextField
                id="outlined-basic"
                label="Cluster name"
                variant="outlined"
                defaultValue={clusterName}
                onChange={handleChange}
                onKeyDown={(event) => handleChangeName(event, data.cluster_id)}
                onBlur={handleBlur}
              />
            </form>
          ) : (
            <Tooltip title="Double Click to edit">
              <Typography onDoubleClick={handleEdit} variant="body2">
                {clusterName}
              </Typography>
            </Tooltip>
          )}
        </TableCell>

        <TableCell align="center"> {data.num_dist_plans}</TableCell>
        <TableCell align="center"> {data.avg_distance} </TableCell>
        <TableCell align="center">
          {(parseFloat(data.avg_rep) * 100).toFixed(2)} %
        </TableCell>
        <TableCell align="center">
          {(parseFloat(data.avg_dem) * 100).toFixed(2)} %
        </TableCell>
        <TableCell>
          <Tooltip title="View Typical Plan">
            <IconButton
              
              onClick={() => handleShowTypicalPlan(data.cluster_id, data.cluster_number, data.district_plans)}
            >
              <AddLocationIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Demographics
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Avg Caucasian Pop.</TableCell>
                    <TableCell align="left">Avg Afrian-American Pop.</TableCell>
                    <TableCell align="left">Avg Asian-American Pop.</TableCell>
                    <TableCell align="left">Avg Hispanic Pop.</TableCell>
                    <TableCell align="left">Other</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="demographics">
                      {data.demographics.white}
                    </TableCell>
                    <TableCell align="left">
                      {data.demographics.black}
                    </TableCell>
                    <TableCell align="left">
                      {data.demographics.asian}
                    </TableCell>
                    <TableCell align="left">
                      {data.demographics.hispanic}
                    </TableCell>
                    <TableCell align="left">
                      {data.demographics.other}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
