/**
 * @typedef {Object} StoreState
 * @property {ExampleState} example
 * @property {DialogState} dialog
 */
/**
 * @typedef {Object} ExampleState
 * @property {{ [key: string]: ExampleModel }} collection
 */
/**
 * @typedef {Object} StorageSettings
 * @property {Set<import('@/enums').StorageKey>} keys
 * @property {Storage} storage
 */
/**
 * @typedef {Object} StoragePayload
 * @property {import('@/enums').StorageKey} key
 * @property {string} value
 */
/**
 * @typedef {Object} StorageState
 * @property {StorageSettings} local
 * @property {StorageSettings} session
 */
/**
 * @typedef {Object} DialogState
 * @property {{ [key: string]: FrameModel }} collection
 */