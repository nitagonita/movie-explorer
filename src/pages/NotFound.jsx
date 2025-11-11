import { Link } from 'react-router-dom'

export default function NotFound(){
  return (
    <section style={{textAlign:'center', padding:'4rem 1rem'}}>
      <h1 style={{fontSize:'2rem', marginBottom:'0.5rem'}}>404 — Page not found</h1>
      <p style={{color:'var(--muted)'}}>We couldn’t find what you’re looking for.</p>
      <div style={{marginTop:'1rem'}}>
        <Link to="/" className="btn">← Back to Home</Link>
      </div>
    </section>
  )
}
