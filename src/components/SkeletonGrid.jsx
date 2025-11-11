export default function SkeletonGrid({ count = 8 }) {
  return (
    <ul className="grid">
      {Array.from({ length: count }).map((_, i) => (
        <li key={i} className="card" aria-hidden="true">
          <div className="sk-img"></div>
          <div className="sk-line" style={{ width: '80%' }}></div>
          <div className="sk-line" style={{ width: '40%' }}></div>
        </li>
      ))}
    </ul>
  )
}
