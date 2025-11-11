import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch.js'
import { omdbSearch } from '../services/omdb.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import SkeletonGrid from '../components/SkeletonGrid.jsx'

export default function Results(){
  const [params] = useSearchParams()

  // raw text dari URL (tetap dipakai untuk recent & pager)
  const qRaw  = params.get('q') || ''
  const page  = Number(params.get('page') || 1)
  const type  = params.get('type') || ''   // tetap dipakai diam-diam

  // Deteksi 4-digit tahun dalam q (mis. "avengers 2012") — tetap dipakai diam-diam
  const yearInQ   = qRaw.match(/\b(19|20)\d{2}\b/)
  const inferredY = params.get('y') || (yearInQ ? yearInQ[0] : '')
  const q = yearInQ ? qRaw.replace(yearInQ[0], '').trim() : qRaw
  const y = inferredY

  // Build URL request (tetap sertakan type & y untuk hasil akurat)
  const url = q ? omdbSearch(q, page, { type, y }) : null
  const { data, loading, error } = useFetch(url, [q, page, type, y])
  const [recent, setRecent] = useLocalStorage('recent-searches', [])

  useEffect(() => {
    if (!qRaw) return
    setRecent(prev => Array.from(new Set([qRaw, ...prev])).slice(0,5))
    document.title = `Results for "${qRaw}" – Page ${page}`
    window.scrollTo(0,0)
  }, [qRaw, page, setRecent])

  if (!qRaw) return <p>Enter a search first.</p>
  if (q === '' && !y) return <p>Please type a title (e.g. <em>avengers</em> or <em>avengers 2012</em>).</p>
  if (loading) return <SkeletonGrid count={10} />
  if (error)   return <p role="alert">Error: {error.message}</p>

  const items = data?.Search || []
  const total = Number(data?.totalResults || 0)
  const pages = Math.max(1, Math.ceil(total / 10))

  // Pager: tetap bawa qRaw; y/type ikut DIAM-DIAM tapi tidak ditampilkan
  const nextQs = (p) => {
    const sp = new URLSearchParams({ q: qRaw, page: String(p) })
    if (type) sp.set('type', type)
    if (y)    sp.set('y', y)
    return `/results?${sp.toString()}`
  }

  return (
    <section>
      {/* Judul TANPA menampilkan type/y */}
      <h1>Results for “{q || qRaw}”</h1>

      {/* Status bar TANPA menampilkan type/y */}
      <p style={{color:'var(--muted)', margin:'8px 0'}}>
        {total ? <>Page {page} of {pages} • {total} results</> : 'No results'}
      </p>

      {data?.Response === 'False' ? (
        <p role="alert">{data?.Error || 'No results.'}</p>
      ) : items.length === 0 ? (
        <p>No results found. Try a different keyword.</p>
      ) : (
        <ul className="grid">
          {items.map(m => (
            <li key={m.imdbID} className="card">
              <Link to={`/movie/${m.imdbID}`}>
                <img
                  src={m.Poster !== 'N/A' ? m.Poster : '/placeholder.svg'}
                  alt={m.Title}
                  loading="lazy"
                  onError={(e)=>{ e.currentTarget.src='/placeholder.svg'; e.currentTarget.onerror=null; }}
                />
                {/* Jika ingin sembunyikan tahun di kartu, ganti ke <h3>{m.Title}</h3> */}
                <h3>{m.Title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <nav className="pager">
        {page > 1 && <Link to={nextQs(page-1)}>Prev</Link>}
        {(page*10) < total && <Link to={nextQs(page+1)}>Next</Link>}
      </nav>
    </section>
  )
}
