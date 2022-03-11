const actionType = {
  /**
   * @param {import('src/context/example').UpdatePayload} payload
   */
  SET_EXAMPLE_COLLECTION: 'setExampleCollection',
  /**
   * @param {import('src/context/example').DeletePayload} payload
   */
  DELETE_EXAMPLE_COLLECTION: 'deleteExampleCollection'
}

/**
 * @enum {keyof typeof actionType | string}
 */
export const ActionType = actionType