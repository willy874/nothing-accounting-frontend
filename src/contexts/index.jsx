import { useContext, createContext, useReducer } from "react";
import reducer from './reducer'
import {
  example,
} from "./example";

export const GlobalContext = createContext();

/**
 * 很吃效能，僅慎使用。
 * @returns {Store}
 */
export const useGlobalContext = () => useContext(GlobalContext);

export function GlobalProvider({ children }) {
  const storeState = {
    example,
  };
  const [state, action] = useReducer(reducer, storeState);
  return (
    <GlobalContext.Provider
      value={{
        state,
        action: (type, payload) => action({ type, payload, action }),
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}


export const ExampleContext = createContext();

/**
 * @returns {Store}
 */
export const useExampleContext = () => useContext(ExampleContext);

export function ExampleProvider({ children }) {
  const storeState = {
    example,
  };
  const [state, action] = useReducer(reducer, storeState);
  return (
    <ExampleContext.Provider
      value={{
        state,
        action: (type, payload) => action({ type, payload, action }),
      }}
    >
      {children}
    </ExampleContext.Provider>
  );
}
