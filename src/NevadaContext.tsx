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

export enum Types {
  DistrictMap = "DISTRICT_MAP",
  StateMap = "STATE_MAP",
}

export type NevadaState = {
  dismap: boolean;
};

type NevadaStatePayload = {
  [Types.DistrictMap]: {
    dismap: boolean;
  };
  [Types.StateMap]: {
    dismap: boolean;
  };
};

export type NevadaStateActions =
  ActionMap<NevadaStatePayload>[keyof ActionMap<NevadaStatePayload>];

const dismapReducer = (state: NevadaState[], action: NevadaStateActions) => {
  console.log(state,action);
  switch (action.type) {
    case Types.StateMap:
      return [
        ...state,
        {
          dismap: false,
        },
      ];
    case Types.DistrictMap:
      console.log("CHANGING TO TRUE")
      return [
        ...state,
        {
          dismap: true,
        },
      ];
    default:
      return state;
  }
};

type InitialStateType = {
  nevadaState: NevadaState[];
};

const intialState: NevadaState[] = [
  {
    dismap: false,
  },
];

const NevadaDistrictContext = createContext<{
  state: NevadaState[];
  dispatch: React.Dispatch<any>;
}>({
  state: intialState,
  dispatch: () => null,
});
interface Props {
  children: React.ReactNode;
}

const NevadaDistrictProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(dismapReducer, [{ dismap: false }]);

  return (
    <NevadaDistrictContext.Provider value={{ state, dispatch }}>
      {children}
    </NevadaDistrictContext.Provider>
  );
};

export { NevadaDistrictContext, NevadaDistrictProvider };