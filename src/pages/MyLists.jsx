import { useMovieList } from '../MovieListContext';
import MovieCard from '../components/MovieCard';

export default function MyLists() {
    const { watchedMovies, watchLaterMovies, removeFromWatched, removeFromWatchLater } = useMovieList();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-white">Minhas Listas</h1>
            
            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4 text-white">Filmes Assistidos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {watchedMovies.map(movie => (
                        <div key={movie.id} className="relative">
                            <MovieCard {...movie} />
                            <button 
                                onClick={() => removeFromWatched(movie.id)}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">Filmes para Ver Depois</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {watchLaterMovies.map(movie => (
                        <div key={movie.id} className="relative">
                            <MovieCard {...movie} />
                            <button 
                                onClick={() => removeFromWatchLater(movie.id)}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}