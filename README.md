# Movie Explorer 🎬 (Multi-Page React App)

Movie Explorer is a multi-page React application built with **React Router**. Users can search for movies using the **OMDb API**, browse results, open a **dynamic details page**, and save favourites. This project was built to demonstrate intermediate React concepts from **modules 055–061**: routing, useEffect lifecycle patterns, cleanup, custom hooks, and professional navigation.

---

## Live Demo

- **Vercel:** https://movie-explorer-gules-seven.vercel.app/

---

## Routes

- `/` → Home
- `/search` → Search page (controlled form)
- `/results` → Results list
- `/movie/:imdbID` → Movie detail (dynamic route)
- `/favourites` → Saved favourites
- `*` → 404 Not Found

---

## Features

- Multi-page navigation with a consistent layout (Layout + Outlet)
- Search movies via a controlled form
- Fetch data from OMDb API with loading + error UI
- Dynamic route for movie details using `useParams` (`/movie/:imdbID`)
- Favourites saved across routes (shared state) and persisted with localStorage
- Smooth user navigation + active link styling in the Navbar

---

## Tech Stack

- React + Vite
- React Router DOM
- JavaScript (ES6+)
- CSS (responsive layout)

---

## Rubric Requirements Coverage (Modules 055–061)

### React Router

- `BrowserRouter` configured at the root
- Nested routes using `Layout` + `Outlet`
- `Routes` / `Route` with 3+ pages (this app has 5+)
- Navigation links (Link/NavLink) with active styling
- 404 route (`NotFound`)
- Dynamic route (`/movie/:imdbID`) using `useParams`

### useEffect / Component Lifecycle

- API requests handled via `useEffect` (inside custom hook / pages)
- Dependency arrays managed to prevent infinite loops
- Cleanup implemented to prevent memory leaks (AbortController / cleanup return)

### Application Architecture & State Management

- Clear file organization: `pages/`, `components/`, `hooks/`, `services/`
- Shared state persists across routes (lifted state / context + localStorage)
- Unidirectional data flow: parent → child via props

### UI / UX

- Responsive layout (grid/flex) works on mobile + desktop
- Loading states shown during fetch
- Error handling for invalid routes and network failures

---

## Project Structure

src/
├── components/
│ ├── Layout.jsx
│ ├── Navbar.jsx
│ ├── MovieGrid.jsx
│ ├── Poster.jsx
│ ├── SearchBar.jsx
│ ├── SkeletonGrid.jsx
│ └── ScrollToTop.jsx
├── hooks/
│ ├── useFetch.js
│ └── useLocalStorage.js
├── pages/
│ ├── Home.jsx
│ ├── Search.jsx
│ ├── Results.jsx
│ ├── MovieDetail.jsx
│ ├── Favourites.jsx
│ └── NotFound.jsx
├── services/
│ └── omdb.js
├── styles/
│ ├── App.css
│ └── index.css
├── App.jsx
└── main.jsx

yaml
Copy code

---

## Environment Variables

Create a `.env.local` file (not committed):

VITE_OMDB_API_KEY=your_api_key_here

yaml
Copy code

> `.env.local` is ignored via `.gitignore` to protect secrets.

---

## Setup (Local)

````bash
git clone <your-repo-url>
cd movie-explorer
npm install
npm run dev
Open: http://localhost:5173

Deployment Notes (Vercel + React Router Refresh)
This project is deployed on Vercel (Vite preset).
A vercel.json rewrite is used so refreshing deep routes (example: /movie/tt1234567) does not return a 404.

Author
Nita

perl
Copy code

### Next (biar selesai)
1) Paste ke `README.md`
2) Commit & push:
```bash
git add README.md
git commit -m "Update README"
git push
````
