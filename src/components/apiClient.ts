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
    const response = await axios.get(
      `http://localhost:4000/getCurrentDistrictPlan/${State}`
    )


    if(isFeatureCollection(response.data[0])){
      return response.data[0];
    }
    else if(isFeatureArray(response.data)){
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
  } catch(error) {
    throw error;
  }
}

export async function fetchStateOutline(
  State: AvailableStates
): Promise<FeatureCollection> {
  try {
    const response = await axios.get(
      `http://localhost:4000/getStateOutline/${State}`
    );
    return response.data[0];
  } catch (error) {
    console.error("Error fetching data");
    throw error;
  }
}

export async function fetchEnsembleData(State: AvailableStates) {
  try {
    const response = await axios.get(`http://localhost:4000/getEnsembleData/${State}`);
    if (response.status == 200) {
      return response.data;
    }
  } catch(error) {
    throw error;
  }
}

export async function fetchClusterData(State: AvailableStates, ensembleId: String, distanceMeasure: String) {
  try {
    const response = await axios.get(`http://localhost:4000/getClusterData/${State}/${ensembleId}/${distanceMeasure}`);
    if (response.status == 200) {
      return response.data;
    }
  } catch(error) {
    throw error;
  }
}

export async function fetchDistrictPlanData(state: AvailableStates, districtPlanIds: Array<String>) {
  try {
    const response = await axios.get(`http://localhost:4000/getDistrictPlanData/${state}/${districtPlanIds}`);
    if (response.status == 200) {
      return response.data;
    }
  } catch(error) {
    throw error;
  }
}
