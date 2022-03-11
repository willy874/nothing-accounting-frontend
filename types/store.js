/**
 * @typedef {Object} Store
 * @property {StoreState} state
 * @property {StoreAction<any>} action
 */
/**
 * @typedef {Object} StoreState
 * @property {AccountState} account
 */
/**
 * @template T
 * @callback StoreAction
 * @param {import('src/enum/action-type').ActionType} type
 * @param {T} payload
 * @return {void}
 */
/**
 * @typedef {Object} AccountState
 * @property {{ [key: any]: AccountModel }} collection
 * @property {() => AccountModel[]} getList
 */