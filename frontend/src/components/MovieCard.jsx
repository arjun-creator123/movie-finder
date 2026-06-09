import '../css/MovieCard.css'
import { useMovieContext } from '../context/MovieContext'
import { useNavigate } from 'react-router-dom'

function MovieCard({movie}){
    const navigate = useNavigate();
    const {addToFavourites, removeFromFavourites, isFavourite} = useMovieContext();
    const favourite = isFavourite(movie.id);

    function OnFavouriteClick(e) {
        e.preventDefault();
        e.stopPropagation();
        if (favourite) {
            removeFromFavourites(movie.id);
        } else {
            addToFavourites(movie);
        }
    }

    function handleCardClick() {
        navigate(`/movie/${movie.id}`);
    }
    
    return <div className="movie-card" onClick={handleCardClick}>
        <div className="movie-poster">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <div className="movie-overlay">
                <button 
                    type="button" 
                    className={`favourite-btn ${favourite ? 'active' : ''}`} 
                    onClick={OnFavouriteClick}
                    aria-label="Add to favourites"
                >
                    ❤
                </button>
            </div>
        </div>
        <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.release_date}</p>
        </div>
    </div>
}

export default MovieCard