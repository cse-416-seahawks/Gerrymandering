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

export enum GlobalTypes {
  DistrictMap = "DISTRICT_MAP",
  StateMap = "STATE_MAP",
  DistanceMeasure = "DISTANCE_MEASURE",
  StepChange = "STEP_CHANGE"
  
}

export type GlobalState = {
  dismap: boolean;
  distanceMeasure: string;
  step : number;
};

type GlobalStatePayload = {
  [GlobalTypes.DistrictMap]: {
    dismap: boolean;
  };
  [GlobalTypes.StateMap]: {
    dismap: boolean;
  };
  [GlobalTypes.DistanceMeasure]: {
    distanceMeasure: string,
  };
  [GlobalTypes.StepChange]: {
    step : number,
  }
  
};

export type GlobalStateActions =
  ActionMap<GlobalStatePayload>[keyof ActionMap<GlobalStatePayload>];

const dismapReducer = (state: GlobalState[], action: GlobalStateActions): GlobalState[] => {
  switch (action.type) {
    case GlobalTypes.StateMap:
      return [
        ...state,
        {
          dismap: false,
          distanceMeasure : state[state.length - 1].distanceMeasure,
          step : state[state.length - 1].step
        },
      ];
    case GlobalTypes.DistrictMap:
      return [
        ...state,
        {
          dismap: true,
          distanceMeasure : state[state.length - 1].distanceMeasure,
          step : state[state.length - 1].step
        },
      ];
    case GlobalTypes.StepChange:
      return [
        ...state,
        {
          dismap : state[state.length - 1].dismap,
          distanceMeasure: state[state.length - 1].distanceMeasure,
          step : action.payload.step
        }
      ];
    case GlobalTypes.DistanceMeasure:
      return [
        ...state,
        {
          dismap : state[state.length - 1].dismap,
          distanceMeasure: action.payload.distanceMeasure,
          step : state[state.length - 1].step
        }
      ]
    default:
      return state;
  }
};


const intialState: GlobalState[] = [
  {
    dismap: false,
    distanceMeasure: "hamming",
    step : 0
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
 