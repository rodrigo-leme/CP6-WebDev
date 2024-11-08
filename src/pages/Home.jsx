import { useEffect, useState } from "react";
import CardContainer from "../components/CardContainer";
import MovieCard from "../components/MovieCard";
import { useMovieList } from "../MovieListContext";


export default function Home() {
    const [filmesPopulares, setFilmesPopulares] = useState([]);
    const [filmesTrending, setFilmesTrending] = useState([]);
    const [filmesUpcoming, setFilmesUpcoming] = useState([]);

    const fetchMovies = async () => {
        try {
            const [respostaPopulares, respostaTrending, respostaUpcoming] = await Promise.all([
                fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br`),
                fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br`),
                fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br`)
            ]);

            const popularData = await respostaPopulares.json();
            const trendingData = await respostaTrending.json();
            const upcomingData = await respostaUpcoming.json();

            setFilmesPopulares(popularData.results);
            setFilmesTrending(trendingData.results);
            setFilmesUpcoming(upcomingData.results);
        } catch (error) {
            console.error("Erro ao buscar filmes:", error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8">SaasFlix</h1>
                
                <CardContainer titulo="Filmes Populares">
                    {filmesPopulares.map(filme => (
                        <MovieCard key={filme.id} {...filme} />
                    ))}
                </CardContainer>

                <CardContainer titulo="Em Alta esta Semana">
                    {filmesTrending.map(item => (
                        <MovieCard key={item.id} {...item} />
                    ))}
                </CardContainer>

                <CardContainer titulo="Próximos Lançamentos">
                    {filmesUpcoming.map(filme => (
                        <MovieCard key={filme.id} {...filme} />
                    ))}
                </CardContainer>
            </div>
        </div>
    );
}

