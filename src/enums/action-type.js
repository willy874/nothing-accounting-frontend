const actionType = {
  /**
   * @param {import('@/contexts/example').UpdatePayload} payload
   */
  SET_EXAMPLE_COLLECTION: 'setExampleCollection',
  /**
   * @param {import('@/contexts/example').DeletePayload} payload
   */
  DELETE_EXAMPLE_COLLECTION: 'deleteExampleCollection'
}

/**
 * @enum {keyof typeof actionType | string}
 */
export const ActionType = actionType