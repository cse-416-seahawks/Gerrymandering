import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  AvailableStates,
  Demographics,
  GlobalContext,
} from "../../globalContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";

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

const x_axis = Object.values(Demographics);

export default function ScatterPlotOptions() {
  const { stateName } = useParams<{stateName : AvailableStates }>();
  const currentState = stateName || AvailableStates.Unselected;
  const { state, dispatch } = useContext(GlobalContext);
  const [curDetails, setDetails] = React.useState(state[state.length - 1].districtPlanTypes[currentState]);
  const [demographic, setDem] = React.useState(x_axis[0].toString());
  const [alignment, setAlignment] = React.useState('greater');

  

  const handleDemographicChange = (event: SelectChangeEvent) => {
    setDem(event.target.value);
  };



  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

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
      <Box sx={{ display: "flex" }}>
        <Box sx={{ margin: "1rem" }}>
          <FormControl sx={{ alignItems: "left", m: 1, minWidth: 250 }}>
            <InputLabel>Demographic</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={demographic}
              label="Demographic"
              onChange={handleDemographicChange}
            >
              {x_axis.map((value) => {
                return <MenuItem value={value}>{value}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ margin: "1.5rem" }}>
          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton value='greater'>Greater than</ToggleButton>
            <ToggleButton value='less'>Less than</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ margin: "0.5rem", width: 650 }}>
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
      <Button size="small">Plot Custom Scatter Plot</Button>
    </CardContent>
  );
}
