import { useState } from 'react'

export default function Poster({ src, alt, ...imgProps }) {
  const [broken, setBroken] = useState(false)
  const realSrc = !broken && src && src !== 'N/A' ? src : '/placeholder.svg'

  return (
    <img
      src={realSrc}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => { if (!broken) setBroken(true) }}
      style={{ width:'100%', aspectRatio:'2/3', objectFit:'cover', borderRadius:'10px' }}
      {...imgProps}
    />
  )
}
