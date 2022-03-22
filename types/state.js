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
 * @typedef {Object} StoragePayload
 * @property {Storage} storage
 * @property {import('@/enums').StorageKey} key
 * @property {string} value
 */
/**
 * @typedef {Object} StorageState
 * @property {Set<import('@/enums').StorageKey>} keys
 * @property {Storage | null} storage
 * @property {{ [key: string]: string }} value
 */
/**
 * @typedef {Object} DialogState
 * @property {{ [key: string]: FrameModel }} collection
 */