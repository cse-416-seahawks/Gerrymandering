import { FeatureCollection } from "@turf/turf";

export interface MapState {
    data: any | null;
}

export interface DistrictState {
    data: FeatureCollection | null;
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

export interface StateMapData {
    centerCoordinates: [number, number];
    zoom: number;
}

export interface StateDistrictPlanType {
    [state: string]: string;
  }

export interface MapData {
    [state: string]: StateMapData;
}