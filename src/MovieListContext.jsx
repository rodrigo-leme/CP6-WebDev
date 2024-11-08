// src/MovieListContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const MovieListContext = createContext();

export const useMovieList = () => useContext(MovieListContext);

export const MovieListProvider = ({ children }) => {
    const [watchedMovies, setWatchedMovies] = useState([]);
    const [watchLaterMovies, setWatchLaterMovies] = useState([]);

    useEffect(() => {
        const storedWatched = JSON.parse(localStorage.getItem('watchedMovies')) || [];
        const storedWatchLater = JSON.parse(localStorage.getItem('watchLaterMovies')) || [];
        setWatchedMovies(storedWatched);
        setWatchLaterMovies(storedWatchLater);
    }, []);

    const addToWatched = (movie) => {
        const updatedList = [...watchedMovies, movie];
        setWatchedMovies(updatedList);
        localStorage.setItem('watchedMovies', JSON.stringify(updatedList));
    };

    const addToWatchLater = (movie) => {
        const updatedList = [...watchLaterMovies, movie];
        setWatchLaterMovies(updatedList);
        localStorage.setItem('watchLaterMovies', JSON.stringify(updatedList));
    };

    const removeFromWatched = (movieId) => {
        const updatedList = watchedMovies.filter(movie => movie.id !== movieId);
        setWatchedMovies(updatedList);
        localStorage.setItem('watchedMovies', JSON.stringify(updatedList));
    };

    const removeFromWatchLater = (movieId) => {
        const updatedList = watchLaterMovies.filter(movie => movie.id !== movieId);
        setWatchLaterMovies(updatedList);
        localStorage.setItem('watchLaterMovies', JSON.stringify(updatedList));
    };

    return (
        <MovieListContext.Provider value={{
            watchedMovies,
            watchLaterMovies,
            addToWatched,
            addToWatchLater,
            removeFromWatched,
            removeFromWatchLater
        }}>
            {children}
        </MovieListContext.Provider>
    );
};