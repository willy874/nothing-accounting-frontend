import {
  exampleReducer,
} from "./example";

/**
 * @param {StoreState} state 
 * @param {DispatchParam} action 
 * @returns 
 */
export default function reducer(state, action) {
  const {
    dispatchState
  } = action
  /** @type {DispatchStore<StoreState>}*/
  const store = {
    state,
    rootState: state,
    dispatch: (type, payload) => action.dispatchState({
      type,
      payload,
      dispatchState
    })
  };
  switch (true) {
    case exampleReducer(action.type, store, action.payload):
      break;
    default:
      console.warn(`The ${action.type} is not an action function.`);
      break;
  }
  return {
    ...state
  };
};