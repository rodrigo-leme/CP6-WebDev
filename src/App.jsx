// src/App.jsx
import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import { MovieListProvider } from "./MovieListContext"

function App() {
  return (
    <MovieListProvider>
      <Header />
      <Outlet />
    </MovieListProvider>
  )
}

export default App