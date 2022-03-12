import { useContext, createContext, useReducer } from "react";
import { ActionType } from "@/enums";
import {
  example,
  setExampleCollection,
  deleteExampleCollection,
} from "./example";

export const Context = createContext();

/**
 * 很吃效能，僅慎使用。
 * @returns {Store}
 */
export const useStore = () => useContext(Context);

export function GlobalProvider({ children }) {
  /** @type {StoreState} */
  const storeState = {
    example,
  };
  const [state, action] = useReducer(reducer, storeState);
  return (
    <Context.Provider
      value={{
        state,
        action: (type, payload) => action({ type, payload, action }),
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const reducer = (state, { type, payload, action }) => {
  const store = { state, action };
  switch (type) {
    case ActionType.SET_EXAMPLE_COLLECTION:
      setExampleCollection(store, payload);
      break;
    case ActionType.DELETE_EXAMPLE_COLLECTION:
      deleteExampleCollection(store, payload);
      break;

    default:
      console.warn(`The ${type} is not an action function.`);
      break;
  }
  return { ...state };
};
