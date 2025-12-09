import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import Results from "./pages/Results.jsx";
import MovieDetail from "./pages/MovieDetail.jsx";
import Favourites from "./pages/Favourites.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* halaman utama */}
        <Route index element={<Home />} />

        {/* halaman lain */}
        <Route path="search" element={<Search />} />
        <Route path="results" element={<Results />} />
        <Route path="movie/:imdbID" element={<MovieDetail />} />
        <Route path="favourites" element={<Favourites />} />
      </Route>

      {/* kalau semua route di atas tidak cocok */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
