import {
  http,
  HttpError
} from '@/utils'

/**
 * @returns {Promise<HttpError | HttpResponse<ExampleModel[]>>}
 */
export const getExample = () => http.get('/example')

/**
 * @param {number} id
 * @returns {Promise<HttpError | HttpResponse<ExampleModel[]>>}
 */
export const getExampleById = (id) => http.get('/example/' + id)

/**
 * @param {*} data
 * @returns {Promise<HttpError | HttpResponse<ExampleModel>>}
 */
export const createExample = (data) => http.post('/example', data)

/**
 * @param {*} data
 * @returns {Promise<HttpError | HttpResponse<ExampleModel>>}
 */
export const updateExample = (data) => http.put('/example', data)

/**
 * @param {number} id
 * @returns {Promise<HttpError | HttpResponse<void>>}
 */
export const deleteExample = (id) => http.delete('/example/' + id)