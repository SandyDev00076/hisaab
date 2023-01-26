import { createContext, useContext, useReducer } from "react";

interface LoadingState {
  loading: boolean;
}

interface LoadingProviderProps {
  children: React.ReactNode;
}

type Action = { type: "start" } | { type: "stop" };
type Dispatch = (action: Action) => void;

function loadingReducer(_state: LoadingState, action: Action): LoadingState {
  switch (action.type) {
    case "start":
      return { loading: true };
    case "stop":
      return { loading: false };
  }
}

const LoadingContext = createContext<
  | {
      state: LoadingState;
      dispatch: Dispatch;
    }
  | undefined
>(undefined);

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [state, dispatch] = useReducer(loadingReducer, { loading: false });
  const value = { state, dispatch };
  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("Please use useLoading inside LoadingProvider");
  }
  return context;
};

export const showLoading = (dispatch: Dispatch) => dispatch({ type: "start" });
export const hideLoading = (dispatch: Dispatch) => dispatch({ type: "stop" });
