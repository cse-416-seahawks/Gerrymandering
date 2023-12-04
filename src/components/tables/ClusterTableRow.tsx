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
import { Button, TextField, Tooltip } from "@mui/material";
import { GlobalContext } from "../../globalContext";
import { ClusterData } from "../interfaces/AnalysisInterface";
import { updateClusterName } from "../apiClient";

interface ClusterTableRowProps {
  data: ClusterData;
  onClusterSelection: (
    cluster: ClusterData,
  ) => void;
}

export default function ClusterTableRow({ data, onClusterSelection }: ClusterTableRowProps) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [clusterName, setName] = useState(data.name);

  const { state, dispatch } = useContext(GlobalContext);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleChangeName = (event: React.KeyboardEvent<HTMLDivElement>, clusterId: string) => {
    if (event.key == "Enter") {
      const currState = state[state.length - 1].currentState;
      const response = updateClusterName(currState, clusterId);
      if (!response) {
        console.log("cluster name not saved")
      }
    }
  };

  const handleBlur = () => {
    setEditing(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEditing(false);
    if (clusterName == "") setName(data.name);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    // POST endpoint to save to database
    console.log(data);
  };

  function handleStepChange(step: number, cluster: ClusterData) {
    if (step === 2) { // Display selected cluster summary of district plans
      onClusterSelection(cluster);
      dispatch({
        type: "SET_CLUSTER",
        payload: {
          cluster: cluster.cluster_number,
          clusterId: cluster.cluster_id,
          districtPlanIds: cluster.district_plans,
        },
      });
    } else {
      dispatch({
        type: "STATE_MAP",
        payload: {
          dismap: false,
        },
      });
    }
    dispatch({
      type: "STEP_CHANGE",
      payload: {
        step: step,
      },
    });
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
            onClick={() => handleStepChange(2, data)}
          >
            {data.cluster_number}
          </Button>
        </TableCell>
        <TableCell>
          <Tooltip title="Edit cluster name">
            <IconButton onClick={handleEdit}>
              <EditIcon />
            </IconButton>
          </Tooltip>
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
            clusterName
          )}
        </TableCell>

        <TableCell align="center"> {data.num_dist_plans}</TableCell>
        <TableCell align="center"> {data.avg_distance} </TableCell>
        <TableCell align="center"> {data.avg_rep} </TableCell>
        <TableCell align="center"> {data.avg_dem} </TableCell>
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
                      {data.demographics.caucasian}
                    </TableCell>
                    <TableCell>{data.demographics.african_american}</TableCell>
                    <TableCell align="left">
                      {data.demographics.asian_american}
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
