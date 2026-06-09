import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getMovieDetails } from '../services/api'
import { useMovieContext } from '../context/MovieContext'
import '../css/MovieDetails.css'

function MovieDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToFavourites, removeFromFavourites, isFavourite } = useMovieContext();
    const favourite = isFavourite(parseInt(id));

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setLoading(true);
                const movieData = await getMovieDetails(id);
                setMovie(movieData);
                setError(null);
            } catch (err) {
                console.error("Error fetching movie details:", err);
                setError("Failed to load movie details");
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    const handleFavouriteClick = (e) => {
        e.preventDefault();
        if (favourite) {
            removeFromFavourites(parseInt(id));
        } else {
            addToFavourites(movie);
        }
    };

    if (loading) {
        return <div className="loading">Loading movie details...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!movie) {
        return <div className="error-message">Movie not found</div>;
    }

    return (
        <div className="movie-details">
            <button className="back-button" onClick={() => navigate(-1)}>
                ← Back
            </button>
            
            <div className="details-container">
                <div className="poster-section">
                    <img 
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                        alt={movie.title}
                        className="details-poster"
                    />
                    <button
                        className={`favourite-btn ${favourite ? 'active' : ''}`}
                        onClick={handleFavouriteClick}
                        aria-label="Add to favourites"
                    >
                        ❤ {favourite ? 'Remove from Favorites' : 'Add to Favorites'}
                    </button>
                </div>

                <div className="info-section">
                    <h1>{movie.title}</h1>
                    
                    <div className="rating-section">
                        <span className="rating">⭐ {movie.vote_average?.toFixed(1)}/10</span>
                        <span className="vote-count">({movie.vote_count} votes)</span>
                    </div>

                    <p className="release-date">
                        <strong>Release Date:</strong> {movie.release_date}
                    </p>

                    {movie.runtime && (
                        <p className="runtime">
                            <strong>Runtime:</strong> {movie.runtime} minutes
                        </p>
                    )}

                    {movie.genres && movie.genres.length > 0 && (
                        <p className="genres">
                            <strong>Genres:</strong> {movie.genres.map(g => g.name).join(', ')}
                        </p>
                    )}

                    <div className="overview-section">
                        <h2>Overview</h2>
                        <p>{movie.overview}</p>
                    </div>

                    {movie.budget > 0 && (
                        <p className="budget">
                            <strong>Budget:</strong> ${(movie.budget / 1000000).toFixed(1)}M
                        </p>
                    )}

                    {movie.revenue > 0 && (
                        <p className="revenue">
                            <strong>Revenue:</strong> ${(movie.revenue / 1000000).toFixed(1)}M
                        </p>
                    )}

                    {movie.production_companies && movie.production_companies.length > 0 && (
                        <p className="production">
                            <strong>Production Companies:</strong> {movie.production_companies.map(c => c.name).join(', ')}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MovieDetails;
