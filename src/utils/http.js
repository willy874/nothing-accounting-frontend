const baseUrl = 'api'
export class HttpError extends Error {
  constructor(args) {
    super(args);
    this.data = args.data;
  }
}

/**
 * @param {unknown} error
 * @returns {HttpError}
 */
export function createHttpError(error) {
  return new HttpError(error)
}

/**
 * @param {string} url
 * @param {RequestInit} [init]
 * @returns {Promise<Request|HttpError>}
 */
async function requestHandler(url, init) {
  try {
    const request = new Request(baseUrl + url, init);
    return request
  } catch (error) {
    return await requestErrorHandler(createHttpError(error))
  }
}

/**
 * @param {HttpError} error
 * @returns {Promise<HttpError>} 
 */
async function requestErrorHandler(error) {
  return error
}

/**
 * @param {Request} request 
 * @returns {Promise<any>}
 */
async function responseHandler(request) {
  try {
    const response = await fetch(request)
    const contentType = response.headers.get('Content-Type')
    if (/application\/json/.test(contentType)) {
      return await response.json()
    }
    return await response.text()
  } catch (error) {
    return await responseErrorHandler(createHttpError(error))
  }
}

/**
 * @param {HttpError} error
 * @returns {Promise<HttpError>} 
 */
async function responseErrorHandler(error) {
  return error
}

export const http = {
  /**
   * @template T
   * @param {string} method 
   * @param {string} url 
   * @param {RequestInit} [options]
   * @returns {Promise<HttpResponse<T>|HttpError>} 
   */
  async request(method, url, options) {
    const requestInit = {
      method: method.toUpperCase(),
      ...options
    }
    const request = await requestHandler(url, requestInit)
    if (request instanceof Error) {
      return request
    }
    return await responseHandler(request)
  },
  /**
   * @template T
   * @param {string} url 
   * @param {RequestInit} [options]
   * @returns {Promise<HttpResponse<T>|HttpError>}
   */
  async get(url, options) {
    const requestInit = {
      method: 'GET',
      ...options
    }
    const request = await requestHandler(url, requestInit)
    if (request instanceof Error) {
      return request
    }
    return await responseHandler(request)
  },
  /**
   * @template T
   * @param {string} url 
   * @param {BodyInit} [payload] 
   * @param {RequestInit} [options]
   * @returns {Promise<HttpResponse<T>|HttpError>}
   */
  async post(url, payload, options) {
    const requestInit = {
      method: 'POST',
      body: payload,
      ...options
    }
    const request = await requestHandler(url, requestInit)
    if (request instanceof Error) {
      return request
    }
    return await responseHandler(request)
  },
  /**
   * @template T
   * @param {string} url 
   * @param {BodyInit} [payload] 
   * @param {RequestInit} [options]
   * @returns {Promise<HttpResponse<T>|HttpError>}
   */
  async put(url, payload, options) {
    const requestInit = {
      method: 'PUT',
      body: payload,
      ...options
    }
    const request = await requestHandler(url, requestInit)
    if (request instanceof Error) {
      return request
    }
    return await responseHandler(request)
  },
  /**
   * @template T
   * @param {string} url 
   * @param {BodyInit} payload 
   * @param {RequestInit} [options]
   * @returns {Promise<HttpResponse<T>|HttpError>}
   */
  async patch(url, payload, options) {
    const requestInit = {
      method: 'PATCH',
      body: payload,
      ...options
    }
    const request = await requestHandler(url, requestInit)
    if (request instanceof Error) {
      return request
    }
    return await responseHandler(request)
  },
  /**
   * @template T
   * @param {string} url 
   * @param {RequestInit} [options]
   * @returns {Promise<HttpResponse<T>|HttpError>}
   */
  async delete(url, options) {
    const requestInit = {
      method: 'DELETE',
      ...options
    }
    const request = await requestHandler(url, requestInit)
    if (request instanceof Error) {
      return request
    }
    return await responseHandler(request)
  }
}