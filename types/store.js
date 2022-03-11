/**
 * @typedef {Object} Store
 * @property {StoreState} state
 * @property {StoreAction<any>} action
 */
/**
 * @typedef {Object} StoreState
 * @property {ExampleState} example
 */
/**
 * @template T
 * @callback StoreAction
 * @param {import('src/enum/action-type').ActionType} type
 * @param {T} payload
 * @return {void}
 */
/**
 * @typedef {Object} ExampleState
 * @property {{ [key: any]: ExampleModel }} collection
 * @property {() => ExampleModel[]} getList
 */