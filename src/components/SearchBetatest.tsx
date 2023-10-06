import React, {
  Component,
  Context,
  useEffect,
  useContext,
  useState,
  createContext,
} from "react";
import "./css/StateMap.css";
import "leaflet/dist/leaflet.css";
import DistrictInfoCard from "./DistrictInfoCard";

import { MapContainer,GeoJSON, TileLayer, Polygon, useMapEvent, useMap } from "react-leaflet";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// import MarkerClusterGroup from "react-leaflet-cluster";
// import {MapLibreTileLayer} from "./MapLibreTileLayer.tsx";
import { MongoClient, GridFSBucket } from "mongodb";
import axios from "axios";
import VirginiaMap from "./statemap/VirginiaMap";
import TexasMap from "./statemap/TexasMap";
import NevadaMap from "./statemap/NevadaMap";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TexasDistricts from "./districts/TexasDistricts";
import NevadaDistricts from "./districts/NevadaDistricts";
import VirginiaDistricts from "./districts/VirginiaDistricts";
import { NevadaDistrictContext } from "../NevadaContext";

interface GeoJSON {
  type: string;
  features: GeoJSONFeature[];
}
interface GeoJSONFeature {
  type: string;
  properties: any;
  geometry: any;
}

interface StateData {
  [key: string]: [number, number];
}
interface StateZoomData {
  [key: string]: number;
}
const stateData: StateData = {
  Nevada: [38.5, -116.5],
  Texas: [31.5, -99.9],
  Virginia: [37.9, -79.5],
};
const stateZoomData: StateZoomData = {
  Nevada: 6,
  Texas: 6,
  Virginia: 6,
};

export default function SearchBetatest(props: {
  selectedState: string;
  onStateSelection: (state: string) => void;
  districtCoordinates: Array<number>;
  selectedDistrict: number;
}) {
  const [centerCoordinates, setCenterCoordinates] = useState(
    props.districtCoordinates
  );
  const [currentState, setCurrentState] = useState("Nevada");

  const { state, dispatch } = useContext(NevadaDistrictContext);

  // function SetMapView() {
  //   console.log("setting map view", [
  //     centerCoordinates[0],
  //     centerCoordinates[1],
  //   ]);
  //   // const map = useMapEvent("mouseover", (e) => {
  //     map.setView([centerCoordinates[0], centerCoordinates[1]], stateZoomData[currentState]);
  //     // map.fitBounds(data.coordinates.getBounds());
  //     // map.setZoomAround([centerCoordinates[0], centerCoordinates[1]], 6);
  //   // });

  //   return null;
  // }
  const SetMapView = () => {
    const map = useMap();
     useEffect(() => {
       map.setView([centerCoordinates[0], centerCoordinates[1]]);
     }, [centerCoordinates[0], centerCoordinates[1]]);
     return null;
   }

  useEffect(() => {
    setCenterCoordinates(props.districtCoordinates);
  }, [props.districtCoordinates]);

  const handleStateChange = (event: SelectChangeEvent) => {
    setCenterCoordinates(stateData[event.target.value]);
    setCurrentState(event.target.value);
    props.onStateSelection(event.target.value)
  };

  {
    console.log("current state coords", centerCoordinates);
  }

  const getMapNevada = () =>  {
    console.log(state);
    return state[state.length - 1].dismap ? <NevadaDistricts/> : <NevadaMap/>
  }

  const getMapTexas = () =>  {
    console.log(state);
    return state[state.length - 1].dismap ? <TexasDistricts/> : <TexasMap/>
  }

  const getMapVirginia = () =>  {
    console.log(state);
    return state[state.length - 1].dismap ? <VirginiaDistricts/> : <VirginiaMap/>
  }
  var virginiaData = require("./../GeoJson/Extract GeoJSON entry/VirginiaFeatures.json");
  virginiaData = virginiaData

  async function fetchData() {
    try {
      const response = await axios.get(`http://localhost:4000/District`);
      for (const r of response.data){
        const newDistrict: district_summary_table = {
          district: r.districtId,
          predicted_winner: r.party,
          lastName: r.lastName,
        };
        setdistricts([...districts,newDistrict])
        setIsVisible(true)
      }
      
      
    } catch (error) {
      console.error('Error fetching data:'); 
    }
  }
  interface district_summary_table {
    district: number; 
    predicted_winner: string;
    lastName: string;
  } 
  const [searchDist, setSearchDist] = useState('');
  const [data, setData] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [districts, setdistricts] = useState<district_summary_table[]>([]);
  const handleSearchDist = async () => {
    try {
      let response = await axios.get(`http://localhost:4000/District/${searchDist}`)
      console.log(response)
      const newDistrict: district_summary_table = {
        district: response.data.districtId,
        predicted_winner: response.data.party,
        lastName: response.data.lastName,
      };
      setdistricts([...districts,newDistrict])
      setIsVisible(true)
    } catch (error) {
      console.log('Error fetching data:');
    }
  };
  function handleClear(){
    setdistricts([])
  }

  return (
    <div className="StateMap">
      <>
      <button onClick={() => fetchData()}>First 3 district</button>

      <div>
        District
      <input
        type="text"
        value={searchDist}
        onChange={(e) => setSearchDist(e.target.value)}
      />
      <button onClick={handleSearchDist}>Search</button>
      <div></div>
      <button onClick={handleClear}>clear</button>
      {isVisible && districts && (<TableBody>
                        {districts.map((row) => (
                            <TableRow key={row.district}>
                                <TableCell align="right">{row.district}</TableCell>
                                <TableCell style={{ color: row.predicted_winner === 'D' ? 'blue' : 'red' }} align="center">{row.predicted_winner}</TableCell>
                                <TableCell align="right">{row.lastName}</TableCell>
                                
                            </TableRow>
                        ))}
                    </TableBody>)}
      </div>
      </>
    </div>
  );
}