import React, { useContext, useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import {
  GlobalContext,
  AvailableStates,
  GlobalProvider,
} from "../../globalContext";
import Map from "./Map";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import "../../App.css";

export default function StateSelect(props: {
  centerCoordinates: Array<number>;
}) {
  const [centerCoordinates, setCenterCoordinates] = useState(
    props.centerCoordinates
  );

  return (
    <div className="Home">
      <div className="Home-content">
        <Navbar />
          <Map centerCoordinates={centerCoordinates} />
      </div>
    </div>
  );
}
