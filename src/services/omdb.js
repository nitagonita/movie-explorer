// src/services/omdb.js
console.log("OMDB KEY =", import.meta.env.VITE_OMDB_KEY);

const API_KEY = import.meta.env.VITE_OMDB_KEY;
const BASE = "https://www.omdbapi.com/";

export function omdbSearch(q, page = 1, extra = {}) {
  const params = new URLSearchParams({
    apikey: API_KEY,
    s: q,
    page: String(page),
    type: extra.type || "",
    y: extra.y || "",
  });
  return `${BASE}?${params.toString()}`;
}

export function omdbById(id) {
  const params = new URLSearchParams({
    apikey: API_KEY,
    i: id,
    plot: "full",
  });
  return `${BASE}?${params.toString()}`;
}
