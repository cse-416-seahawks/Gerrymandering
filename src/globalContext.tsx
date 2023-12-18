import React, {
  FC,
  Reducer,
  createContext,
  useContext,
  useReducer,
} from "react";
import { DistrictPlanData } from "./components/interfaces/AnalysisInterface";
import {
  MapData,
  StateMapData,
  StateDistrictPlanType,
} from "./components/interfaces/MapInterface";
import { DistanceMeasureType } from "./components/interfaces/AnalysisInterface";

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export const colors = [
  '#FF5733', // Orange
  '#33FF57', // Green
  '#5733FF', // Blue
  '#FF33A6', // Pink
  '#FFD133', // Yellow
  '#33A6FF', // Sky Blue
  '#FF3362', // Red
  '#A6FF33', // Neon Yellow-Green
  '#FF33D1', // Purple
  '#FFA633', // Amber
  '#33FF99', // Mint Green
];

export interface EnsembleData {
  ensemble: number;
  ensemble_id: string;
  num_clusters: number;
  avg_dist_clusters: number;
  num_dist_plans: number;
}

export enum Demographics {
  AfroAmerican = "African American Population",
  Causcasian = "Caucasian Population",
  AsianAmerican = "Asian American Population",
  Hispanic = "Hispanic Population",
}

export interface GraphOptions {
  demographic: Demographics;
  population: number;
  comparison: boolean;
}

export enum InfoCardType {
  ensembleInfo = "Ensemble Info",
  associationDetail = "Ensemble Size Association",
  distanceMeasure = "Distance Measure",
  clusterPlotOptions = "Cluster Scatter Plot Options",
  ensembleSummary = "Ensemble Summary",
  clusterDetails = "Cluster Details",
  districtPlans = "District Plans",
  clusterSummary = "Cluster Summary",
}

export enum AvailableStates {
  Nevada = "NEVADA",
  Texas = "TEXAS",
  Virginia = "VIRGINIA",
  Unselected = "UNSELECTED",
}

export enum GlobalTypes {
  ChangeCard = "CHANGE_INFO_CARD",
  DistanceMeasure = "DISTANCE_MEASURE",
  SetDistanceMeasuresData = "SET_DISTANCE_MEASURES_DATA",
  SetEnsemble = "SET_ENSEMBLE",
  SetCluster = "SET_CLUSTER",
  AddEnsembleDetail = "ADD_ENS_DETAIL",
  UpdateEnsembleDetail = "UPDATE_ENS_DETAIL",
  EditGraphOptions = "EDIT_GRAPH_OPTIONS",
  SetClusterDetails = "SET_CLUSTER_DETAILS",
  SetMapData = "SET_MAP_DATA",
  AddDistrictPlan = "ADD_DISTRICT_PLAN",
  RemoveDistrictPlan = "REMOVE_DISTRICT_PLAN",
  SetComparedPlan = "SET_COMPARED_PLAN",
  SetPlotOptions = "SET_PLOT_OPTIONS",
  ResetPage = "RESET_PAGE",
}

export enum DistanceMeasure {
  HammingDistance = "Hamming Distance",
  OptimalTransport = "Optimal Transport",
}

export type GlobalState = {
  mapData: MapData;
  districtPlanTypes: StateDistrictPlanType;
  currentInfoCard: InfoCardType;
  distanceMeasure: DistanceMeasure;
  compareDistanceMeasuresData: Array<DistanceMeasureType>;
  ensemble: number;
  cluster: number;
  clusterPlanIds: Array<string>;
  districtPlanIds: Array<string>;
  ensembleDetails: Array<EnsembleData>;
  clusterDetails: Array<DistrictPlanData>;
  comparedPlan: DistrictPlanData;
  plotOptions: GraphOptions;
};

