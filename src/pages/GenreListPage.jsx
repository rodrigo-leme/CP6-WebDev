// src/pages/GenreListPage.jsx
import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function GenreListPage() {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}&language=pt-BR`);
            const data = await response.json();
            setGenres(data.genres);
        };
        fetchGenres();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-white">Gêneros</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                {genres.map(genre => (
                    <Link
                        key={genre.id}
                        to={`/genre/${genre.id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-center"
                    >
                        {genre.name}
                    </Link>
                ))}
            </div>
            <Outlet />
        </div>
    );
}