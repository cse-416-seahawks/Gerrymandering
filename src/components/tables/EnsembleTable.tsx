import React, { useState, useContext, useEffect } from "react";
import "../css/TableData.css";
import {
  Tabs,
  Tab,
  Pagination,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  Chip,
  Stack,
  SelectChangeEvent,
  AccordionDetails,
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { styled } from "@mui/material/styles";
import {
  AvailableStates,
  DistanceMeasure,
  EnsembleData,
  GlobalContext,
  GlobalTypes,
  InfoCardType,
} from "../../globalContext";
import { useNavigate, useParams } from "react-router-dom";
import { fetchStateEnsembles } from "../apiClient";

interface EnsemblesListProps {
  ensembleData: Array<EnsembleData>;
  showToggle: boolean;
}

interface EnsembleDetails {
  distance_measure: DistanceMeasure;
  num_clusters: number;
  avg_distance: number;
}

interface EnsembleObject {
  ensemble_id: string;
  num_district_plans: number;
  data: EnsembleDetails[];
}

interface EnsembleResponse {
  type: string;
  num_ensembles: number;
  ensembles: EnsembleObject[];
}

export default function EnsemblesTable({
  ensembleData,
  showToggle,
}: EnsemblesListProps) {
  const { state, dispatch } = useContext(GlobalContext);
  const [disMeasure, setDismeasure] = useState(
    state[state.length - 1].distanceMeasure
  );
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [ensembleDetails, setEnsembleData] = useState<EnsembleResponse>(
  );
  const { stateName } = useParams<{ stateName: AvailableStates }>();
  const currentState = stateName || AvailableStates.Unselected;

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "light"
        ? "rgba(255, 255, 255, .05)"
        : "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  }));

  const handleClick = (ensembleId: string, ensembleNum: number) => {
    dispatch([
      {
        type: GlobalTypes.ChangeCard,
        payload: {
          infoCardType: InfoCardType.ensembleSummary,
        },
      },
      {
        type: GlobalTypes.SetEnsemble,
        payload: {
          ensemble: ensembleNum,
        },
      },
    ]);
    const currentPathname = window.location.pathname;
    navigate(`${currentPathname}/ensemble/${ensembleId}`);
  };

  useEffect(() => {
    async function fetchStateEnsemble() {
      try {
        if (currentState !== AvailableStates.Unselected) {
          const response = await fetchStateEnsembles(currentState);
          setEnsembleData(response);
        }
      } catch (error) {
        throw error;
      }
    }
    fetchStateEnsemble();
  }, [state, currentState]);

  const handleUpdateDistanceMeasure = (event: SelectChangeEvent) => {
    dispatch({
      type: GlobalTypes.DistanceMeasure,
      payload: {
        distanceMeasure: event.target.value,
      },
    });
    setDismeasure(
      disMeasureToString(event.target.value) || DistanceMeasure.HammingDistance
    );
  };

  const disMeasureToString = (str: string) => {
    switch (str) {
      case "Hamming Distance":
        return DistanceMeasure.HammingDistance;
      case "Optimal Transport":
        return DistanceMeasure.OptimalTransport;
      default:
        return undefined;
    }
  };

  const spliceEnsemble = (ensembleData: Array<EnsembleData>, page: number) => {
    return ensembleData.slice((page - 1) * 9, page * 9);
  };

  return (
    <div>
      <div className="ensemble-table-header">
        <Pagination
          size="large"
          page={page}
          onChange={handleChangePage}
          count={Math.floor(ensembleData.length / 7)}
        />
        <Box sx={{ flexGrow: 1 }} />
        <div className="toggleButton-container">
          {showToggle && (
            <FormControl required sx={{ m: -2, minWidth: 190 }} size="small">
              <InputLabel id="demo-select-small-label">
                Distance Measure
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                input={<OutlinedInput label="Select a distance measure" />}
                value={disMeasure}
                label="Distance Measure"
                onChange={handleUpdateDistanceMeasure}
              >
                <MenuItem value={DistanceMeasure.HammingDistance}>
                  Hamming Distance
                </MenuItem>
                <MenuItem value={DistanceMeasure.OptimalTransport}>
                  Optimal Transport
                </MenuItem>
              </Select>
            </FormControl>
          )}
        </div>
      </div>
      {spliceEnsemble(ensembleData, page).map((row, index) => {
        let data;
        if(ensembleDetails){
            data = ensembleDetails?.ensembles[index].data ;
        }
        return (
          <Accordion key={row.ensemble} defaultExpanded={false}>
            <AccordionSummary
              expandIcon={
                <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />
              }
            >
              <Button
                variant="text"
                sx={{ pointerEvents: "auto" }}
                onClick={() => {
                  handleClick(row.ensemble_id, row.ensemble);
                }}
              >
                Ensemble {row.ensemble}
              </Button>
              <Box sx={{ flexGrow: 1 }} />
              <Stack direction="row" spacing={1}>
                <Chip
                  sx={{ pointerEvents: "auto" }}
                  label="Compare distance measures"
                  onClick={() => {
                    dispatch([
                      {
                        type: GlobalTypes.ChangeCard,
                        payload: {
                          infoCardType: InfoCardType.distanceMeasure,
                        },
                      },
                      {
                        type: GlobalTypes.SetEnsemble,
                        payload: {
                          ensemble: row.ensemble,
                        },
                      },
                    ]);
                    navigate(
                      `/distances/state/${currentState}/ensemble/${row.ensemble_id}`
                    );
                  }}
                />
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Clusters</TableCell>
                      <TableCell align="center">
                        Avg. Distance (Opt. Transport)
                      </TableCell>
                      <TableCell align="center">
                        Avg. Distance (Ham. Distance)
                      </TableCell>
                      <TableCell align="center">District Plans</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableCell align="center">{row.num_clusters}</TableCell>
                    <TableCell align="center">
                      {data && data.length > 1
                        ? data[1].avg_distance
                        : "N/A"}
                    </TableCell>
                    <TableCell align="center">
                      {data
                        ? data[0].avg_distance
                        : "N/A"}
                    </TableCell>
                    <TableCell align="center">{row.num_dist_plans}</TableCell>
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
            <Divider />
          </Accordion>
        );
      })}
    </div>
  );
}
