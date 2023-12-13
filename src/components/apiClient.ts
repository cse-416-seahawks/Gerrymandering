import axios, { AxiosResponse } from "axios";
import { AvailableStates } from "../globalContext";
import { Feature, FeatureCollection } from "@turf/turf";
import { getFromCache, updateCache } from "./cacheUtil";

function isFeatureCollection(data: any): data is FeatureCollection {
  return data.type === "FeatureCollection";
}

function isFeatureArray(data: any): data is Feature[] {
  return Array.isArray(data);
}

async function fetchData(url: string): Promise<any> {
  // If not in the cache, fetch the data
  const response = await axios.get(url);
  console.log("fetched!", response);

  if (response.status == 200) {
    const { data } = response;

    // Store the fetched data in the cache

    return data;
  } else {
    console.log("failed to retrieve data");
    return null;
  }
}

export async function fetchMapData(): Promise<any> {
  const url = `http://localhost:4000/getMapCoordinatesData/`;

  try {
    return await fetchData(url);
  } catch (error) {
    throw error;
  }
}

export async function fetchCurrDistrictPlan(
  State: AvailableStates
): Promise<FeatureCollection> {
  const url = `http://localhost:4000/getCurrentDistrictPlan/${State}`;
  console.log('requested district plan')
  try {
    const cachedData = getFromCache(url);
    // Check if data is already in the cache
    console.log("cached data ? ", cachedData);
    if (cachedData) {
      console.log("Data retrieved from cache for key:", url);
      return cachedData;
    }
    const data = await fetchData(url);
    if (isFeatureCollection(data[0])) {
      console.log("caching...");
      updateCache(url, data[0]);
      return data[0];
    } else if (isFeatureArray(data)) {
      console.log("returned a feature array");
      const newCollection: FeatureCollection = {
        type: "FeatureCollection",
        features: data,
      };
      console.log("caching...");
      updateCache(url, newCollection);
      return newCollection;
    } else {
      const newCollection: FeatureCollection = {
        type: "FeatureCollection",
        features: [],
      };
      return newCollection;
    }
  } catch (error) {
    throw error;
  }
}

export async function fetchStateOutline(
  State: AvailableStates
): Promise<FeatureCollection> {
  const url = `http://localhost:4000/getStateOutline/${State}`;

  try {
    const response = await fetchData(url);
    return response[0];
  } catch (error) {
    console.error("Error fetching data");
    throw error;
  }
}

export async function fetchStateEnsembles(State: AvailableStates) {
  const url = `http://localhost:4000/getStateEnsembles/${State}`;
  try {
    return await fetchData(url);
  } catch (error) {
    throw error;
  }
}

export async function fetchClusterSummaryData(
  State: AvailableStates,
  ensembleId: string,
  distanceMeasure: string
) {
  const url = `http://localhost:4000/getClusterSummaryData/${State}/${ensembleId}/${distanceMeasure}`;

  try {
    return await fetchData(url);
  } catch (error) {
    throw error;
  }
}

export async function updateClusterName(
  state: AvailableStates,
  ensembleId: string,
  distanceMeasure: string,
  clusterId: string,
  newClusterName: string
) {
  const url = `http://localhost:4000/updateClusterName/${state}/${ensembleId}/${distanceMeasure}/${clusterId}/${newClusterName}`;

  try {
    console.log("trying post request");
    const response = await axios.post(url);
    if (response.status == 200) {
      console.log(response);
    }
  } catch (error) {
    throw error;
  }
}

export async function fetchClusterSummaryGraphData(
  State: AvailableStates,
  ensembleId: string,
  distanceMeasure: string
) {
  const url = `http://localhost:4000/getClusterGraphData/${State}/${ensembleId}/${distanceMeasure}`;

  try {
    return await fetchData(url);
  } catch (error) {
    throw error;
  }
}

export async function fetchMDSClusterGraphData(
  State: AvailableStates,
  ensembleId: string,
  distanceMeasure: string
) {
  const url = `http://localhost:4000/getMDSClusterGraphData/${State}/${ensembleId}/${distanceMeasure}`;

  try {
    return await fetchData(url);
  } catch (error) {
    throw error;
  }
}

export async function fetchClusterDetails(
  state: AvailableStates,
  clusterId: string
) {
  const url = `http://localhost:4000/getClusterDetails/${state}/${clusterId}`;

  try {
    return await fetchData(url);
  } catch (error) {
    throw error;
  }
}

export async function fetchClusterDetailGraph(
  state: AvailableStates,
  clusterId: string
) {
  const url = `http://localhost:4000/getDistrictPlanGraphData/${state}/${clusterId}`;

  try {
    return await fetchData(url);
  } catch (error) {
    throw error;
  }
}

export async function fetchDistrictPlan(
  state: AvailableStates,
  districtPlanId: string
) {
  const url = `http://localhost:4000/getDistrictPlanGeoJSON/${state}/${districtPlanId}`;
  const cachedData = getFromCache(url);
  if (cachedData) {
    return cachedData;
  }
  try {
    const data = await fetchData(url);
    updateCache(url, data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchDistanceMeasureData(
  state: AvailableStates,
  ensembleId: string
) {
  const url = `http://localhost:4000/getDistanceMeasureData/${state}/${ensembleId}`;

  try {
    return await fetchData(url);
  } catch (error) {
    throw error;
  }
}

export async function fetchAssociationData(state: AvailableStates) {
  const url = `http://localhost:4000/getAssociationData/${state}`;

  try {
    return await fetchData(url);
  } catch (error) {
    throw error;
  }
}
