import '../css/Favorites.css'
import { useMovieContext } from '../context/MovieContext'
import MovieCard from '../components/MovieCard'

function Favourite() {
    const { favourites } = useMovieContext();

    return (
        <div className="favourites-container">
            {favourites.length === 0 ? (
                <div className="favourites-empty">
                    <h2>No favourite movies yet.</h2>
                    <p>Start adding some movies to your favourites!</p>
                </div>
            ) : (
                <div className="movie-grid">
                    {favourites.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
}
export default Favourite;