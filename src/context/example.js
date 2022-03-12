import {
  isEmpty
} from "@/utils"

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
 * @param {Store} store
 * @param {UpdatePayload} payload
 * @return {Promise<void>}
 */
export async function setExampleCollection(store, payload) {
  const {
    model,
    callback
  } = payload
  console.log(model);
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
 * @param {Store} store
 * @param {DeletePayload} payload
 * @return {Promise<void>}
 */
export async function deleteExampleCollection(store, payload) {
  const {
    id,
    callback
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