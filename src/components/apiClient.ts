import axios, { AxiosResponse } from "axios";
import { AvailableStates } from "../globalContext";
import { Feature, FeatureCollection } from "@turf/turf";


function isFeatureCollection(data: any): data is FeatureCollection {
  return data.type === 'FeatureCollection'
}

function isFeatureArray(data: any): data is Feature[] {
  return Array.isArray(data);
}

export async function fetchMapData() {
  try {
    const response = await axios.get(`http://localhost:4000/getMapCoordinatesData/`);
    if (response.status == 200) {
      return response.data;
    }
  } catch(error) {
    throw error;
  }
}

export async function fetchCurrDistrictPlan(State: AvailableStates): Promise<FeatureCollection> {
  try {
    const response = await axios.get(`http://localhost:4000/getCurrentDistrictPlan/${State}`);

    if (isFeatureCollection(response.data[0])){
      return response.data[0];
    }
    else if(isFeatureArray(response.data)){
      const newCollection : FeatureCollection = {
        type: "FeatureCollection",
        "features": response.data
      }
      return newCollection;
    }
    else {
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

export async function fetchStateOutline(State: AvailableStates): Promise<FeatureCollection> {
  try {
    const response = await axios.get(`http://localhost:4000/getStateOutline/${State}`);
    return response.data[0];
  } catch (error) {
    console.error("Error fetching data");
    throw error;
  }
}

export async function fetchStateEnsembles(State: AvailableStates) {
  try {
    const response = await axios.get(`http://localhost:4000/getStateEnsembles/${State}`);
    if (response.status == 200) {
      return response.data;
    }
  } catch(error) {
    throw error;
  }
}

export async function fetchClusterSummaryData(State: AvailableStates, ensembleId: string, distanceMeasure: string) {
  try {
    const response = await axios.get(`http://localhost:4000/getClusterSummaryData/${State}/${ensembleId}/${distanceMeasure}`);
    if (response.status == 200) {
      return response.data;
    }
  } catch(error) {
    throw error;
  }
}

export async function fetchClusterSummaryGraphData(State: AvailableStates, ensembleId: string, distanceMeasure: string) {
  try {
    const response = await axios.get(`http://localhost:4000/getClusterGraphData/${State}/${ensembleId}/${distanceMeasure}`);
    if (response.status == 200) {
      return response.data;
    }
  } catch(error) {
    throw error;
  }
}

export async function fetchClusterDetails(state: AvailableStates, clusterId: string) {
  try {
    const response = await axios.get(`http://localhost:4000/getClusterDetails/${state}/${clusterId}`);
    if (response.status == 200) {
      return response.data;
    }
  } catch(error) {
    throw error;
  }
}

export async function fetchClusterDetailGraph(state: AvailableStates, clusterId: string) {
  try {
    const response = await axios.get(`http://localhost:4000/getDistrictPlanGraphData/${state}/${clusterId}`);
    if (response.status == 200) {
      return response.data;
    }
  } catch(error) {
    throw error;
  }
}

// export async function fetchDistrictPlan(state: AvailableStates, districtPlanId: string) {
//   try {
//     const response = await axios.get(`http://localhost:4000/getDistrictPlanGeoJSON/${state}/${districtPlanId}`);
//     if (response.status == 200) {
//       return response.data;
//     }
//   } catch(error) {
//     throw error;
//   }
// }

// export async function fetchDistanceMeasureData(state: AvailableStates, ensembleId: string) {
//   try {
//     const response = await axios.get(`http://localhost:4000/getDistanceMeasureData/${state}/${ensembleId}`);
//     if (response.status == 200) {
//       return response.data;
//     }
//   } catch(error) {
//     throw error;
//   }
// }

// export async function fetchAssociationData(state: AvailableStates) {
//   try {
//     const response = await axios.get(`http://localhost:4000/getAssociationData/${state}`);
//     if (response.status == 200) {
//       return response.data;
//     }
//   } catch(error) {
//     throw error;
//   }
// }
