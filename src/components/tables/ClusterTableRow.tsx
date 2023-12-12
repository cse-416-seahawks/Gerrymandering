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
      const distanceMeasure = state[state.length - 1].distanceMeasure;
      const response = await updateClusterName(
        currentState,
        ensembleId,
        distanceMeasure,
        clusterId,
        clusterName
      );
    }
  }

  const handleSelectCluster = (clusterId : string, clusterNum : number, planIds : string[]) => {
    dispatch([
      {
        type: GlobalTypes.ChangeCard,
        payload: {
          infoCardType: InfoCardType.districtPlans,
        },
      },
      {
        type: GlobalTypes.SetCluster,
        payload: {
          cluster : clusterNum,
          clusterPlanIds : planIds
        },
      },

    ]
    );
    const currentPathname = window.location.pathname;
    navigate(`${currentPathname}/cluster/${clusterId}`);
  }

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
  };


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
            onClick={() => {
              handleSelectCluster(data.cluster_id, data.cluster_number, data.district_plans);
            }}
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
        <TableCell align="center">
          {" "}
          {(parseFloat(data.avg_rep) * 100).toFixed(2)} %
        </TableCell>
        <TableCell align="center">
          {" "}
          {(parseFloat(data.avg_dem) * 100).toFixed(2)} %
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
