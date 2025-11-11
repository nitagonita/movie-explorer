import { useEffect, useState } from 'react'

export function useFetch(url, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!url) return
    const ctl = new AbortController()
    setLoading(true); setError(null)

    fetch(url, { signal: ctl.signal })
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then(setData)
      .catch(e => { if (e.name !== 'AbortError') setError(e) })
      .finally(() => setLoading(false))

    return () => ctl.abort()
  }, deps)

  return { data, loading, error }
}
