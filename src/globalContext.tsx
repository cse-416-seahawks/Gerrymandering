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

export enum AvailableStates {
  Nevada = "NEVADA",
  Texas = "TEXAS",
  Virginia = "VIRGINIA"
}

export enum GlobalTypes {
  DistrictMap = "DISTRICT_MAP",
  StateMap = "STATE_MAP",
  ChangeState = "CHANGE_STATE",
  DistanceMeasure = "DISTANCE_MEASURE",
  StepChange = "STEP_CHANGE",
  PageChange = "PAGE_CHANGE",
  SetEnsemble = "SET_ENSEMBLE",
}

export type GlobalState = {
  dismap: boolean;
  distanceMeasure: string;
  currentState: AvailableStates;
  step: number;
  clusterAnalysis: boolean;
  ensemble: number;
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
  }
};

export type GlobalStateActions =
  ActionMap<GlobalStatePayload>[keyof ActionMap<GlobalStatePayload>];

const dismapReducer = (
  state: GlobalState[],
  action: GlobalStateActions
): GlobalState[] => {
  switch (action.type) {
    case GlobalTypes.StateMap:
      return [
        {
          dismap: false,
          distanceMeasure: state[state.length - 1].distanceMeasure,
          step: state[state.length - 1].step,
          currentState: state[state.length - 1].currentState,
          clusterAnalysis: state[state.length - 1].clusterAnalysis,
          ensemble: state[state.length - 1].ensemble,
        },
      ];
    case GlobalTypes.DistrictMap:
      return [
        {
          dismap: true,
          distanceMeasure: state[state.length - 1].distanceMeasure,
          step: state[state.length - 1].step,
          currentState: state[state.length - 1].currentState,
          clusterAnalysis: state[state.length - 1].clusterAnalysis,
          ensemble: state[state.length - 1].ensemble,
        },
      ];
    case GlobalTypes.StepChange:
      return [
        {
          dismap: state[state.length - 1].dismap,
          distanceMeasure: state[state.length - 1].distanceMeasure,
          step: action.payload.step,
          currentState: state[state.length - 1].currentState,
          clusterAnalysis: state[state.length - 1].clusterAnalysis,
          ensemble: state[state.length - 1].ensemble,
        },
      ];
    case GlobalTypes.ChangeState:
      return [
        {
          dismap: state[state.length - 1].dismap,
          distanceMeasure: state[state.length - 1].distanceMeasure,
          step: state[state.length - 1].step,
          currentState: action.payload.currentState,
          clusterAnalysis: state[state.length - 1].clusterAnalysis,
          ensemble: state[state.length - 1].ensemble,
        },
      ];
    case GlobalTypes.DistanceMeasure:
      return [
        {
          dismap: state[state.length - 1].dismap,
          distanceMeasure: action.payload.distanceMeasure,
          step: state[state.length - 1].step,
          currentState: state[state.length - 1].currentState,
          clusterAnalysis: state[state.length - 1].clusterAnalysis,
          ensemble: state[state.length - 1].ensemble,
        },
      ];
    case GlobalTypes.PageChange:
      return [
        {
          dismap: state[state.length - 1].dismap,
          distanceMeasure: state[state.length - 1].distanceMeasure,
          step: state[state.length - 1].step,
          currentState: state[state.length - 1].currentState,
          clusterAnalysis: action.payload.clusterAnalysis,
          ensemble: state[state.length - 1].ensemble,
        },
      ];
    case GlobalTypes.SetEnsemble:
      return [
        {
          dismap: state[state.length - 1].dismap,
          distanceMeasure: state[state.length - 1].distanceMeasure,
          step: state[state.length - 1].step,
          currentState: state[state.length - 1].currentState,
          clusterAnalysis: state[state.length - 1].clusterAnalysis,
          ensemble: action.payload.ensemble,
        },
      ];
    default:
      return state;
  }
};

const intialState: GlobalState[] = [
  {
    dismap: false,
    distanceMeasure: "hamming",
    step: 0,
    currentState: AvailableStates.Nevada,
    clusterAnalysis : true,
    ensemble: 0,
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
  const [state, dispatch] = useReducer(dismapReducer, intialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
