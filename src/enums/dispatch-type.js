const dispatchType = {
  /**
   * @type {import('@/contexts/example').actions} 
   */
  SET_EXAMPLE_COLLECTION: 'setExampleCollection',
  DELETE_EXAMPLE_COLLECTION: 'deleteExampleCollection'
}

/**
 * @enum {keyof typeof DispatchType | string}
 */
export const DispatchType = dispatchType