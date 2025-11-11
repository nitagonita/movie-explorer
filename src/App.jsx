import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Search from './pages/Search.jsx'
import Results from './pages/Results.jsx'
import MovieDetail from './pages/MovieDetail.jsx'
import Favourites from './pages/Favourites.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App(){
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/results" element={<Results />} />
        <Route path="/movie/:imdbID" element={<MovieDetail />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
