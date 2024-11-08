// src/pages/MoviesByGenre.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

export default function MoviesByGenre() {
    const [movies, setMovies] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchMoviesByGenre = async () => {
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&language=pt-BR&with_genres=${id}`);
            const data = await response.json();
            setMovies(data.results);
        };
        fetchMoviesByGenre();
    }, [id]);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-white">Filmes do Gênero</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {movies.map(movie => (
                    <MovieCard key={movie.id} {...movie} />
                ))}
            </div>
        </div>
    );
}