import { useState, useEffect} from 'react'
import MovieCard from '../components/MovieCard'
import '../css/Home.css'
import {searchMovies, getPopularMovies} from '../services/api' // Assuming you have an API function to search movies

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPopularMovies = async () => {
            setLoading(true);
            try{
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (error) {
                console.error("Error fetching popular movies:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPopularMovies();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault()
        if (searchQuery.trim() === "") {
            setError("Please enter a search query.");
            return;
        }
        if (loading) {
            return; // Prevent multiple searches while loading
        }
        setLoading(true);
        try{
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null); // Clear any previous errors
        } catch (error) {
            console.error("Error searching movies:", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };
    return (
    <div className="home">
        <form onSubmit= {handleSearch} className="search-form">
            <input 
                type="text" 
                placeholder="Search for movies..." 
                className="search-input" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">Search</button> 
        </form>
        {error && <div className="error-message">{error}</div>}
        {loading ? (<div className="loading">Loading movies...</div>) : (
        <div className="movie-grid">
            {movies.map((movie) =>(<MovieCard key={movie.id} movie={movie} />))}
        </div>
        )}
    </div>
    );
}
export default Home;