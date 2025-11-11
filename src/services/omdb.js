export const omdbSearch = (q, page = 1, opts = {}) => {
  const sp = new URLSearchParams({
    apikey: import.meta.env.VITE_OMDB_KEY,
    s: q,
    page: String(page)
  })
  if (opts.type) sp.set('type', opts.type)
  if (opts.y)    sp.set('y', String(opts.y))
  return `https://www.omdbapi.com/?${sp.toString()}`
}

export const omdbById = (id) => {
  const sp = new URLSearchParams({
    apikey: import.meta.env.VITE_OMDB_KEY,
    i: id,
    plot: 'full'
  })
  return `https://www.omdbapi.com/?${sp.toString()}`
}
