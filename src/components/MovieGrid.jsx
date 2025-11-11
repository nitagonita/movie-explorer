import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import Poster from './Poster.jsx'

export default function MovieGrid({ items = [] }) {
  // Deduplicate by imdbID supaya key unik
  const unique = useMemo(() => {
    const map = new Map()
    for (const m of items) {
      const id = m?.imdbID || m?.id
      if (!id) continue
      if (!map.has(id)) map.set(id, m)
    }
    return Array.from(map.values())
  }, [items])

  if (!unique.length) return <p style={{opacity:.7}}>No items.</p>

  return (
    <ul className="grid">
      {unique.map((m, i) => (
        <li key={`${m.imdbID}-${i}`} className="card">
          <Link to={`/movie/${m.imdbID}`}>
            <Poster src={m.Poster} alt={m.Title} />
            {/* Sembunyikan type & year di grid */}
            <h3>{m.Title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  )
}
