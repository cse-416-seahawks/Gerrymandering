import React, {
  FC,
  Reducer,
  createContext,
  useContext,
  useReducer,
} from "react";
import { DistrictPlanData } from "./components/interfaces/AnalysisInterface";
import { MapData, StateMapData, StateDistrictPlanType } from "./components/interfaces/MapInterface";

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

export interface EnsembleData {
  ensemble: number;
  ensemble_id : string;
  num_clusters: number;
  avg_dist_clusters: number;
  num_dist_plans: number;
}



export enum InfoCardType {
  ensembleInfo = "Ensemble Info",
  associationDetail = "Ensemble Size Association",
  distanceMeasure = "Distance Measure",
  clusterPlotOptions = "Cluster Scatter Plot Options",
  clusterSummary = "Cluster Summary",
  clusterDetails = "Cluster Details"
}

export enum AvailableStates {
  Nevada = "NEVADA",
  Texas = "TEXAS",
  Virginia = "VIRGINIA",
  Unselected = "UNSELECTED",
}

export enum GlobalTypes {
  ChangeCard = "CHANGE_INFO_CARD",
  ChangeState = "CHANGE_STATE",
  DistanceMeasure = "DISTANCE_MEASURE",
  StepChange = "STEP_CHANGE",
  PageChange = "PAGE_CHANGE",
  SetEnsemble = "SET_ENSEMBLE",
  SetCluster = "SET_CLUSTER",
  AddEnsembleDetail = "ADD_ENS_DETAIL",
  UpdateEnsembleDetail = "UPDATE_ENS_DETAIL",
  SetClusterDetails = "SET_CLUSTER_DETAILS",
  SetMapData = "SET_MAP_DATA",
}

export type GlobalState = {
  mapData: MapData;
  districtPlanTypes: StateDistrictPlanType,
  currentInfoCard: InfoCardType;
  distanceMeasure: string;
  currentState: AvailableStates;
  step: number;
  clusterAnalysis: boolean;
  ensemble: number;
  ensembleId: string;
  cluster: number;
  clusterId: string;
  districtPlanIds: Array<string>;
  ensembleDetails: Array<EnsembleData>;
  clusterDetails: Array<DistrictPlanData>;
};

type GlobalStatePayload = {
  [GlobalTypes.SetMapData]: {
    mapData: MapData,
    districtPlanTypes: StateDistrictPlanType
  };
  [GlobalTypes.ChangeCard]: {
    infoCardType: InfoCardType
  };
  [GlobalTypes.ChangeState]: {
    currentState: AvailableStates;
  };
  [GlobalTypes.DistanceMeasure]: {
    distanceMeasure: string;
  };
  [GlobalTypes.StepChange]: {
    step: number;
  };
  [GlobalTypes.PageChange]: {
    clusterAnalysis: boolean;
  };
  [GlobalTypes.SetEnsemble]: {
    ensemble: number;
    ensembleId: string;
  };
  [GlobalTypes.SetCluster]: {
    cluster: number;
    clusterId: string;
    districtPlanIds: Array<string>;
  };
  [GlobalTypes.AddEnsembleDetail]: {
    EnsembleData: EnsembleData;
  };
  [GlobalTypes.UpdateEnsembleDetail]: {
    EnsembleData: EnsembleData[];
  };
  [GlobalTypes.SetClusterDetails]: {
    clusterDetails: Array<DistrictPlanData>; 
  }
};

export type GlobalStateActions =
  ActionMap<GlobalStatePayload>[keyof ActionMap<GlobalStatePayload>];

