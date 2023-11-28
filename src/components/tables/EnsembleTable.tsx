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
import { EnsembleData, GlobalContext } from "../../globalContext";
import { useNavigate } from "react-router-dom";


interface EnsemblesListProps {
    ensembleData : Array<EnsembleData>,
    handleStep : (step: number, ensemble: number, ensembleId: string) => void,
    showToggle : boolean
}


export default function EnsemblesList({ ensembleData, handleStep, showToggle } : EnsemblesListProps) {

    const { state, dispatch } = useContext(GlobalContext);
    const navigate = useNavigate();
    const [disMeasure, setDismeasure] = useState("Hamming Distance");
    const [page, setPage] = React.useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
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
        dispatch({
          type: "DISTANCE_MEASURE",
          payload: {
            distanceMeasure: event.target.value,
          },
        });
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
          onChange={handleChange}
          sx={{ mt: "1rem", mb: "1rem" }}
          count={Math.floor(ensembleData.length / 7)}
        />
        <Box sx={{ flexGrow: 1 }} />
        <div className="toggleButton-container">
          {showToggle && (
            <FormControl required sx={{ m: 1, minWidth: 190 }} size="small">
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
                <MenuItem value={"Hamming Distance"}>
                  Hamming Distance
                </MenuItem>
                <MenuItem value={"Optimal Transport"}>
                  Optimal Transport
                </MenuItem>
                <MenuItem value={"Total Variation"}>
                  Total Variation
                </MenuItem>
              </Select>
            </FormControl>
          )}
        </div>
      </div>
      {spliceEnsemble(ensembleData, page).map((row) => (
        <Accordion defaultExpanded={false}>
          <AccordionSummary sx={{pointerEvents : "none"}}>
            <Button
              variant="text"
              size="large"
              sx={{pointerEvents : "auto"}}
              onClick={() =>
                handleStep(
                  1,
                  row.ensemble,
                  ensembleData[row.ensemble - 1]
                    .ensemble_id
                )
              }
            >
              Ensemble {row.ensemble}
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            <Stack direction="row" spacing={1}>
              <Chip
                label="See details"
                variant="outlined"
                sx={{pointerEvents : "auto"}}
                onClick={(event) => {
                  event.stopPropagation();
                  handleSeeDetails(row);
                }}
              />
              <Chip
              sx={{pointerEvents : "auto"}}
                label="Compare distance measures"
                onClick={() =>{

                  handleStep(
                    1,
                    row.ensemble,
                    ensembleData[row.ensemble - 1]
                      .ensemble_id
                  )
                  navigate("/distances")
                }
                 
                }
              />
            </Stack>
          </AccordionSummary>
          <Divider />
        </Accordion>
      ))}
      </div>
    )
}