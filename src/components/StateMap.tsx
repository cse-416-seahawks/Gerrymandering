// import React from "react";
// import "./StateMap.css";

// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// // import MarkerClusterGroup from "react-leaflet-cluster";
// // import {MapLibreTileLayer} from "./MapLibreTileLayer.tsx";

// const state = {
//   lat: 51.505,
//   lng: -0.09,
//   zoom: 13,
// };

// function StateMap() {
//   return (
//     <div className="StateMap">
//       <div className="StateMap-Header-Text">
//         <h1>Map View</h1>
//       </div>
//       <MapContainer
//         id="mapid"
//         center={[37.8, -96]}
//         zoom={4}
//         scrollWheelZoom={false}
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <Marker position={[51.505, -0.09]}>
//           <Popup>
//             A pretty CSS3 popup. <br /> Easily customizable.
//           </Popup>
//         </Marker>
//       </MapContainer>
//     </div>
//   );
// }

// export default StateMap;


import React, {Component} from 'react'
import './StateMap.css'
import 'leaflet/dist/leaflet.css';
//import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap} from 'react-leaflet';
// import MarkerClusterGroup from "react-leaflet-cluster";
// import {MapLibreTileLayer} from "./MapLibreTileLayer.tsx";
import {MongoClient, GridFSBucket} from 'mongodb';
import axios from 'axios';

interface GeoJSON {
  type: string;
  features: GeoJSONFeature[];
}
interface GeoJSONFeature {
  type: string;
  properties: any; 
  geometry: any;   
}
const state = {
  lat: 51.505,
  lng: -0.09,
  zoom: 13,
};


/*
//let mongodb = require('mongodb');
//let client: MongoClient = mongodb.MongoClient;

const uri = "mongodb+srv://admin:jjtR0Hegh5KMcUHV@cluster0.0h5gltt.mongodb.net/?retryWrites=true&w=majority";
const gridFSBucketName = "fs";
const filenames = ["nv_2020_demcaucus.json", "cb_2022_48_bg_500k.json", "va_2019.json"]
const databaseNames = ["Nevada", "Texas", "Virginia"]
//client = new MongoClient(uri);
const client = new MongoClient(uri);

async function convertGridFSToGeoJSON() {
  try {
    await client.connect();
    const db = client.db(databaseNames[0]);
    const gridFSBucket = new GridFSBucket(db, { bucketName: gridFSBucketName });
    const [file] = await gridFSBucket.find(filenames).toArray();
    if (!file) {
      console.error(`File '${filenames[0]}' not found in GridFS.`);
      return;
    }
    const fileStream = gridFSBucket.openDownloadStream(file._id);
    let geojsonString = "";
    fileStream.on("data", (chunk: { toString: () => string; }) => {
      geojsonString += chunk.toString();
    });
    fileStream.on("end", () => {
      const geojsonObject = JSON.parse(geojsonString);
      console.log(geojsonObject);
    });
  } catch (error) {
    console.error("Error:", error);
  } finally {
    client.close();
  }
}

convertGridFSToGeoJSON();
*/




var texasData : GeoJSON //= require("./../GeoJson/cb_2022_48_bg_500k.json");
var nevadaData = require("./../GeoJson/nv_2020_demcaucus.json");
var virginiaData = require("./../GeoJson/va_2019.json");

axios.get(`/Texas/${"cb_2022_48_bg_500k.json"}`, { responseType: 'blob' }).then((response) => {
  const blob = new Blob([response.data]);
  const reader = new FileReader();
  reader.onload = () => {
    const text = reader.result;
    if (typeof text === 'string') {
      try {
        const geoJSON = JSON.parse(text);
        nevadaData = geoJSON
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }
  };
  reader.readAsText(blob);
}).catch((error) => {
    console.error('Error downloading file:', error);
  });



interface StateData {
  [key: string]: [number, number]; 
}
const stateData: StateData = {
  Nevada: [38.5, -116],
  Texas: [32, -99.9],
  Virginia: [37.9, -78]
};



export default function StateMap(props: { selectedState: string }) {
  const [centerCoordinates, setCenterCoordinates] = React.useState(stateData['Nevada']);

  React.useEffect(() => {
    setCenterCoordinates(stateData[props.selectedState]);
    console.log("props:"+props.selectedState)
  }, [props.selectedState]);


  function MapComponent(){
    return(
      <MapContainer id='mapid' center={[centerCoordinates[0],centerCoordinates[1]]} zoom={6} scrollWheelZoom={false}>
          
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {<GeoJSON data={nevadaData.features}/>}
        {/*<GeoJSON data={texasData.features}/>*/}
        {<GeoJSON data={virginiaData.features}/>}
      
      </MapContainer>
    )
  }




  return (
    <div className='StateMap'>
        <div className="StateMap-Header-Text"><h1>Map</h1></div>
          <MapComponent/>
      </div>
  )
}
