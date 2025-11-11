import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Section from '../components/Section.jsx'
import MovieGrid from '../components/MovieGrid.jsx'
import SkeletonGrid from '../components/SkeletonGrid.jsx'   // ⟵ IMPORT INI
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { useFetch } from '../hooks/useFetch.js'
import { omdbSearch } from '../services/omdb.js'

export default function Home(){
  const nav = useNavigate()
  const [favs] = useLocalStorage('favourites', [])
  const [recent] = useLocalStorage('recent-searches', [])

  // --- New & Trending (variatif + dedupe + buang poster N/A) ---
  const TRENDING_SEEDS = [
    'avengers','harry potter','lord of the rings',
    'spider man','star wars','jurassic','mission impossible','barbie'
  ]
  const picks = TRENDING_SEEDS.slice(0, 3)

  const r1 = useFetch(omdbSearch(picks[0], 1), [picks[0]])
  const r2 = useFetch(omdbSearch(picks[1], 1), [picks[1]])
  const r3 = useFetch(omdbSearch(picks[2], 1), [picks[2]])

  const trending = useMemo(() => {
    const pools = [r1.data?.Search || [], r2.data?.Search || [], r3.data?.Search || []]
    const map = new Map()
    pools.flat()
      .filter(m => m.Poster && m.Poster !== 'N/A')
      .forEach(m => { if (!map.has(m.imdbID)) map.set(m.imdbID, m) })
    return Array.from(map.values()).slice(0, 12)
  }, [r1.data, r2.data, r3.data])

  const trendingLoading = r1.loading || r2.loading || r3.loading
  const trendingError   = r1.error   || r2.error   || r3.error

  // --- Recommended for You (seed dari judul favourite pertama; fallback 'comedy') ---
  const seed = favs[0]?.Title || 'comedy'
  const rec  = useFetch(omdbSearch(seed, 1), [seed])
  const recommended        = rec.data?.Search?.slice(0, 12) || []
  const recommendedLoading = rec.loading
  const recommendedError   = rec.error

  return (
    <section>
      <h1>Welcome to Movie Explorer</h1>
      <p style={{marginTop:0}}>Discover movies, series, and more.</p>

      <div style={{margin:'16px 0'}}>
        <Link to="/search" className="btn">Start Searching →</Link>
      </div>

      <Section
        title="New & Trending"
        action={<button className="btn" onClick={() => nav(`/results?q=${encodeURIComponent(picks[0])}&page=1`)}>See all</button>}
      >
        {trendingLoading ? <SkeletonGrid /> :
         trendingError ? <p role="alert">Failed to load trending.</p> :
         <MovieGrid items={trending} />}
      </Section>

      <Section title="Recommended for You" action={<small style={{opacity:.7}}>seed: {seed}</small>}>
        {recommendedLoading ? (
          <SkeletonGrid />
        ) : recommendedError ? (
          <p role="alert">Failed to load recommendations.</p>
        ) : (
          <MovieGrid items={recommended} />
        )}
      </Section>

      <Section title="Recent Searches">
        {!recent.length ? (
          <p>No recent searches.</p>
        ) : (
          <ul>
            {recent.map(q => (
              <li key={q}>
                <Link to={`/results?q=${encodeURIComponent(q)}&page=1`}>{q}</Link>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section title="Your Favourites" action={<Link to="/favourites">See all</Link>}>
        {!favs.length ? <p>No favourites yet.</p> : <MovieGrid items={favs.slice(0, 12)} />}
      </Section>
    </section>
  )
}
