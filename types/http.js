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
/**
 * @typedef {Object} HttpConfig
 * @property {{ [key: string]: string }} headers
 * @property {string} baseUrl
 * @property {boolean} withCredentials
 * @property {"include" | "omit" | "same-origin"} credentials
 */
/**
 * @template T
 * @typedef {Object} FetchHookResult
 * @property {T | null} data
 * @property {import('@/utils/http').HttpError} error
 * @property {boolean} loading
 * @property {(promise: () => ReturnType<HttpRequest<T,unknown>>) => void} [reload]
 * @property {(req: RequestInit) => void} [updateRequest]
 */