import { Link } from 'react-router-dom'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

export default function Favourites(){
  const [favs, setFavs] = useLocalStorage('favourites', [])

  // DEBUG kecil biar kelihatan di console
  console.log('FAVS READ →', favs)

  if (!favs || !favs.length) return (
    <section>
      <h1>Favourites</h1>
      <p>No favourites yet.</p>
      <p style={{fontSize:12,opacity:.7}}>Tip: klik “Add to Favourites” di halaman detail lalu kembali ke sini.</p>
    </section>
  )

  return (
    <section>
      <h1>Favourites</h1>
      <ul className="grid">
        {favs.map(m => (
          <li key={m.imdbID} className="card">
            <Link to={`/movie/${m.imdbID}`}>
              <img src={m.Poster !== 'N/A' ? m.Poster : '/placeholder.png'} alt={m.Title}/>
              <h3>{m.Title} ({m.Year})</h3>
            </Link>
            <button onClick={() => setFavs(prev => prev.filter(f => f.imdbID !== m.imdbID))}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
