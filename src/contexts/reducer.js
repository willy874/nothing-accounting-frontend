import {
  setExampleCollection,
  deleteExampleCollection,
} from "./example";
import {
  ActionType
} from "@/enums"

export default function reducer(state, {
  type,
  payload,
  action
}) {
  const store = {
    state,
    action
  };
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
  return {
    ...state
  };
};