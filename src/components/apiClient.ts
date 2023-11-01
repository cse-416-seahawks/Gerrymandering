import axios from "axios";
import { Feature, FeatureCollection } from '@turf/turf';


export async function fetchTexasDistrict() : Promise<FeatureCollection> {
    try {

        const response = await axios.get(`http://localhost:4000/geojson`);
        console.log(response)
        return response.data;
      } catch (error) {
        console.error('Error fetching data'); 
        throw error;
      }
}