import {
  cloneJson
} from "./common";

/** @type {HttpConfig} */
const config = {
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  baseUrl: 'api',
  withCredentials: false,
  credentials: 'omit'
}

export class HttpError extends Error {
  constructor(args) {
    super(args);
    this.data = args.data;
    this.message = args.message;
    this.code = args.code;
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
 * @param {Request} req
 * @returns {Promise<Request>}
 */
async function requestHandler(req) {
  return req
}

/**
 * @param {HttpError} error
 * @returns {Promise<HttpError>} 
 */
async function requestErrorHandler(error) {
  return error
}

/**
 * @param {Response} res 
 * @returns {Promise<Response>}
 */
async function responseHandler(res) {
  return res
}
/**
 * @param {HttpError} error
 * @returns {Promise<HttpError>} 
 */
async function responseErrorHandler(error) {
  return error
}

/**
 * @param {HeadersInit} headers
 * @return {{ [key: string]: string }}
 */
export function resolveHeaders(headers) {
  let result = {}
  if (headers instanceof Headers) {
    headers.forEach((key, value) => {
      result[key] = value
    })
  } else if (headers instanceof Array) {
    headers.forEach(([key, value]) => {
      result[key] = value
    })
  } else {
    result = headers
  }
  return cloneJson(result)
}

/**
 * 
 * @param {Response} response 
 * @returns 
 */
async function getResponseData(response) {
  const contentType = response.headers.get('Content-Type')
  switch (true) {
    case /application\/json/.test(contentType):
      return await response.json()
    default:
      return await response.text()
  }
}

/**
 * @template T
 * @param {string} url 
 * @param {RequestInit} options
 * @returns {Promise<HttpResponse<T>|HttpError>}
 */
async function commonHandler(url, options) {
  const headers = resolveHeaders(options.headers)
  /** @type {Request} */
  let request = new Request(http.config.baseUrl + url, {
    ...options,
    credentials: http.config.withCredentials === true ? 'include' : http.config.credentials,
    headers: new Headers({
      ...http.config.headers,
      ...headers
    })
  })
  try {
    if (request instanceof Error) {
      throw request
    }
    for (const fn of http.interceptors.request.success) {
      request = await fn(request)
    }
  } catch (error) {
    /** @type {HttpError} */
    let err = createHttpError(error)
    for (const fn of http.interceptors.request.error) {
      err = await fn(err)
    }
    return err
  }
  /** @type {Response} */
  let response = await fetch(request)
  try {
    if (response instanceof Error) {
      throw response
    }
    for (const fn of http.interceptors.response.success) {
      response = await fn(response)
    }
    return await getResponseData(response)
  } catch (error) {
    /** @type {HttpError} */
    let err = createHttpError(error)
    for (const fn of http.interceptors.response.error) {
      err = await fn(err)
    }
    return err
  }
}

export const http = {
  config,
  interceptors: {
    request: {
      success: [requestHandler],
      error: [requestErrorHandler],
      use(req, err) {
        if (req && typeof req === 'function') this.success.push(req)
        if (err && typeof err === 'function') this.error.push(err)
      }
    },
    response: {
      success: [responseHandler],
      error: [responseErrorHandler],
      use(res, err) {
        if (res && typeof res === 'function') this.success.push(res)
        if (err && typeof err === 'function') this.error.push(err)
      }
    }
  },
  /**
   * @template T
   * @param {string} method 
   * @param {string} url 
   * @param {RequestInit} [options]
   * @returns {Promise<HttpResponse<T>|HttpError>} 
   */
  async request(method, url, options) {
    return await commonHandler(url, {
      ...options,
      method: method.toUpperCase(),
    })
  },
  /**
   * @template T
   * @param {string} url 
   * @param {RequestInit} [options]
   * @returns {Promise<HttpResponse<T>|HttpError>}
   */
  async get(url, options) {
    return await commonHandler(url, {
      ...options,
      method: 'GET',
    })
  },
  /**
   * @template T
   * @param {string} url 
   * @param {BodyInit} [payload] 
   * @param {RequestInit} [options]
   * @returns {Promise<HttpResponse<T>|HttpError>}
   */
  async post(url, payload, options) {
    return await commonHandler(url, {
      ...options,
      method: 'POST',
      body: payload,
    })
  },
  /**
   * @template T
   * @param {string} url 
   * @param {BodyInit} [payload] 
   * @param {RequestInit} [options]
   * @returns {Promise<HttpResponse<T>|HttpError>}
   */
  async put(url, payload, options) {
    return await commonHandler(url, {
      ...options,
      method: 'PUT',
      body: payload,
    })
  },
  /**
   * @template T
   * @param {string} url 
   * @param {BodyInit} payload 
   * @param {RequestInit} [options]
   * @returns {Promise<HttpResponse<T>|HttpError>}
   */
  async patch(url, payload, options) {
    return await commonHandler(url, {
      ...options,
      method: 'PATCH',
      body: payload,
    })
  },
  /**
   * @template T
   * @param {string} url 
   * @param {RequestInit} [options]
   * @returns {Promise<HttpResponse<T>|HttpError>}
   */
  async delete(url, options) {
    return await commonHandler(url, {
      ...options,
      method: 'DELETE',
    })
  }
}