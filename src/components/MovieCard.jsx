// src/components/MovieCard.jsx
import { useMovieList } from '../MovieListContext';
import { Link } from 'react-router-dom';

export default function MovieCard({ id, title, name, poster_path, vote_average }) {
    const { addToWatched, addToWatchLater } = useMovieList();
    const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

    const handleAddToWatched = () => {
        addToWatched({ id, title: title || name, poster_path, vote_average });
    };

    const handleAddToWatchLater = () => {
        addToWatchLater({ id, title: title || name, poster_path, vote_average });
    };

    return (
        <div className="flex-none w-48 bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
        <Link to={`/movies/${id}`} className="block">


        <img 
                src={imageUrl} 
                alt={title || name} 
                className="w-full h-72 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold truncate">{title || name}</h3>
                <div className="flex items-center mt-2">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-gray-300">{vote_average.toFixed(1)}</span>
                </div>
                <div className="mt-4 flex justify-between">
                    <button onClick={handleAddToWatched} className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm">
                        Assistido
                    </button>
                    <button onClick={handleAddToWatchLater} className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-sm">
                        Ver depois
                    </button>
                </div>
            </div>

        </Link>






        </div>
    );
}