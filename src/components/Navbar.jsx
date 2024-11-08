import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-gray-800 shadow-md">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <Link className="text-2xl font-bold text-white" to="/">Filmes Portal</Link>
                <div className="flex items-center">
                    <Link className="text-gray-300 hover:text-white px-3 py-2" to="/">Home</Link>
                    <Link className="text-gray-300 hover:text-white px-3 py-2" to="/movies">Movies</Link>
                    <Link className="text-gray-300 hover:text-white px-3 py-2" to="/genre">Gêneros</Link>
                    <Link className="text-gray-300 hover:text-white px-3 py-2" to="/my-lists">Minhas Listas</Link>
                    <Link className="text-gray-300 hover:text-white px-3 py-2" to="/contato">Contato</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