type GlobalStatePayload = {
  [GlobalTypes.SetMapData]: {
    mapData: MapData;
    districtPlanTypes: StateDistrictPlanType;
  };
  [GlobalTypes.ChangeCard]: {
    infoCardType: InfoCardType;
  };
  [GlobalTypes.DistanceMeasure]: {
    distanceMeasure: DistanceMeasure;
  };
  [GlobalTypes.SetDistanceMeasuresData]: {
    compareDistanceMeasuresData: Array<DistanceMeasureType>;
  };
  [GlobalTypes.SetEnsemble]: {
    ensemble: number;
  };
  [GlobalTypes.SetCluster]: {
    cluster: number;
    clusterPlanIds: Array<string>;
  };
  [GlobalTypes.AddEnsembleDetail]: {
    EnsembleData: EnsembleData;
  };
  [GlobalTypes.UpdateEnsembleDetail]: {
    EnsembleData: EnsembleData[];
  };
  [GlobalTypes.SetClusterDetails]: {
    clusterDetails: Array<DistrictPlanData>;
  };
  [GlobalTypes.AddDistrictPlan]: {
    planId: string;
  };
  [GlobalTypes.RemoveDistrictPlan]: {
    planId: string;
  };
  [GlobalTypes.SetComparedPlan]: {
    comparedPlan: DistrictPlanData;
  };
  [GlobalTypes.SetPlotOptions]: {
    plotOptions: GraphOptions;
  };
  [GlobalTypes.ResetPage]: {
    clean: boolean;
  };
};

export type GlobalStateActions =
  | ActionMap<GlobalStatePayload>[keyof ActionMap<GlobalStatePayload>]
  | Array<ActionMap<GlobalStatePayload>[keyof ActionMap<GlobalStatePayload>]>;

