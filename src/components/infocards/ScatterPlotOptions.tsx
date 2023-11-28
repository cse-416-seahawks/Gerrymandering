import * as React from "react";
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

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


export default function ScatterPlotOptions() {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState<string[]>([]);
  
    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
      const {
        target: { value },
      } = event;
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };
    
    const stateDetails = {
        Nevada: "Nevada State Assembly 2022",
        Texas: "Texas House Districts 2022",
        Virginia: "Virginia House Districts 2022",
      };
      const { state, dispatch } = useContext(GlobalContext);
      const [curDetails, setDetails] = React.useState("");
    
      React.useEffect(() => {
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
        <Stack direction="row" spacing={1}>
          <Chip
            label="Democratic Districts"
            style={{ backgroundColor: "blue", color: "white" }}
          />
          <Chip
            label="Republican Districts"
            style={{ backgroundColor: "red", color: "white" }}
            variant="outlined"
          />
        </Stack>
      </Box>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </CardContent>
  );
}
