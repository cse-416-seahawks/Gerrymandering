import React, { useEffect, useContext, useState } from "react";
import "../css/StateMap.css";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Polygon,
  useMapEvent,
  useMap,
} from "react-leaflet";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TexasDistricts from "../districts-map/TexasDistricts";
import NevadaDistricts from "../districts-map/NevadaDistricts";
import VirginiaDistricts from "../districts-map/VirginiaDistricts";
import {
  GlobalContext,
  AvailableStates,
  GlobalTypes,
  InfoCardType,
  colors,
} from "../../globalContext";
import MainInfoCard from "../infocards/MainInfoCard";
import { DistrictState } from "../interfaces/MapInterface";
import DistrictPlan from "../districts-map/DistrictPlan";
import { fetchDistrictPlan } from "../apiClient";
import { useNavigate } from "react-router-dom";
import { clearCache } from "../cacheUtil";

interface StateMapProps {
  currentState: AvailableStates;
}
export default function StateMap({ currentState }: StateMapProps) {
  const { state, dispatch } = useContext(GlobalContext);
  const currentStateMapData = state[state.length - 1].mapData[currentState];
  const [planIds, setPlanIds] = useState<string[]>([]);
  const navigate = useNavigate();
  const [centerCoordinates, setCenterCoordinates] = useState<Array<number>>([]);
  const [zoom, setZoom] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const SetMapView = () => {
    const map = useMap();
    useEffect(() => {
      map.setView([centerCoordinates[0], centerCoordinates[1]], zoom);
    }, [centerCoordinates[0], centerCoordinates[1]]);
    return null;
  };

  const handleStateChange = (event: SelectChangeEvent) => {
    dispatch({
      type: GlobalTypes.ChangeCard,
      payload: {
        infoCardType: InfoCardType.ensembleInfo,
      },
    });
    // clear cache for state change
    clearCache();
    navigate(`/cluster-analysis/state/${event.target.value}`);
  };

  function generateNeonColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
      // To make it bright, favor values close to F (hexadecimal)
      const value = Math.floor(Math.random() * 6) + 10;
      color += letters[value];
    }

    return color;
  }

  useEffect(() => {
    setPlanIds(state[state.length - 1].districtPlanIds);
  }, [state[state.length - 1].districtPlanIds]);

  useEffect(() => {
    if (currentStateMapData) {
      setCenterCoordinates(currentStateMapData.centerCoordinates);
      setZoom(currentStateMapData.zoom);
      setLoading(false);
    }
  }, [currentStateMapData]);

  return (
    <div className="StateMap">
      {!loading && (
        <>
          <MapContainer
            id="mapid"
            center={[centerCoordinates[0], centerCoordinates[1]]}
            zoom={6}
            scrollWheelZoom={false}
            className="State-map"
            style={{ height: "125%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {planIds.map((planId, index) => {
              return (
                <DistrictPlan
                  transparent
                  planId={planId}
                  opacity={0.5}
                  color={"ADD8E6"}
                  strokeColor={colors[index]}
                />
              );
            })}
            <NevadaDistricts opacity={0.5} />
            <TexasDistricts opacity={0.5} />
            <VirginiaDistricts opacity={0.5} />

            <SetMapView />
          </MapContainer>
        </>
      )}
      <div className="State-map stack-top">
        <FormControl
          variant="filled"
          sx={{ m: 1, minWidth: 120 }}
          style={{
            backgroundColor: "white",
            width: "150px",
            boxShadow: "0 3px 10px rgb(0 0 0 / 0.3)",
          }}
        >
          <InputLabel id="demo-simple-select-filled-label">State</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={currentState}
            onChange={handleStateChange}
            style={{ fontWeight: "bold", fontSize: "18px" }}
          >
            <MenuItem value={"NEVADA"}>Nevada</MenuItem>
            <MenuItem value={"TEXAS"}>Texas</MenuItem>
            <MenuItem value={"VIRGINIA"}>Virginia</MenuItem>
          </Select>
        </FormControl>
      </div>
      <MainInfoCard />
    </div>
  );
}
