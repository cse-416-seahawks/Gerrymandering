import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Stack,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Theme,
  useTheme,
  Slider,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { AvailableStates, GlobalContext } from "../../globalContext";
import { useContext } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const x_axis = [
  "African American Population",
  "Caucasian Population",
  "Asian American Population",
  "Hispanic Population",
];

export default function ScatterPlotOptions() {
  const { state, dispatch } = useContext(GlobalContext);
  const [curDetails, setDetails] = React.useState("");
  const theme = useTheme();
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const stateDetails = {
    Nevada: "Nevada State Assembly 2022",
    Texas: "Texas House Districts 2022",
    Virginia: "Virginia House Districts 2022",
  };

  useEffect(() => {
    let currentState = state[state.length - 1].currentState;
    if (currentState === AvailableStates.Nevada) {
      setDetails(stateDetails.Nevada);
    } else if (currentState === AvailableStates.Virginia) {
      setDetails(stateDetails.Virginia);
    } else {
      setDetails(stateDetails.Texas);
    }
  }, [state[state.length - 1].currentState]);
  return (
    <CardContent>
      <Typography
        align="left"
        sx={{ fontSize: 14 }}
        color="text.secondary"
        gutterBottom
      >
        Current District Plan
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" component="div">
          {curDetails}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
      </Box>
      <Box sx={{display : "flex"}}> 
      <Box sx={{ margin: "2rem" }}>
        <FormControl sx={{ alignItems: "left", m: 1, minWidth: 250 }}>
          <InputLabel>Demographic</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            defaultValue={x_axis[0]}
            label="Demographic"
            onChange={handleChange}
          >
            {x_axis.map((value) => {
              return <MenuItem value={value}>{value}</MenuItem>;
            })}
          </Select>
        </FormControl>
        
      </Box>
      <Box sx={{flexGrow: 1}}/>
        <Box sx={{margin: "2.5rem"}}>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              defaultValue={"greater-than"}
            >
              <FormControlLabel
                value="greater-than"
                control={<Radio />}
                label="Greater"
              />
              <FormControlLabel
                value="less-than"
                control={<Radio />}
                label="Less"
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ margin : "1rem", width: 650 }}>
          <Typography align="left" id="input-slider" gutterBottom>
            Population Threshold
          </Typography>
          <Slider
            aria-label="Population Threshold"
            defaultValue={30}
            valueLabelDisplay="auto"
            step={100000000}
            marks
            min={1000000000}
            max={5000000000}
          />
        </Box>
      </Box>
    </CardContent>
  );
}
