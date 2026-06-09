import {createContext, useState, useEffect, useContext} from 'react';

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);
export const MovieProvider = ({children}) => {
    const [favourites, setFavourites] = useState([]);
    useEffect(() => {
        const storedFavourites = localStorage.getItem("favourites");
        if (storedFavourites) {
            setFavourites(JSON.parse(storedFavourites));
        }
    }, []);
    useEffect(() => {
        localStorage.setItem("favourites", JSON.stringify(favourites));
    }, [favourites]);

    const addToFavourites = (movie) => {
        setFavourites((prev) => {
            // Check if movie already exists
            if (prev.some(m => m.id === movie.id)) {
                return prev;
            }
            return [...prev, movie];
        });
    };
    const removeFromFavourites = (movieId) => {
        setFavourites((prev) => prev.filter(movie => movie.id !== movieId));
    };
    const isFavourite = (movieId) => {
        return favourites.some(movie => movie.id === movieId);
    };
    const value = {
        favourites,
        addToFavourites,
        removeFromFavourites,
        isFavourite
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}   