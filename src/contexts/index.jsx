import {
  useState,
  useEffect,
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
} from "react";
import { cloneJson } from "@/utils";
import * as dialog from "./dialog";
import * as example from "./example";
import * as storage from "./storage";

const config = {
  example,
  dialog,
  storage,
};

/**
 * 解析 config module
 * @param {typeof config} modules
 * @returns {StoreModules}
 */
const resolveModules = function (modules) {
  /** @type {StoreModules} */
  const store = cloneJson({ state: {}, getters: {}, actions: {} });
  for (const key in modules) {
    const module = modules[key];
    store.state[key] = module.state;
    store.getters[key] = module.getters;
    store.actions[key] = module.actions;
  }
  return store;
};

const GlobalContext = createContext(null);

/**
 * @returns {Store}
 * @example
```jsx
import useStore example from "@/contexts";
import { DispatchType } from "@/enums";

function Component ({ id, params }) {
  const { state, getters, actions } = useStore();
  return (
    <button
      type="button"
      onClick={() => actions(DispatchType.SET_EXAMPLE_COLLECTION, { ...params, id: getters.example.exampleList })}
    >
      {state.example.collection[id].text}
    </button>
  );
}
```
 *
 */
export const useStore = () => useContext(GlobalContext);

const {
  state: storeState,
  getters: storeGetters,
  actions: storeActions,
} = resolveModules(config);

/**
 * 取得 scope state
 * @param {string} name
 * @returns {*}
 */
const getState = function (name) {
  for (const key in storeState) {
    if (key === name) {
      return storeState[key];
    }
  }
  return storeState;
};

/**
 * 取得更新後的 getters
 * @param {StoreGetters} getters
 * @param {string} name
 * @return {StoreGetters}
 */
const getGetters = function (getters, name) {
  /** @type {StoreModuleGetters} */
  const getterModule = storeGetters[name];
  if (getterModule) {
    if (!getters[name]) getters[name] = {};
    for (const key in getterModule) {
      const getter = getterModule[key];
      if (getter) {
        getters[name][key] = getter(storeState[name]);
      }
    }
  }
  return getters;
};

/**
 * @param {StoreStateModules<typeof config>} rootState
 * @param {DispatchParam<typeof config>} params
 * @returns {StoreStateModules<typeof config>}
 */
export default function reducer(rootState, params) {
  const { type, dispatch, payload, resolve, reject, getters, updateGetters } =
    params;
  let hasAction = false;
  for (const key in storeActions) {
    const state = getState(key);
    /** @type {StoreModuleActions} */
    const actionModule = storeActions[key];
    if (!actionModule) continue;
    const action = actionModule[type];
    if (action) {
      hasAction = true;
      const store = { state, rootState, dispatch, getters };
      action(store, payload).then(resolve).catch(reject);
      updateGetters(key);
      break;
    }
  }
  if (!hasAction) {
    console.warn(`The ${type} is not an action function.`);
  }
  return {
    ...rootState,
  };
}

/**
 * @returns {Store}
 */
const useContextStore = function () {
  const [state, setState] = useReducer(reducer, storeState);
  const [getters, setGetters] = useState(() => {
    /** @type {StoreGetters} */
    const data = cloneJson({});
    for (const key in storeGetters) {
      getGetters(data, key);
    }
    return data;
  });
  const updateGetters = useCallback(
    (name) => setGetters(getGetters(getters, name)),
    [getters]
  );
  /** @type {StoreDispatch} */
  const dispatch = useCallback(
    (type, payload) => {
      return new Promise((resolve, reject) => {
        setState({
          type,
          state,
          dispatch,
          payload,
          resolve,
          reject,
          getters,
          updateGetters,
        });
      });
    },
    [state, setState, getters, updateGetters]
  );
  return { state, getters, dispatch };
};

/**
 * @typedef {Object} ProviderProps
 * @property {JSX.Element} children
 * @property {(store: Store) => void} [onStateChange]
 * @property {(store: Store) => void} [onDidMount]
 * @property {(store: Store) => void} [onDidUpdate]
 */
/**
 * @param {ProviderProps} props
 * @returns {JSX.Element}
 */
export function Provider(props) {
  const { children, onStateChange, onDidMount, onDidUpdate } = props;
  const [isMounted, setMountState] = useState(false);
  const { state, getters, dispatch } = useContextStore();
  const store = useMemo(
    () => ({ state, getters, dispatch }),
    [state, getters, dispatch]
  );
  useEffect(() => {
    if (isMounted) {
      if (onDidUpdate) onDidUpdate(store);
    } else {
      if (onDidMount) onDidMount(store);
      setMountState(true);
    }
    if (onStateChange) onStateChange(store);
  }, [isMounted, onDidMount, onDidUpdate, onStateChange, setMountState, store]);
  return (
    <GlobalContext.Provider value={{ state, getters, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
