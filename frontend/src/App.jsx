import './css/App.css'
import Home from './pages/Home'
import {Routes, Route} from 'react-router-dom'
import Favourite from './pages/Favourites'
import MovieDetails from './pages/MovieDetails'
import NavBar from './components/NavBar'
import {MovieProvider} from './context/MovieContext'

function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourite />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
    </main>
    </MovieProvider>
  )
}

export default App;
