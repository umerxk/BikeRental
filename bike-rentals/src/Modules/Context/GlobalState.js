import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  user: {},
  sideBarAction: ""
};

export const GlobalContext = createContext(initialState);

//provider
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const setUser = (user) => {
    dispatch({ type: "SET_USER", payload: user });
  };

  const setSideBarAction = (sideBarAction) => {
    dispatch({ type: "SET_ACTION", payload: sideBarAction });
  }

  return (
    <GlobalContext.Provider
      value={{
        user: state.user,
        sideBarAction: state.sideBarAction,
        setUser,
        setSideBarAction
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
