import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function MovieDetailPage() {
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [cast, setCast] = useState([]);
    const [trailer, setTrailer] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const [movieResponse, creditsResponse, videosResponse] = await Promise.all([
                    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br`),
                    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br`),
                    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br`)
                ]);

                const movieData = await movieResponse.json();
                const creditsData = await creditsResponse.json();
                const videosData = await videosResponse.json();

                setMovie(movieData);
                setCast(creditsData.cast.slice(0, 10));
                
                const officialTrailer = videosData.results.find(
                    video => video.type === "Trailer" && video.official
                );
                setTrailer(officialTrailer);

            } catch (error) {
                console.error("Erro ao buscar detalhes do filme:", error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (!movie.title) {
        return <div className="text-white text-center mt-8">Carregando...</div>;
    }

    return (
        <div className="bg-gray-900 min-h-screen text-white p-8">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                        <img 
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                            alt={movie.title} 
                            className="w-full rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="md:w-2/3">
                        <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
                        <div className="flex items-center mb-4">
                            <span className="text-yellow-400 mr-2">&#9733;</span>
                            <span>{movie.vote_average?.toFixed(1)}</span>
                        </div>
                        <p className="text-gray-300 mb-4">Data de Lançamento: {new Date(movie.release_date).toLocaleDateString('pt-BR')}</p>
                        <h2 className="text-2xl font-semibold mb-2">Sinopse</h2>
                        <p className="mb-4">{movie.overview}</p>
                        <h2 className="text-2xl font-semibold mb-2">Elenco Principal</h2>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {cast.map(actor => (
                                <span key={actor.id} className="bg-gray-700 px-2 py-1 rounded">{actor.name}</span>
                            ))}
                        </div>
                        {trailer && (
                            <div>
                                <h2 className="text-2xl font-semibold mb-2">Trailer Oficial</h2>
                                <div className="aspect-w-16 aspect-h-9">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${trailer.key}`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    ></iframe>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}