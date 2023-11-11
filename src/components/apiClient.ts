import axios, { AxiosResponse } from "axios";
import { AvailableStates } from "../globalContext";
import { Feature, FeatureCollection } from "@turf/turf";


function isFeatureCollection(data : any) : data is FeatureCollection {
  return data.type === 'FeatureCollection'
}

function isFeatureArray(data : any) : data is Feature[] {
  return Array.isArray(data);
}

export async function fetchDistricts(
  State: AvailableStates
): Promise<FeatureCollection> {
  try {
    console.log("awaiting information", State);
    const response = await axios.get(
      `http://localhost:4000/getInformation/${State}`
    )

    console.log(response);

    if(isFeatureCollection(response.data[0])){
      console.log("found a feature collection")
      return response.data[0];
    }
    else if(isFeatureArray(response.data)){
      console.log("found a feature array");
      const newCollection : FeatureCollection = {
        type: "FeatureCollection",
        "features": response.data
      }
      return newCollection;
    }
    else{
      const newCollection : FeatureCollection = {
        type: "FeatureCollection",
        "features": []
      }
      return newCollection;
    }
    // console.log("district data: ", response);
    // if (State === AvailableStates.Virginia) {
      
    // } else return response.data[0];
  } catch(error) {
    console.log(error)
    throw error;
  }
}

export async function fetchStateOutline(
  State: AvailableStates
): Promise<FeatureCollection> {
  try {
    console.log("awaiting state data", State);
    const response = await axios.get(
      `http://localhost:4000/getOutline/${State}`
    );
    console.log("fetching state outlines", State, response);
    return response.data[0];
  } catch (error) {
    console.error("Error fetching data");
    throw error;
  }
}

export async function fetchEnsembleData(State: AvailableStates) {
  try {
    console.log("awaiting ensemble data")
    const response = await axios.get(`http://localhost:4000/getEnsembleData/${State}`);
    console.log("response!!", response);
    if (response.status == 200) {
      return response.data;
    }
  } catch(error) {
    throw error;
  }
}

export async function fetchClusterData(State: AvailableStates, ensembleId: Number, distanceMeasure: String) {
  try {
    console.log("awaiting cluster data");
    const response = await axios.get(`http://localhost:4000/getClusterData/${State}/${ensembleId}/${distanceMeasure}`);
    console.log("response::", response);
    if (response.status == 200) {
      return response.data;
    }
  } catch(error) {
    throw error;
  }
}
