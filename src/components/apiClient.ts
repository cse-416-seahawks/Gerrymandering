import axios, { AxiosResponse } from "axios";
import { AvailableStates } from "../globalContext";
import { Feature, FeatureCollection } from "@turf/turf";
// Define a cache object
const cache: { [key: string]: any } = {};

function isFeatureCollection(data: any): data is FeatureCollection {
  return data.type === "FeatureCollection";
}

function isFeatureArray(data: any): data is Feature[] {
  return Array.isArray(data);
}

async function fetchData(url: string): Promise<any> {
  const cachedData = cache[url];
  // Check if data is already in the cache
  if (cachedData) {
    console.log("Data retrieved from cache for key:", url);
    return cache[url];
  }

  // If not in the cache, fetch the data
  console.log("Fetching data for key:", url);
  const response = await axios.get(url);

  // Assuming the response.data is the actual data you want to cache
  const { data } = response;

  // Store the fetched data in the cache
  cache[url] = data;

  return data;
}

export async function fetchMapData(): Promise<any> {
  const url = `http://localhost:4000/getMapCoordinatesData/`;

  try {
    const response = await fetchData(url);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function fetchCurrDistrictPlan(
  State: AvailableStates
): Promise<FeatureCollection> {
  const url = `http://localhost:4000/getCurrentDistrictPlan/${State}`;

  try {
    const data = await fetchData(url);

    if (isFeatureCollection(data)) {
      return data;
    } else if (isFeatureArray(data)) {
      const newCollection: FeatureCollection = {
        type: "FeatureCollection",
        features: data,
      };
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
    const response = await fetchData(url);
    if (response.status == 200) {
      console.log(response);
      return response;
    }
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
    const response = await fetchData(url);
    if (response.status == 200) {
      return response;
    }
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
    const response = await fetchData(url);
    if (response.status == 200) {
      return response;
    }
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
    const response = await fetchData(url);
    if (response.status == 200) {
      return response;
    }
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
    const response = await fetchData(url);
    if (response.status == 200) {
      return response;
    }
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
    const response = await fetchData(url);
    if (response.status == 200) {
      return response;
    }
  } catch (error) {
    throw error;
  }
}

export async function fetchDistrictPlan(
  state: AvailableStates,
  districtPlanId: string
) {
  const url = `http://localhost:4000/getDistrictPlanGeoJSON/${state}/${districtPlanId}`;

  try {
    const response = await fetchData(url);
    if (response.status == 200) {
      return response;
    }
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
    const response = await fetchData(url);
    if (response.status == 200) {
      return response;
    }
  } catch (error) {
    throw error;
  }
}

export async function fetchAssociationData(state: AvailableStates) {
  const url = `http://localhost:4000/getAssociationData/${state}`;

  try {
    const response = await fetchData(url);
    if (response.status == 200) {
      return response;
    }
  } catch (error) {
    throw error;
  }
}
