import React, { useState, useContext } from "react";
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
} from "@mui/material";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import {
  AvailableStates,
  EnsembleData,
  GlobalContext,
  GlobalTypes,
  InfoCardType,
} from "../../globalContext";
import { useNavigate, useParams } from "react-router-dom";

interface EnsemblesListProps {
  ensembleData: Array<EnsembleData>;
  showToggle: boolean;
}

export default function EnsemblesTable({
  ensembleData,
  showToggle,
}: EnsemblesListProps) {
  const { state, dispatch } = useContext(GlobalContext);
  const [disMeasure, setDismeasure] = useState("Hamming Distance");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { stateName } = useParams<{ stateName: AvailableStates }>();
  const currentState = stateName || AvailableStates.Unselected;

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleClick = (ensembleId: string, ensembleNum : number) => {
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
          ensemble : ensembleNum
        },
      },
    ]);
    const currentPathname = window.location.pathname;
    navigate(`${currentPathname}/ensemble/${ensembleId}`);
  };

  const handleSeeDetails = (Ensemble: EnsembleData) => {
    dispatch({
      type: "ADD_ENS_DETAIL",
      payload: {
        EnsembleData: Ensemble,
      },
    });
  };

  const handleUpdateDistanceMeasure = (event: SelectChangeEvent) => {
    setDismeasure(event.target.value);
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
                <MenuItem value={"Hamming Distance"}>Hamming Distance</MenuItem>
                <MenuItem value={"Optimal Transport"}>
                  Optimal Transport
                </MenuItem>
                <MenuItem value={"Total Variation"}>Total Variation</MenuItem>
              </Select>
            </FormControl>
          )}
        </div>
      </div>
      {spliceEnsemble(ensembleData, page).map((row) => (
        <Accordion key={row.ensemble} defaultExpanded={false}>
          <AccordionSummary sx={{ pointerEvents: "none" }}>
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
                label="See details"
                variant="outlined"
                sx={{ pointerEvents: "auto" }}
                onClick={(event) => {
                  event.stopPropagation();
                  handleSeeDetails(row);
                }}
              />
              <Chip
                sx={{ pointerEvents: "auto" }}
                label="Compare distance measures"
                onClick={() => {
                  dispatch({
                    type: GlobalTypes.ChangeCard,
                    payload: {
                      infoCardType : InfoCardType.distanceMeasure,
                    }
                  });
                  navigate(
                    `/distances/state/${currentState}/ensemble/${row.ensemble_id}`
                  );
                  
                }}
              />
            </Stack>
          </AccordionSummary>
          <Divider />
        </Accordion>
      ))}
    </div>
  );
}
