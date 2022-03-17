import {
  ActionType
} from "@/enums"
import {
  isEmpty
} from "@/utils"

/**
 * @typedef {Object} ExampleState
 * @property {{ [key: string]: ExampleModel }} collection
 * @property {() => ExampleModel[]} getList
 */
/**
 * @type {ExampleState}
 */
export const example = {
  collection: {},
  getList() {
    const list = []
    for (const key in this.collection) {
      const value = this.collection[key]
      if (value) {
        list.push(value)
      }
    }
    return list
  }
}

/**
 * @typedef {Object} UpdatePayload
 * @property {ExampleModel} model 
 * @property {ActionCallback<ExampleModel>} [callback]
 */
/**
 * @param {DispatchStore<ExampleState>} store
 * @param {UpdatePayload} payload
 * @return {Promise<void>}
 */
export async function setExampleCollection(store, payload) {
  const {
    model,
    callback
  } = payload
  if (model && !isEmpty(model.id)) {
    if (example.collection[model.id]) {
      // update
    } else {
      // insert
    }
    example.collection[model.id] = model
    if (callback) callback(model)
  }
}

/**
 * @typedef {Object} DeletePayload
 * @property {number} id 
 * @property {ActionCallback<ExampleModel>} callback 
 */
/**
 * @param {DispatchStore<ExampleState>} store
 * @param {DeletePayload} payload
 * @return {Promise<void>}
 */
export async function deleteExampleCollection(store, payload) {
  const {
    id,
    callback,
  } = payload
  if (!isEmpty(id)) {
    const model = example.collection[id]
    if (model) {
      delete example.collection[id]
    } else {
      // is empty
    }
    if (callback) callback(model)
  }
}

/**
 * @param {ActionType} type 
 * @param {DispatchStore<StoreState>} store 
 * @param {*} payload
 * @returns {boolean}
 */
export function exampleReducer(type, store, payload) {
  /** @type {DispatchStore<ExampleState>}*/
  const scopeStore = {
    ...store,
    state: example,
  }
  switch (type) {
    case ActionType.SET_EXAMPLE_COLLECTION:
      setExampleCollection(scopeStore, payload);
      break;
    case ActionType.DELETE_EXAMPLE_COLLECTION:
      deleteExampleCollection(scopeStore, payload);
      break;
    default:
      return false;
  }
  return true;
}