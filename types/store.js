/**
 * @typedef {Object} Store
 * @property {StoreState} state
 * @property {StoreAction} action
 */
/**
 * @typedef {Object} StoreState
 * @property {ExampleState} example
 */
/**
 * @callback StoreAction
 * @param {import('src/enum/action-type').ActionType} type
 * @param {*} payload
 * @return {void}
 */
/**
 * @typedef {Object} ExampleState
 * @property {{ [key: string]: ExampleModel }} collection
 * @property {() => ExampleModel[]} getList
 */