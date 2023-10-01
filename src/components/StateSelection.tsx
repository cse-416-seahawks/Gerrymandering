import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MapContainer, useMap} from 'react-leaflet';

interface StateSelectionProps {
  onStateSelect: (state: string) => void; 
}

export default function StateSelection({ onStateSelect }: StateSelectionProps) {
  const [state, setState] = React.useState('Nevada');

  const handleChange = (event: SelectChangeEvent) => {
    setState(event.target.value);
    onStateSelect(event.target.value);
  };


  return (
    <div>
      <FormControl 
        variant="filled" 
        sx={{ m: 1, minWidth: 120 }} 
        style={{backgroundColor:"white", width:"150px", boxShadow:"0 3px 10px rgb(0 0 0 / 0.3)" }}
      >
        <InputLabel id="demo-simple-select-filled-label">State</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={state}
          onChange={handleChange}
          style={{fontWeight:"bold", fontSize:"18px"}}
        >
          

          <MenuItem value={"Nevada"}>Nevada</MenuItem>
          <MenuItem value={"Texas"}>Texas</MenuItem>
          <MenuItem value={"Virginia"}>Virginia</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}