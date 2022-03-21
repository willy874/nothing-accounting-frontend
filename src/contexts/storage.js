import {
  DispatchType
} from "@/enums"

const local = {}
const session = {}

/**
 * @type {StorageState}
 */
export const state = {
  local: {
    keys: new Set(Object.keys(local)),
    storage: window.localStorage
  },
  session: {
    keys: new Set(Object.keys(session)),
    storage: window.sessionStorage
  }
}

/**
 * @type {Record<string,(state: StorageState) => unknown>}
 */
export const getters = {
  /**
   * @param {StorageState} state 
   * @returns {typeof local}
   */
  local(state) {
    for (const iterator of state.local.keys) {
      if (Object.hasOwnProperty.call(local, iterator)) {
        local[iterator] = state.local.storage.getItem(iterator)
      }
    }
    return local
  },
  /**
   * @param {StorageState} state 
   * @returns {typeof local}
   */
  session(state) {
    for (const iterator of state.session.keys) {
      if (Object.hasOwnProperty.call(session, iterator)) {
        session[iterator] = state.session.storage.getItem(iterator)
      }
    }
    return session
  }
}

/**
 * @type {{ [key: DispatchType]: StoreAction<StorageState,unknown,unknown> }}
 */
export const actions = {
  /** @type {StoreAction<StorageState,StoragePayload,void>}*/
  async [DispatchType.SET_LOCAL_STORAGE](store, payload) {
    if (Object.hasOwnProperty.call(store.state.local, payload.key)) {
      local[payload.key] = payload.value
      state.local.storage.setItem(payload.key, payload.value)
    }
  },
  /** @type {StoreAction<StorageState,StoragePayload,void>}*/
  async [DispatchType.REMOVE_LOCAL_STORAGE](store, payload) {
    if (Object.hasOwnProperty.call(store.state.local, payload.key)) {
      delete local[payload.key]
      state.local.storage.remove(payload.key)
    }
  },
  /** @type {StoreAction<StorageState,StoragePayload,void>}*/
  async [DispatchType.ADD_LOCAL_STORAGE_KEY](store, payload) {
    if (!local.keys.has(payload.key)) {
      store.state.local.keys.add(payload.key)
    }
  },
  /** @type {StoreAction<StorageState,StoragePayload,void>}*/
  async [DispatchType.DELETE_LOCAL_STORAGE_KEY](store, payload) {
    if (store.state.local.keys.has(payload.key)) {
      store.state.local.keys.delete(payload.key)
    }
  },
  /** @type {StoreAction<StorageState,StoragePayload,void>}*/
  async [DispatchType.SET_SESSION_STORAGE](store, payload) {
    if (Object.hasOwnProperty.call(store.state.session, payload.key)) {
      session[payload.key] = payload.value
      state.session.storage.setItem(payload.key, payload.value)
    }
  },
  /** @type {StoreAction<StorageState,StoragePayload,void>}*/
  async [DispatchType.REMOVE_SESSION_STORAGE](store, payload) {
    if (Object.hasOwnProperty.call(store.state.session, payload.key)) {
      delete store.state.session[payload.key]
      state.session.storage.remove(payload.key)
    }
  },
  /** @type {StoreAction<StorageState,StoragePayload,void>}*/
  async [DispatchType.ADD_SESSION_STORAGE_KEY](store, payload) {
    if (!store.state.session.keys.has(payload.key)) {
      store.state.session.keys.add(payload.key)
    }
  },
  /** @type {StoreAction<StorageState,StoragePayload,void>}*/
  async [DispatchType.DELETE_SESSION_STORAGE_KEY](store, payload) {
    if (store.state.session.keys.has(payload.key)) {
      store.state.session.keys.delete(payload.key)
    }
  },
}