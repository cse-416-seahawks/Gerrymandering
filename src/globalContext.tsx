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

export enum States {
  Nevada = "Nevada",
  Texas = "Texas",
  Virginia = "Virginia",
}

export enum GlobalTypes {
  DistrictMap = "DISTRICT_MAP",
  StateMap = "STATE_MAP",
  ChangeState = "CHANGE_STATE",
  DistanceMeasure = "DISTANCE_MEASURE",
  StepChange = "STEP_CHANGE",
  PageChange = "PageChange",
}

export type GlobalState = {
  dismap: boolean;
  distanceMeasure: string;
  currentState: States;
  step: number;
  clusterAnalysis: boolean;
};

type GlobalStatePayload = {
  [GlobalTypes.DistrictMap]: {
    dismap: boolean;
  };
  [GlobalTypes.StateMap]: {
    dismap: boolean;
  };
  [GlobalTypes.ChangeState]: {
    currentState: States;
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
        ...state,
        {
          dismap: false,
          distanceMeasure: state[state.length - 1].distanceMeasure,
          step: state[state.length - 1].step,
          currentState: state[state.length - 1].currentState,
          clusterAnalysis: state[state.length - 1].clusterAnalysis,
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
    currentState: States.Nevada,
    clusterAnalysis : true
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