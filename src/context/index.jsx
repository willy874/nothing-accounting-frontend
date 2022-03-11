import { useContext, createContext, useReducer } from "react";
import { ActionType } from "@/enum";
import {
  account,
  updateAccountCollection,
  deleteAccountCollection,
} from "./account";

export const Context = createContext();

export const useStore = () => useContext(Context);

export function GlobalContext({ children }) {
  /** @type {StoreState} */
  const storeState = {
    account,
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
  /** @type {Store} */
  const store = { state, action };
  switch (type) {
    case ActionType.UPDATE_ACCOUNT_COLLECTION:
      updateAccountCollection(store, payload);
      break;
    case ActionType.DELETE_ACCOUNT_COLLECTION:
      deleteAccountCollection(store, payload);
      break;

    default:
      console.warn(`The ${type} is not an action function.`);
      break;
  }
  return { ...state };
};
