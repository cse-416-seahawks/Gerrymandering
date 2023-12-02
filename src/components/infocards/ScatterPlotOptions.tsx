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
  CardActions,
  Button,
} from "@mui/material";
import { AvailableStates, Demographics, GlobalContext } from "../../globalContext";
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

const x_axis = Object.values(Demographics)

export default function ScatterPlotOptions() {
  const { state, dispatch } = useContext(GlobalContext);
  const [curDetails, setDetails] = React.useState("");
  const theme = useTheme();
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    let currentState = state[state.length - 1].currentState;
    setDetails(state[state.length - 1].districtPlanTypes[currentState]);
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
      <Box sx={{ margin: "1rem" }}>
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
        <Box sx={{ margin : "0.5rem", width: 650 }}>
          <Typography align="left" id="input-slider" gutterBottom>
            Population Threshold (Millions)
          </Typography>
          <Slider
            aria-label="Population Threshold"
            defaultValue={30}
            valueLabelDisplay="auto"
            step={0.1}
            marks
            min={1}
            max={5}
          />
        </Box>
      </Box>
      <Button size="small">Plot</Button>
      
    </CardContent>
  );
}
