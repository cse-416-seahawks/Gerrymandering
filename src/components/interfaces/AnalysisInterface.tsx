import { TooltipProps } from "recharts";

export interface ClusterData {
  cluster_number: number,
  cluster_id: string,
  name: string,
  num_dist_plans: number,
  avg_rep: string,
  avg_dem: string,
  avg_distance: number,
  demographics: ClusterDemographicData,
  district_plans: Array<string>,
}
  
export interface ClusterDemographicData {
  caucasian: number,
  african_american: number,
  asian_american: number,
  hispanic: number,
  other: number,
}
  
export interface ClusterPoints {
  cluster_num: number,
  num_district_plans: number,
  x: number,
  y: number,
}

export interface DistrictPlanData {
  district_plan: number;
  opportunity_districts: number;
  democrat: string;
  republican: string;
}

export interface DistrictPlanGraphData {
  graph_type: string;
  cluster_id: string;
  x_axis_label: string;
  y_axis_label: string;
  data: Array<DistrictPlanPoints>
}

export interface DistrictPlanPoints {
  district_plan_id: string;
  district_plan: string;
  availableData: boolean;
  x: number;
  y: number;
}
  
export interface CustomTooltipProps extends TooltipProps<any, any> {
  active?: boolean;
  payload?: Array<{
    name: string; payload: {
      cluster_num: number; num_district_plans: number; x: number; y: number; id: string 
    } 
  }>;
}