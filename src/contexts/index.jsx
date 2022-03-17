import { useContext, createContext, useReducer, useEffect } from "react";
import reducer from './reducer'
import {
  example,
} from "./example";

const GlobalContext = createContext(null);

/** @type {StoreState} */
const storeState = {
  example,
};

/**
 * @returns {Store}
 */
export const useStore = () => useContext(GlobalContext);

/**
 * @typedef {Object} ProviderProps
 * @property {JSX.Element} children 
 * @property {(state: StoreState, dispatch: StoreAction) => void} [onStateChange] 
 */
/**
 * @param {ProviderProps} props 
 * @returns {JSX.Element} 
 */
export function Provider(props) {
  const { children, onStateChange } = props
  const [state, dispatchState] = useReducer(reducer, storeState);
  /** @type {StoreAction} */
  const dispatch = (type, payload) => dispatchState({ type, payload, dispatchState })
  useEffect(() => {
    console.log(state);
    if (onStateChange) {
      onStateChange(state, dispatch)
    } 
  }, [state, onStateChange]);
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
