import { useContext, createContext, useReducer, useEffect, useCallback, useState } from "react";
import { defineTypeClone } from "@/utils";
import * as dialog from "./dialog";
import * as example from "./example";

const config = {
  example,
  dialog,
}



/**
 * @param {typeof config} modules
 * @returns {StoreModules}
 */
const resolveModules = function (modules) {
  /** @type {StoreModules} */
  const store = defineTypeClone({ state: {}, getters: {}, actions: {} });
  for (const key in modules) {
    const module = modules[key];
    store.state[key] = module.state;
    store.getters[key] = module.getters;
    store.actions[key] = module.actions
  }
  return store
}

const GlobalContext = createContext(null);

/**
 * @returns {Store}
 */
export const useStore = () => useContext(GlobalContext);

const {
  state: storeState,
  getters: storeGetters,
  actions: storeActions
} = resolveModules(config);


const getState = function (name) {
  for (const key in storeState) {
    if (key === name) {
      return storeState[key]; 
    }
  }
}

/**
 * @param {StoreGetters} getters
 * @param {string} name
 * @return {StoreGetters}
 */
const getGetters = function (getters ,name) {
  /** @type {StoreModuleGetters} */
  const getterModule = storeGetters[name]
  if (getterModule) {
    if (!getters[name]) getters[name] = {} 
    for (const key in getterModule) {
      const getter = getterModule[key]
      if (getter) {
        getters[name][key] = getter(storeState[name])
      }
    } 
  }
  return getters
}

/**
 * @param {StoreStateModules<typeof config>} rootState 
 * @param {DispatchParam<typeof config>} params 
 * @returns {StoreStateModules<typeof config>} 
 */
export default function reducer(rootState, params) {
  const {
    type, dispatch, payload, resolve, reject, getters, updateGetters
  } = params
  let hasAction = false
  for (const key in storeActions) {
    const state = getState(key)
    /** @type {StoreModuleActions} */
    const actionModule = storeActions[key]
    const action = actionModule[type]
    if (action) {
      const store = {
        state,
        rootState,
        dispatch,
        getters
      }
      hasAction = true
      action(store, payload).then(resolve).catch(reject)
      updateGetters(key)
      break
    }
  }
  if (!hasAction) { 
    console.warn(`The ${type} is not an action function.`);
  }  
  return {
    ...rootState
  };
};


/**
 * @returns {Store}
 */
const useStoreBase = function () {
  const [state, setState] = useReducer(reducer, storeState)
  const [getters, setGetters] = useState(() => {
    /** @type {StoreGetters} */
    const data = defineTypeClone({})
    for (const key in storeGetters) {
      getGetters(data, key)
    }
    return data 
  })
  const updateGetters = useCallback((name) => setGetters(getGetters(getters, name)), [getters])
  /** @type {StoreDispatch} */
  const dispatch = useCallback((type, payload) => {
    return new Promise((resolve, reject) => {
      setState({ type, state, dispatch, payload, resolve, reject, getters, updateGetters })
    })
  }, [state, setState, getters, updateGetters])
  return { state, getters ,dispatch }
}

/**
 * @typedef {Object} ProviderProps
 * @property {JSX.Element} children 
 * @property {(store: Store) => void} [onStateChange] 
 */
/**
 * @param {ProviderProps} props 
 * @returns {JSX.Element} 
 */
export function Provider(props) {
  const { children, onStateChange } = props
  const { state, getters, dispatch } = useStoreBase()
  useEffect(() => {
    console.log('state', state);
    console.log('getters', getters);
    if (onStateChange) {
      onStateChange({ state, getters, dispatch })
    }
  }, [state, getters, dispatch, onStateChange]);
  return (
    <GlobalContext.Provider value={{ state, getters, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
