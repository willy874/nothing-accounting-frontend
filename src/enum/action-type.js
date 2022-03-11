const actionType = {
  /**
   * @param payload.model
   * @param payload.callback
   */
  UPDATE_ACCOUNT_COLLECTION: 'updateAccountCollection',
  DELETE_ACCOUNT_COLLECTION: 'deleteAccountCollection'
}

/**
 * @enum {keyof typeof actionType}
 */
export const ActionType = actionType