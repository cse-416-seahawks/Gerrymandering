import React, { useContext, useEffect, useState } from "react";
import Map from "./Map";
import Navbar from "./Navbar";
import "../../App.css";

export default function StateSelect(props: { centerCoordinates: Array<number>, zoom: number }) {
  const [usMapcenterCoordinates, setUsMapCenterCoordinates] = useState(props.centerCoordinates);
  const [usMapZoom, setUsMapZoom] = useState(props.zoom);

  return (
    <div className="Home">
      <div className="Home-content">
        <Navbar aboutPage={false} />
          <Map centerCoordinates={usMapcenterCoordinates} zoom={usMapZoom}/>
      </div>
    </div>
  );
}
