import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBar({ initialQ = '' }) {
  const [title, setTitle] = useState(initialQ)
  const nav = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    const q = title.trim()
    if (!q) return
    nav(`/results?q=${encodeURIComponent(q)}&page=1`)
  }

  return (
    <form onSubmit={onSubmit} style={{display:'flex', gap:'.5rem', flexWrap:'wrap'}}>
      <input
        placeholder="Search title (e.g. avengers)"
        value={title}
        onChange={e=>setTitle(e.target.value)}
        style={{padding:'10px', border:'1px solid var(--border)', borderRadius:'8px', flex:'1 1 260px'}}
      />
      <button className="btn primary" type="submit">Search</button>
    </form>
  )
}
