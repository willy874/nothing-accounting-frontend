const actionType = {
  /**
   * @param payload.model
   * @param payload.callback
   */
  UPDATE_EXAMPLE_COLLECTION: 'updateExampleCollection',
  DELETE_EXAMPLE_COLLECTION: 'deleteExampleCollection'
}

/**
 * @enum {keyof typeof actionType}
 */
export const ActionType = actionType