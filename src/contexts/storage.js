import {
  DispatchType
} from "@/enums"
import {
  cloneJson
} from "@/utils"
import {
  StorageKey
} from "@/enums"

let init = true

const defaultStorage = {
  [StorageKey.TOKEN]: ''
}

/**
 * @type {StorageState}
 */
export const state = {
  keys: new Set(Object.keys(defaultStorage)),
  storage: null,
  value: cloneJson(defaultStorage)
}

/**
 * @type {Record<string,(state: StorageState) => unknown>}
 */
export const getters = {
  /**
   * @param {StorageState} state 
   * @returns {typeof defaultStorage | {}}
   */
  value(state) {
    if (init) {
      init = false
    }
    if (state.storage) {
      for (const iterator of state.keys) {
        if (Object.hasOwnProperty.call(state.value, iterator)) {
          const value = state.storage.getItem(iterator)
          state.value[iterator] = init ? (value || defaultStorage[iterator]) : value
        }
      }
      return state.value
    }
    return {}
  },
}

/**
 * @type {{ [key: DispatchType]: StoreAction<StorageState,unknown,unknown> }}
 */
export const actions = {
  /** @type {StoreAction<StorageState,(value: StorageState) => StorageState,void>}*/
  async [DispatchType.SET_STORAGE_SETTING](store, payload) {
    const result = payload(store.state)
    if (result === store.state) {
      store.state.storage = result.storage
      store.state.keys = result.keys
    }
  },
  /** @type {StoreAction<StorageState,StoragePayload,void>}*/
  async [DispatchType.SET_STORAGE](store, payload) {
    const storage = payload.storage || store.state.storage
    if (storage && store.state.keys.has(payload.key)) {
      store.state.value[payload.key] = payload.value
      storage.setItem(payload.key, payload.value)
    }
  },
  /** @type {StoreAction<StorageState,StoragePayload,void>}*/
  async [DispatchType.REMOVE_STORAGE](store, payload) {
    const storage = payload.storage || store.state.storage
    if (storage && store.state.keys.has(payload.key)) {
      delete state.value[payload.key]
      storage.removeItem(payload.key)
    }
  },
}