const mainReducer = (
  state: GlobalState[],
  action: GlobalStateActions
): GlobalState[] => {
  console.log("Action Type: ", action.type);
  switch (action.type) {
    case GlobalTypes.SetMapData:
      return [
        ...state,
        {
          mapData: action.payload.mapData,
          districtPlanTypes: action.payload.districtPlanTypes,
          currentInfoCard: state[state.length - 1].currentInfoCard,
          distanceMeasure: state[state.length - 1].distanceMeasure,
          step: state[state.length - 1].step,
          currentState: state[state.length - 1].currentState,
          clusterAnalysis: state[state.length - 1].clusterAnalysis,
          ensemble: state[state.length - 1].ensemble,
          ensembleId: state[state.length - 1].ensembleId,
          cluster: state[state.length - 1].cluster,
          clusterId: state[state.length - 1].clusterId,
          districtPlanIds: state[state.length - 1].districtPlanIds,
          ensembleDetails: state[state.length - 1].ensembleDetails,
          clusterDetails: state[state.length - 1].clusterDetails,
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
          step: state[state.length - 1].step,
          currentState: state[state.length - 1].currentState,
          clusterAnalysis: state[state.length - 1].clusterAnalysis,
          ensemble: state[state.length - 1].ensemble,
          ensembleId: state[state.length - 1].ensembleId,
          cluster: state[state.length - 1].cluster,
          clusterId: state[state.length - 1].clusterId,
          districtPlanIds: state[state.length - 1].districtPlanIds,
          ensembleDetails: state[state.length - 1].ensembleDetails,
          clusterDetails: state[state.length - 1].clusterDetails,
        },
      ];
    case GlobalTypes.StepChange:
      return [
        ...state,
        {
          mapData: state[state.length - 1].mapData,
          districtPlanTypes: state[state.length - 1].districtPlanTypes,
          currentInfoCard : state[state.length - 1].currentInfoCard,
          distanceMeasure: state[state.length - 1].distanceMeasure,
          step: action.payload.step,
          currentState: state[state.length - 1].currentState,
          clusterAnalysis: state[state.length - 1].clusterAnalysis,
          ensemble: state[state.length - 1].ensemble,
          ensembleId: state[state.length - 1].ensembleId,
          cluster: state[state.length - 1].cluster,
          clusterId: state[state.length - 1].clusterId,
          districtPlanIds: state[state.length - 1].districtPlanIds,
          ensembleDetails: state[state.length - 1].ensembleDetails,
          clusterDetails: state[state.length - 1].clusterDetails,
        },
      ];
    case GlobalTypes.ChangeState:
      return [
        ...state,
        {
          mapData: state[state.length - 1].mapData,
          districtPlanTypes: state[state.length - 1].districtPlanTypes,
          currentInfoCard : state[state.length - 1].currentInfoCard,
          distanceMeasure: state[state.length - 1].distanceMeasure,
          step: state[state.length - 1].step,
          currentState: action.payload.currentState,
          clusterAnalysis: state[state.length - 1].clusterAnalysis,
          ensemble: state[state.length - 1].ensemble,
          ensembleId: state[state.length - 1].ensembleId,
          cluster: state[state.length - 1].cluster,
          clusterId: state[state.length - 1].clusterId,
          districtPlanIds: state[state.length - 1].districtPlanIds,
          ensembleDetails: state[state.length - 1].ensembleDetails,
          clusterDetails: state[state.length - 1].clusterDetails,
        },
      ];
    case GlobalTypes.DistanceMeasure:
      return [
        ...state,
        {
          mapData: state[state.length - 1].mapData,
          districtPlanTypes: state[state.length - 1].districtPlanTypes,
          currentInfoCard : state[state.length - 1].currentInfoCard,
          distanceMeasure: action.payload.distanceMeasure,
          step: state[state.length - 1].step,
          currentState: state[state.length - 1].currentState,
          clusterAnalysis: state[state.length - 1].clusterAnalysis,
          ensemble: state[state.length - 1].ensemble,
          ensembleId: state[state.length - 1].ensembleId,
          cluster: state[state.length - 1].cluster,
          clusterId: state[state.length - 1].clusterId,
          districtPlanIds: state[state.length - 1].districtPlanIds,
          ensembleDetails: state[state.length - 1].ensembleDetails,
          clusterDetails: state[state.length - 1].clusterDetails,
        },
      ];
    case GlobalTypes.PageChange:
      return [
        ...state,
        {
          mapData: state[state.length - 1].mapData,
          districtPlanTypes: state[state.length - 1].districtPlanTypes,
          currentInfoCard : state[state.length - 1].currentInfoCard,
          distanceMeasure: state[state.length - 1].distanceMeasure,
          step: state[state.length - 1].step,
          currentState: state[state.length - 1].currentState,
          clusterAnalysis: action.payload.clusterAnalysis,
          ensemble: state[state.length - 1].ensemble,
          ensembleId: state[state.length - 1].ensembleId,
          cluster: state[state.length - 1].cluster,
          clusterId: state[state.length - 1].clusterId,
          districtPlanIds: state[state.length - 1].districtPlanIds,
          ensembleDetails: state[state.length - 1].ensembleDetails,
          clusterDetails: state[state.length - 1].clusterDetails,
        },
      ];
    case GlobalTypes.SetEnsemble:
      return [
        ...state,
        {
          mapData: state[state.length - 1].mapData,
          districtPlanTypes: state[state.length - 1].districtPlanTypes,
          currentInfoCard : state[state.length - 1].currentInfoCard,
          distanceMeasure: state[state.length - 1].distanceMeasure,
          step: state[state.length - 1].step,
          currentState: state[state.length - 1].currentState,
          clusterAnalysis: state[state.length - 1].clusterAnalysis,
          ensemble: action.payload.ensemble,
          ensembleId: action.payload.ensembleId,
          cluster: state[state.length - 1].cluster,
          clusterId: state[state.length - 1].clusterId,
          districtPlanIds: state[state.length - 1].districtPlanIds,
          ensembleDetails: state[state.length - 1].ensembleDetails,
          clusterDetails: state[state.length - 1].clusterDetails,
        },
      ];
    case GlobalTypes.SetCluster:
      return [
        ...state,
        {
          mapData: state[state.length - 1].mapData,
          districtPlanTypes: state[state.length - 1].districtPlanTypes,
          currentInfoCard : state[state.length - 1].currentInfoCard,
          distanceMeasure: state[state.length - 1].distanceMeasure,
          step: state[state.length - 1].step,
          currentState: state[state.length - 1].currentState,
          clusterAnalysis: state[state.length - 1].clusterAnalysis,
          ensemble: state[state.length - 1].ensemble,
          ensembleId: state[state.length - 1].ensembleId,
          cluster: action.payload.cluster,
          clusterId: action.payload.clusterId,
          districtPlanIds: action.payload.districtPlanIds,
          ensembleDetails: state[state.length - 1].ensembleDetails,
          clusterDetails: state[state.length - 1].clusterDetails,
        },
      ];
    case GlobalTypes.AddEnsembleDetail:
      let newDetails = state[state.length - 1].ensembleDetails;
      if (newDetails.length > 3) {
        newDetails.shift()
      }
      if(!newDetails.includes(action.payload.EnsembleData))newDetails.push(action.payload.EnsembleData);
      return [
        ...state,
        {
          mapData: state[state.length - 1].mapData,
          districtPlanTypes: state[state.length - 1].districtPlanTypes,
          currentInfoCard : state[state.length - 1].currentInfoCard,
          distanceMeasure: state[state.length - 1].distanceMeasure,
          step: state[state.length - 1].step,
          currentState: state[state.length - 1].currentState,
          clusterAnalysis: state[state.length - 1].clusterAnalysis,
          ensemble: state[state.length - 1].ensemble,
          ensembleId: state[state.length - 1].ensembleId,
          cluster: state[state.length - 1].cluster,
          clusterId: state[state.length - 1].clusterId,
          districtPlanIds: state[state.length - 1].districtPlanIds,
          ensembleDetails: newDetails,
          clusterDetails: state[state.length - 1].clusterDetails,
        },
      ];
    case GlobalTypes.UpdateEnsembleDetail:
     return [
        ...state,
        {
          mapData: state[state.length - 1].mapData,
          districtPlanTypes: state[state.length - 1].districtPlanTypes,
          currentInfoCard : state[state.length - 1].currentInfoCard,
          distanceMeasure: state[state.length - 1].distanceMeasure,
          step: state[state.length - 1].step,
          currentState: state[state.length - 1].currentState,
          clusterAnalysis: state[state.length - 1].clusterAnalysis,
          ensemble: state[state.length - 1].ensemble,
          ensembleId: state[state.length - 1].ensembleId,
          cluster: state[state.length - 1].cluster,
          clusterId: state[state.length - 1].clusterId,
          districtPlanIds: state[state.length - 1].districtPlanIds,
          ensembleDetails: action.payload.EnsembleData,
          clusterDetails: state[state.length - 1].clusterDetails,
        },
      ];
    case GlobalTypes.SetClusterDetails:
      return [
          ...state,
          {
            mapData: state[state.length - 1].mapData,
            districtPlanTypes: state[state.length - 1].districtPlanTypes,
            currentInfoCard : state[state.length - 1].currentInfoCard,
            distanceMeasure: state[state.length - 1].distanceMeasure,
            step: state[state.length - 1].step,
            currentState: state[state.length - 1].currentState,
            clusterAnalysis: state[state.length - 1].clusterAnalysis,
            ensemble: state[state.length - 1].ensemble,
            ensembleId: state[state.length - 1].ensembleId,
            cluster: state[state.length - 1].cluster,
            clusterId: state[state.length - 1].clusterId,
            districtPlanIds: state[state.length - 1].districtPlanIds,
            ensembleDetails: state[state.length - 1].ensembleDetails,
            clusterDetails: action.payload.clusterDetails,
          },
        ];
    default:
      return state;
  }
};

const intialState: GlobalState[] = [
  {
    mapData: {},
    districtPlanTypes: {},
    currentInfoCard : InfoCardType.ensembleInfo,
    distanceMeasure: "Hamming Distance",
    step: 0,
    currentState: AvailableStates.Unselected,
    clusterAnalysis: true,
    ensemble: 0,
    ensembleId: "",
    cluster: 0,
    clusterId: "",
    districtPlanIds: [],
    ensembleDetails: [],
    clusterDetails: [],
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
