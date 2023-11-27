import React, { useContext, useEffect, useState } from "react";
import "../css/StateMap.css";
import "leaflet/dist/leaflet.css";
import type { LatLngTuple } from "leaflet";

import { Polygon } from "react-leaflet";
import { AvailableStates, GlobalContext, GlobalTypes } from "../../globalContext";
import { fetchStateOutline } from "../apiClient";
import { useNavigate } from "react-router-dom";

const getColor = () => {
  return "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
};

export default () => {

  interface MapState {
    data: any | null; // Adjust the type based on your actual data structure
  }
  

  const [virginiaOutline, setData] = useState<MapState["data"]>(null);

  const { state, dispatch } = useContext(GlobalContext);

  const navigate = useNavigate();

  const handleClick = () => {
    dispatch({
      type : GlobalTypes.ChangeState,
      payload : {
        currentState : AvailableStates.Virginia
      }
    })
    navigate("/home");
  }


  useEffect(() => {
    async function fetchOutlineAsync() {
      try {
        const result = await fetchStateOutline(AvailableStates.Virginia);
        setData(result);
      } catch (error) {}
    }

    fetchOutlineAsync();
  }, []);

  
  return (
    <>
      {virginiaOutline ? (
        <Polygon
          pathOptions={{
            fillColor: "#4287f5",
            fillOpacity: 0.5,
            weight: 2,
            opacity: 1,
            color: "white",
          }}
          positions={virginiaOutline.features[0].geometry.coordinates.map(
            (items: any[]) => {
              return items.map((items: any[]) =>
                items.map((items: number[]) => {
                  const coordinates: LatLngTuple = [items[1], items[0]];
                  return coordinates;
                })
              );
            }
          )}
          eventHandlers={{
            mouseover: (e) => {
              const layer = e.target;
              layer.setStyle({
                fillOpacity: 0.7,
                weight: 2,
                color: "white",
              });
            },
            mouseout: (e) => {
              const layer = e.target;
              layer.setStyle({
                fillOpacity: 0.5,
                weight: 2,
                color: "white",
              });
            },
            click: handleClick
          }}
        />
      ) : (
        <div></div>
      )}
    </>
  );
};
