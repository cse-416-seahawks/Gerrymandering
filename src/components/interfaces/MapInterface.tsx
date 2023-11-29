import { FeatureCollection } from "@turf/turf";

export interface MapState {
    data: any | null; // Adjust the type based on your actual data structure
}

export interface DistrictState {
    data: FeatureCollection | null; // Adjust the type based on your actual data structure
}

export interface GeoJSON {
    type: string;
    features: GeoJSONFeature[];
}
export interface GeoJSONFeature {
    type: string;
    properties: any;
    geometry: any;
}
  
export interface StateData {
    [key: string]: [number, number];
}

export interface StateZoomData {
    [key: string]: number;
}