const dispatchType = {
  /**
   * @type {import('@/contexts/example').actions} 
   */
  SET_EXAMPLE_COLLECTION: 'setExampleCollection',
  DELETE_EXAMPLE_COLLECTION: 'deleteExampleCollection',
  /**
   * @type {import('@/contexts/storage').actions} 
   */
  SET_STORAGE_SETTING: 'setStorageSetting',
  SET_STORAGE: 'setLocalStorage',
  REMOVE_STORAGE: 'removeLocalStorage',
}

/**
 * @enum {keyof typeof DispatchType | string}
 */
export const DispatchType = dispatchType