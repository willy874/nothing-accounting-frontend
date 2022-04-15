import {
  useEffect,
  useState,
  useRef
} from "react";
import {
  HttpError
} from "@/utils/http"

/**
 * @param {string} req 
 * @param {RequestInit} [payload]
 * @returns {FetchHookResult<unknown>}
 * @example
```js
const { data, error, loading } = useFetch('/api/example', params);
```
 */
export function useFetch(req, payload) {
  const [request, updateRequest] = useState(payload);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);
    try {
      fetch(req, request)
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
          throw new HttpError(res)
        })
        .then((res) => {
          setData(res);
          setLoading(false);
        })
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }, [req, request])
  return {
    data,
    error,
    loading,
    updateRequest
  }
}

/**
 * @template T
 * @param {() => ReturnType<HttpRequest<T,unknown>>} req
 * @returns {FetchHookResult<T>}
 * @example
```js
const { data, error, loading } = useHttpRequest(() => getExample());
```
 */
export function useHttpRequest(req) {
  const request = useRef(req)
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);
    try {
      request.current()
        .then((res) => {
          if (res instanceof HttpError) {
            throw res
          } else {
            setData(res);
          }
          setLoading(false);
        })
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }, [request])
  return {
    data,
    error,
    loading,
    reload: (func) => (request.current = func)
  }
}