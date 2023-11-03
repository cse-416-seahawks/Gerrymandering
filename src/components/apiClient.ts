import axios from "axios";
import { AvailableStates } from "../globalContext";
import { Feature, FeatureCollection } from '@turf/turf';



export async function fetchDistricts(State : AvailableStates) : Promise<FeatureCollection> {
    try {
        console.log("awaiting information", State)
        const response = await axios.get(`http://localhost:4000/getInformation/${State}`);
        console.log("district data: ", response);
        return response.data;
      } catch (error) {
        console.error('Error fetching data'); 
        throw error;
      }
}


export async function fetchStateOutline(State : AvailableStates) : Promise<FeatureCollection> {
  try {
    console.log("awaiting state data", State);
    const response = await axios.get(`http://localhost:4000/getOutline/${State}`);
    console.log("fetching state outlines", State ,response);
    return response.data;

  } catch(error) {
    console.error("Error fetching data");
    throw error;
  }

}