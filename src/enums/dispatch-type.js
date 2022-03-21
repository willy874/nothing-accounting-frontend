const dispatchType = {
  /**
   * @type {import('@/contexts/example').actions} 
   */
  SET_EXAMPLE_COLLECTION: 'setExampleCollection',
  DELETE_EXAMPLE_COLLECTION: 'deleteExampleCollection',
  /**
   * @type {import('@/contexts/storage').actions} 
   */
  SET_LOCAL_STORAGE: 'setLocalStorage',
  REMOVE_LOCAL_STORAGE: 'removeLocalStorage',
  ADD_LOCAL_STORAGE_KEY: 'addLocalStorageKey',
  DELETE_LOCAL_STORAGE_KEY: 'deleteLocalStorageKey',
  SET_SESSION_STORAGE: 'setSessionStorage',
  REMOVE_SESSION_STORAGE: 'removeSessionStorage',
  ADD_SESSION_STORAGE_KEY: 'addSessionStorageKey',
  DELETE_SESSION_STORAGE_KEY: 'deleteSessionStorageKey',
}

/**
 * @enum {keyof typeof DispatchType | string}
 */
export const DispatchType = dispatchType