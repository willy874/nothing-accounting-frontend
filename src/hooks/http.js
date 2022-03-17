import {
  useEffect,
  useState
} from "react";
import {
  HttpError
} from "@/utils/http"

/**
 * @template T
 * @typedef {Object} FetchHookResult
 * @property {T | null} data
 * @property {HttpError} error
 * @property {boolean} loading
 */
/**
 * @template T
 * @param {string} req 
 * @param {RequestInit} [payload]
 * @returns {FetchHookResult<unknown>}
 * @callback HttpRequestA
 */
export function useFetch(req, payload) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);
    try {
      fetch(req, payload)
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
  }, [req, payload])
  return {
    data,
    error,
    loading
  }
}
/**
 * @template T,D
 * @param {HttpRequest<T,D>} req 
 * @param {D} [payload]
 * @returns {FetchHookResult<T>}
 */
export function useHttpRequest(req, payload) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);
    try {
      req(payload)
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
  }, [req, payload])
  return {
    data,
    error,
    loading
  }
}