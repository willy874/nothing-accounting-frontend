/**
 * @typedef {Object} Store
 * @property {StoreState} state
 * @property {StoreAction} dispatch 
 */
/**
 * @template T
 * @typedef {Object} DispatchStore
 * @property {StoreState} rootState
 * @property {T} state
 * @property {StoreAction} dispatch 
 */
/**
 * @typedef {Object} DispatchParam
 * @property {import('@/enums/action-type').ActionType} type
 * @property {import('react').Dispatch<DispatchParam>} dispatchState
 * @property {*} payload
 * 
 */
/**
 * @callback StoreAction
 * @param {import('@/enums/action-type').ActionType} type
 * @param {*} payload
 * @return {void}
 */
/**
 * @typedef {Object} StoreState
 * @property {import('@/contexts/example').ExampleState} example
 */