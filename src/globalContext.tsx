import React, {
  FC,
  Reducer,
  createContext,
  useContext,
  useReducer,
} from "react";

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
  num_clusters: number;
  avg_dist_clusters: number;
  num_dist_plans: number;
}

export enum AvailableStates {
  Nevada = "NEVADA",
  Texas = "TEXAS",
  Virginia = "VIRGINIA",
  Unselected = "UNSELECTED",
}

export enum GlobalTypes {
  DistrictMap = "DISTRICT_MAP",
  StateMap = "STATE_MAP",
  ChangeState = "CHANGE_STATE",
  DistanceMeasure = "DISTANCE_MEASURE",
  StepChange = "STEP_CHANGE",
  PageChange = "PAGE_CHANGE",
  SetEnsemble = "SET_ENSEMBLE",
  SetCluster = "SET_CLUSTER",
  AddEnsembleDetail = "ADD_ENS_DETAIL",
}

export type GlobalState = {
  dismap: boolean;
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
};

type GlobalStatePayload = {
  [GlobalTypes.DistrictMap]: {
    dismap: boolean;
  };
  [GlobalTypes.StateMap]: {
    dismap: boolean;
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
};

export type GlobalStateActions =
  ActionMap<GlobalStatePayload>[keyof ActionMap<GlobalStatePayload>];

const mainReducer = (
  state: GlobalState[],
  action: GlobalStateActions
): GlobalState[] => {
  console.log("ACTION TYPE", action.type)
  switch (action.type) {
    case GlobalTypes.StateMap:
      return [
        ...state,
        {
          dismap: false,
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
        },
      ];
    case GlobalTypes.DistrictMap:
      return [
        ...state,
        {
          dismap: true,
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
        },
      ];
    case GlobalTypes.StepChange:
      return [
        ...state,
        {
          dismap: state[state.length - 1].dismap,
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
        },
      ];
    case GlobalTypes.ChangeState:
      return [
        ...state,
        {
          dismap: state[state.length - 1].dismap,
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
        },
      ];
    case GlobalTypes.DistanceMeasure:
      return [
        ...state,
        {
          dismap: state[state.length - 1].dismap,
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
        },
      ];
    case GlobalTypes.PageChange:
      return [
        ...state,
        {
          dismap: state[state.length - 1].dismap,
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
        },
      ];
    case GlobalTypes.SetEnsemble:
      return [
        ...state,
        {
          dismap: state[state.length - 1].dismap,
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
        },
      ];
    case GlobalTypes.SetCluster:
      return [
        ...state,
        {
          dismap: state[state.length - 1].dismap,
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
        },
      ];
    case GlobalTypes.AddEnsembleDetail:
      console.log("Adding the deets");
      let newDetails = state[state.length - 1].ensembleDetails;
      if (newDetails.length > 3) {
        newDetails.shift()
      }
      if(!newDetails.includes(action.payload.EnsembleData))newDetails.push(action.payload.EnsembleData);
      return [
        ...state,
        {
          dismap: state[state.length - 1].dismap,
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
        },
      ];
    default:
      return state;
  }
};

const intialState: GlobalState[] = [
  {
    dismap: false,
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
