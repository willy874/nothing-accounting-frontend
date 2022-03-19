import {
  DispatchType
} from "@/enums"
import {
  isEmpty
} from "@/utils"

/**
 * @type {ExampleState}
 */
export const state = {
  collection: {},
}

export const getters = {
  exampleList(state) {
    const list = []
    for (const key in state.collection) {
      const value = state.collection[key]
      if (value) {
        list.push(value)
      }
    }
    return list
  }
}

/**
 * @type {{ [key: DispatchType]: StoreAction<ExampleState,unknown,unknown> }}
 */
export const actions = {
  /** @type {StoreAction<ExampleState,ExampleModel,void>}*/
  async [DispatchType.SET_EXAMPLE_COLLECTION](store, payload) {
    const model = payload
    if (model && !isEmpty(model.id)) {
      if (store.state.collection[model.id]) {
        // update
      } else {
        // insert
      }
      store.state.collection[model.id] = model
    }
  },
  /** @type {StoreAction<ExampleState,number,void>}*/
  async [DispatchType.DELETE_EXAMPLE_COLLECTION](store, payload) {
    const id = payload
    if (!isEmpty(id)) {
      const model = store.state.collection[id]
      if (model) {
        delete store.state.collection[id]
      } else {
        // is empty
      }
    }
  }
}