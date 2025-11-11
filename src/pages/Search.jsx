import SearchBar from '../components/SearchBar.jsx'

export default function Search(){
  return (
    <section>
      <h1>Search</h1>
      <p style={{color:'var(--muted)', margin:'0 0 1rem'}}>
        Search by title only (e.g. <em>avengers</em>, <em>inception</em>).
      </p>
      <SearchBar />
    </section>
  )
}
