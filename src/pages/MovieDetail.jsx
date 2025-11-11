import { useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch.js'
import { omdbById } from '../services/omdb.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import SkeletonGrid from '../components/SkeletonGrid.jsx'
import Poster from '../components/Poster.jsx'

export default function MovieDetail(){
  const { imdbID } = useParams()
  const { data, loading, error } = useFetch(omdbById(imdbID), [imdbID])
  const [favs, setFavs] = useLocalStorage('favourites', [])

  if (loading) return <SkeletonGrid count={1} />
  if (error)   return <p role="alert">Error: {error.message}</p>
  if (!data)   return null
  if (data?.Response === 'False') return <p>{data.Error}</p>

  const inFavs = favs.some(f => f.imdbID === data.imdbID)
  const safe = (v) => (v && v !== 'N/A' ? v : '—')

  const toggleFav = () => {
    setFavs(prev =>
      inFavs
        ? prev.filter(f => f.imdbID !== data.imdbID)
        : [...prev, {
            imdbID: data.imdbID,
            Title: data.Title,
            Year: data.Year,
            Poster: data.Poster
          }]
    )
    console.info(inFavs ? 'Removed from favourites' : 'Added to favourites')
  }

  return (
    <article className="detail">
      <Poster src={data.Poster} alt={data.Title} />

      <div>
        <h1 style={{margin:'0 0 .25rem'}}>{data.Title} ({safe(data.Year)})</h1>

        <p style={{margin:'.25rem 0'}}><strong>Genre:</strong> {safe(data.Genre)}</p>
        <p style={{margin:'.25rem 0'}}><strong>Director:</strong> {safe(data.Director)}</p>
        {data.Actors && data.Actors !== 'N/A' && (
          <p style={{margin:'.25rem 0'}}><strong>Actors:</strong> {data.Actors}</p>
        )}

        {/* meta ringkas kalau tersedia */}
        <p style={{margin:'.25rem 0', color:'var(--muted)'}}>
          {safe(data.Rated)} • {safe(data.Runtime)} • {safe(data.Language)}
        </p>

        <p style={{margin:'0.75rem 0 1rem'}}><strong>Plot:</strong> {safe(data.Plot)}</p>

        <button className="btn primary" onClick={toggleFav}>
          {inFavs ? 'Remove from Favourites' : 'Add to Favourites'}
        </button>
      </div>
    </article>
  )
}
