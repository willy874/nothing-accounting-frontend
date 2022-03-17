/**
 * @template T
 * @callback ActionCallback
 * @param {T} model
 * @return {void}
 */
/**
 * @template T,D
 * @callback HttpRequest
 * @param {D} data
 * @return {Promise<import('@/utils/http').HttpError | HttpResponse<T>>}
 */
/**
 * @template T
 * @typedef {Object} HttpResponse
 * @property {number} status
 * @property {string} message
 * @property {T} [data]
 */