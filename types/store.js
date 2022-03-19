/**
 * @typedef {import('@/enums/dispatch-type').DispatchType} DispatchType
 */
/**
 * @typedef {Object} Store
 * @property {StoreState} state
 * @property {StoreGetters} getters
 * @property {StoreDispatch} dispatch
 */
/**
 * @template T
 * @typedef {Object} DispatchStore
 * @property {StoreState} rootState
 * @property {T} state
 * @property {StoreDispatch} dispatch 
 */
/**
 * @template T
 * @typedef {Object} DispatchParam
 * @property {DispatchType} type
 * @property {StoreStateModules<T>} state
 * @property {object} getters
 * @property {StoreDispatch} dispatch
 * @property {*} payload
 * @property {(value?: any) => void} resolve
 * @property {(reason?: Error) => void} reject
 * @property {(name: string) => void} updateGetters
 */
/**
 * @template T
 * @typedef {Record<keyof T, object>} StoreStateModules
 */
/**
 * @typedef {Record<string,(state: unknown) => unknown>} StoreModuleGetters
 */
/**
 * @template T
 * @typedef {Record<keyof T, Record<string,any>>} StoreGetterData
 */
/**
 * @template T
 * @typedef {Record<keyof T, StoreModuleGetters>} StoreGetterModules
 */
/**
 * @typedef {Record<DispatchType,StoreAction<unknown,unknown,unknown>>} StoreModuleActions
 */
/**
 * @template T
 * @typedef {Record<keyof T, StoreModuleActions>} StoreActionModules
 */
/**
 * @template S,P,R
 * @callback StoreAction
 * @param {DispatchStore<S>} store
 * @param {P} payload
 * @return {Promise<R>}
 */
/**
 * @callback StoreDispatch
 * @param {DispatchType} type
 * @param {unknown} payload
 * @return {Promise<unknown>}
 */