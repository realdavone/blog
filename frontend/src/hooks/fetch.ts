import { useEffect, useState } from "react"

type ErrorMessage = {
  success: boolean,
  message: string
}

const useFetch = <T>(endpoint: string, options?: any) => {

  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)


  useEffect(() => {
    setLoading(true)
    setError(null)

    fetch(`${import.meta.env['VITE_API_BASE_URL']}${endpoint}`, { ...options, credentials: 'include' })
    .then(async (res) => {
      if(res.status < 200 || res.status > 299) {
        const response: ErrorMessage = await res.json()
        throw(response?.message)
      }
      return res.json()
    })
    .then((data) => {
      setData(data)
      setError(null)
    })
    .catch(error => {
      setData(null)
      setError(error.toString() || 'Niečo sa pokazilo')
    })
    .finally(() => setLoading(false))
  }, [endpoint])

  return { data, loading, error }
}

export default useFetch