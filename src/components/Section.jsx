export default function Section({ title, children, action }) {
  return (
    <section style={{margin:'24px 0'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
        <h2 style={{margin:0}}>{title}</h2>
        {action}
      </div>
      {children}
    </section>
  )
}