const mainReducer = (
  state: GlobalState[],
  action: GlobalStateActions
): GlobalState[] => {
  const isArray = Array.isArray(action);

  const handleSingleAction = (
    action: ActionMap<GlobalStatePayload>[keyof ActionMap<GlobalStatePayload>]
  ) => {
    switch (action.type) {
      case GlobalTypes.SetMapData:
        return [
          ...state,
          {
            mapData: action.payload.mapData,
            districtPlanTypes: action.payload.districtPlanTypes,
            currentInfoCard: state[state.length - 1].currentInfoCard,
            distanceMeasure: state[state.length - 1].distanceMeasure,
            compareDistanceMeasuresData:
              state[state.length - 1].compareDistanceMeasuresData,
            ensemble: state[state.length - 1].ensemble,
            cluster: state[state.length - 1].cluster,
            clusterPlanIds: state[state.length - 1].clusterPlanIds,
            districtPlanIds: state[state.length - 1].districtPlanIds,
            ensembleDetails: state[state.length - 1].ensembleDetails,
            clusterDetails: state[state.length - 1].clusterDetails,
            comparedPlan: state[state.length - 1].comparedPlan,
            plotOptions: state[state.length - 1].plotOptions,
          },
        ];
      case GlobalTypes.ChangeCard:
        return [
          ...state,
          {
            mapData: state[state.length - 1].mapData,
            districtPlanTypes: state[state.length - 1].districtPlanTypes,
            currentInfoCard: action.payload.infoCardType,
            distanceMeasure: state[state.length - 1].distanceMeasure,
            compareDistanceMeasuresData:
              state[state.length - 1].compareDistanceMeasuresData,
            ensemble: state[state.length - 1].ensemble,
            cluster: state[state.length - 1].cluster,
            clusterPlanIds: state[state.length - 1].clusterPlanIds,
            districtPlanIds: state[state.length - 1].districtPlanIds,
            ensembleDetails: state[state.length - 1].ensembleDetails,
            clusterDetails: state[state.length - 1].clusterDetails,
            comparedPlan: state[state.length - 1].comparedPlan,
            plotOptions: state[state.length - 1].plotOptions,
          },
        ];
      case GlobalTypes.DistanceMeasure:
        return [
          ...state,
          {
            mapData: state[state.length - 1].mapData,
            districtPlanTypes: state[state.length - 1].districtPlanTypes,
            currentInfoCard: state[state.length - 1].currentInfoCard,
            distanceMeasure: action.payload.distanceMeasure,
            compareDistanceMeasuresData:
              state[state.length - 1].compareDistanceMeasuresData,
            ensemble: state[state.length - 1].ensemble,
            cluster: state[state.length - 1].cluster,
            clusterPlanIds: state[state.length - 1].clusterPlanIds,
            districtPlanIds: state[state.length - 1].districtPlanIds,
            ensembleDetails: [],
            clusterDetails: state[state.length - 1].clusterDetails,
            comparedPlan: state[state.length - 1].comparedPlan,
            plotOptions: state[state.length - 1].plotOptions,
          },
        ];
      case GlobalTypes.SetDistanceMeasuresData:
        return [
          ...state,
          {
            mapData: state[state.length - 1].mapData,
            districtPlanTypes: state[state.length - 1].districtPlanTypes,
            currentInfoCard: state[state.length - 1].currentInfoCard,
            distanceMeasure: state[state.length - 1].distanceMeasure,
            compareDistanceMeasuresData:
              action.payload.compareDistanceMeasuresData,
            ensemble: state[state.length - 1].ensemble,
            cluster: state[state.length - 1].cluster,
            clusterPlanIds: state[state.length - 1].clusterPlanIds,
            districtPlanIds: state[state.length - 1].districtPlanIds,
            ensembleDetails: state[state.length - 1].ensembleDetails,
            clusterDetails: state[state.length - 1].clusterDetails,
            comparedPlan: state[state.length - 1].comparedPlan,
            plotOptions: state[state.length - 1].plotOptions,
          },
        ];
      case GlobalTypes.SetEnsemble:
        return [
          ...state,
          {
            mapData: state[state.length - 1].mapData,
            districtPlanTypes: state[state.length - 1].districtPlanTypes,
            currentInfoCard: state[state.length - 1].currentInfoCard,
            distanceMeasure: state[state.length - 1].distanceMeasure,
            compareDistanceMeasuresData:
              state[state.length - 1].compareDistanceMeasuresData,
            ensemble: action.payload.ensemble,
            cluster: state[state.length - 1].cluster,
            clusterPlanIds: state[state.length - 1].clusterPlanIds,
            districtPlanIds: state[state.length - 1].districtPlanIds,
            ensembleDetails: state[state.length - 1].ensembleDetails,
            clusterDetails: state[state.length - 1].clusterDetails,
            comparedPlan: state[state.length - 1].comparedPlan,
            plotOptions: state[state.length - 1].plotOptions,
          },
        ];
      case GlobalTypes.SetCluster:
        return [
          ...state,
          {
            mapData: state[state.length - 1].mapData,
            districtPlanTypes: state[state.length - 1].districtPlanTypes,
            currentInfoCard: state[state.length - 1].currentInfoCard,
            distanceMeasure: state[state.length - 1].distanceMeasure,
            compareDistanceMeasuresData:
              state[state.length - 1].compareDistanceMeasuresData,
            ensemble: state[state.length - 1].ensemble,
            cluster: action.payload.cluster,
            clusterPlanIds: action.payload.clusterPlanIds,
            districtPlanIds: state[state.length - 1].districtPlanIds,
            ensembleDetails: state[state.length - 1].ensembleDetails,
            clusterDetails: state[state.length - 1].clusterDetails,
            comparedPlan: state[state.length - 1].comparedPlan,
            plotOptions: state[state.length - 1].plotOptions,
          },
        ];
      case GlobalTypes.AddEnsembleDetail:
        let newDetails = state[state.length - 1].ensembleDetails;

        if (
          !newDetails.some(
            (existingData) =>
              JSON.stringify(existingData) ===
              JSON.stringify(action.payload.EnsembleData)
          )
        ) {
          newDetails.push(action.payload.EnsembleData);
        }
        if (newDetails.length > 3) {
          newDetails.shift();
        }
        return [
          ...state,
          {
            mapData: state[state.length - 1].mapData,
            districtPlanTypes: state[state.length - 1].districtPlanTypes,
            currentInfoCard: state[state.length - 1].currentInfoCard,
            distanceMeasure: state[state.length - 1].distanceMeasure,
            compareDistanceMeasuresData:
              state[state.length - 1].compareDistanceMeasuresData,
            ensemble: state[state.length - 1].ensemble,
            cluster: state[state.length - 1].cluster,
            clusterPlanIds: state[state.length - 1].clusterPlanIds,
            districtPlanIds: state[state.length - 1].districtPlanIds,
            ensembleDetails: newDetails,
            clusterDetails: state[state.length - 1].clusterDetails,
            comparedPlan: state[state.length - 1].comparedPlan,
            plotOptions: state[state.length - 1].plotOptions,
          },
        ];
      case GlobalTypes.UpdateEnsembleDetail:
        return [
          ...state,
          {
            mapData: state[state.length - 1].mapData,
            districtPlanTypes: state[state.length - 1].districtPlanTypes,
            currentInfoCard: state[state.length - 1].currentInfoCard,
            distanceMeasure: state[state.length - 1].distanceMeasure,
            compareDistanceMeasuresData:
              state[state.length - 1].compareDistanceMeasuresData,
            ensemble: state[state.length - 1].ensemble,
            cluster: state[state.length - 1].cluster,
            clusterPlanIds: state[state.length - 1].clusterPlanIds,
            districtPlanIds: state[state.length - 1].districtPlanIds,
            ensembleDetails: action.payload.EnsembleData,
            clusterDetails: state[state.length - 1].clusterDetails,
            comparedPlan: state[state.length - 1].comparedPlan,
            plotOptions: state[state.length - 1].plotOptions,
          },
        ];
      case GlobalTypes.SetClusterDetails:
        return [
          ...state,
          {
            mapData: state[state.length - 1].mapData,
            districtPlanTypes: state[state.length - 1].districtPlanTypes,
            currentInfoCard: state[state.length - 1].currentInfoCard,
            distanceMeasure: state[state.length - 1].distanceMeasure,
            compareDistanceMeasuresData:
              state[state.length - 1].compareDistanceMeasuresData,
            ensemble: state[state.length - 1].ensemble,
            cluster: state[state.length - 1].cluster,
            clusterPlanIds: state[state.length - 1].clusterPlanIds,
            districtPlanIds: state[state.length - 1].districtPlanIds,
            ensembleDetails: state[state.length - 1].ensembleDetails,
            clusterDetails: action.payload.clusterDetails,
            comparedPlan: state[state.length - 1].comparedPlan,
            plotOptions: state[state.length - 1].plotOptions,
          },
        ];
      case GlobalTypes.AddDistrictPlan:
        let newPlanIds = state[state.length - 1].districtPlanIds;
        if (!newPlanIds.includes(action.payload.planId)) {
          newPlanIds.push(action.payload.planId);
        }
        return [
          ...state,
          {
            mapData: state[state.length - 1].mapData,
            districtPlanTypes: state[state.length - 1].districtPlanTypes,
            currentInfoCard: state[state.length - 1].currentInfoCard,
            distanceMeasure: state[state.length - 1].distanceMeasure,
            compareDistanceMeasuresData:
              state[state.length - 1].compareDistanceMeasuresData,
            ensemble: state[state.length - 1].ensemble,
            cluster: state[state.length - 1].cluster,
            clusterPlanIds: state[state.length - 1].clusterPlanIds,
            districtPlanIds: newPlanIds,
            ensembleDetails: state[state.length - 1].ensembleDetails,
            clusterDetails: state[state.length - 1].clusterDetails,
            comparedPlan: state[state.length - 1].comparedPlan,
            plotOptions: state[state.length - 1].plotOptions,
          },
        ];
      case GlobalTypes.RemoveDistrictPlan:
        let updatedPlanIds = state[state.length - 1].districtPlanIds;
        updatedPlanIds = updatedPlanIds.filter(
          (planId) => planId !== action.payload.planId
        );
        return [
          ...state,
          {
            mapData: state[state.length - 1].mapData,
            districtPlanTypes: state[state.length - 1].districtPlanTypes,
            currentInfoCard: state[state.length - 1].currentInfoCard,
            distanceMeasure: state[state.length - 1].distanceMeasure,
            compareDistanceMeasuresData:
              state[state.length - 1].compareDistanceMeasuresData,
            ensemble: state[state.length - 1].ensemble,
            cluster: state[state.length - 1].cluster,
            clusterPlanIds: state[state.length - 1].clusterPlanIds,
            districtPlanIds: updatedPlanIds,
            ensembleDetails: state[state.length - 1].ensembleDetails,
            clusterDetails: state[state.length - 1].clusterDetails,
            comparedPlan: state[state.length - 1].comparedPlan,
            plotOptions: state[state.length - 1].plotOptions,
          },
        ];
      case GlobalTypes.SetComparedPlan:
        return [
          ...state,
          {
            mapData: state[state.length - 1].mapData,
            districtPlanTypes: state[state.length - 1].districtPlanTypes,
            currentInfoCard: state[state.length - 1].currentInfoCard,
            distanceMeasure: state[state.length - 1].distanceMeasure,
            compareDistanceMeasuresData:
              state[state.length - 1].compareDistanceMeasuresData,
            ensemble: state[state.length - 1].ensemble,
            cluster: state[state.length - 1].cluster,
            clusterPlanIds: state[state.length - 1].clusterPlanIds,
            districtPlanIds: state[state.length - 1].districtPlanIds,
            ensembleDetails: state[state.length - 1].ensembleDetails,
            clusterDetails: state[state.length - 1].clusterDetails,
            comparedPlan: action.payload.comparedPlan,
            plotOptions: state[state.length - 1].plotOptions,
          },
        ];
      case GlobalTypes.ResetPage:
        return [
          ...state,
          {
            mapData: {},
            districtPlanTypes: {},
            currentInfoCard: InfoCardType.ensembleInfo,
            distanceMeasure: DistanceMeasure.HammingDistance,
            compareDistanceMeasuresData: [],
            ensemble: 0,
            cluster: 0,
            clusterPlanIds: [],
            districtPlanIds: [],
            ensembleDetails: [],
            clusterDetails: [],
            comparedPlan: {} as DistrictPlanData,
            plotOptions: {
              demographic: Demographics.AfroAmerican,
              population: 5,
              comparison: true,
            },
          },
        ];
      default:
        return state;
    }
  };

  const handleMultipleActions = (actions: GlobalStateActions[]) => {
    // Handle multiple actions if needed
    actions.forEach((action) => {
      if ("type" in action) {
        state = handleSingleAction(action);
      }
    });
  };

  if (isArray) {
    handleMultipleActions(action);
  } else {
    state = handleSingleAction(action);
  }
  return state;
};

const intialState: GlobalState[] = [
  {
    mapData: {},
    districtPlanTypes: {},
    currentInfoCard: InfoCardType.ensembleInfo,
    distanceMeasure: DistanceMeasure.HammingDistance,
    compareDistanceMeasuresData: [],
    ensemble: 0,
    cluster: 0,
    clusterPlanIds: [],
    districtPlanIds: [],
    ensembleDetails: [],
    clusterDetails: [],
    comparedPlan: {} as DistrictPlanData,
    plotOptions: {
      demographic: Demographics.AfroAmerican,
      population: 5,
      comparison: true,
    },
  },
];

const GlobalContext = createContext<{
  state: GlobalState[];
  dispatch: React.Dispatch<any>;
}>({
  state: intialState,
  dispatch: () => null,
});
interface Props {
  children: React.ReactNode;
}

const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, intialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
