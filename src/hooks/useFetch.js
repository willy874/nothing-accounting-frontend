import {
  useEffect,
  useState
} from "react";
import {
  HttpError
} from "@/utils/http"

/**
 * 
 * @param {(data: any) => Promise<HttpError | HttpResponse<ExampleModel>>} req 
 * @param {*} payload 
 * @returns 
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
      if (typeof req === 'string') {
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
      } else {
        req(payload)
          .then((res) => {
            if (res instanceof HttpError) {
              throw res
            } else {
              setData(res.data);
            }
            setLoading(false);
          })
      }
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