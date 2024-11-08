import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Contato from './pages/Contato.jsx'
import GenreListPage from './pages/GenreListPage.jsx'
import Home from './pages/Home.jsx'
import MovieDetailPage from './pages/MovieDetailPage.jsx'
import MovieListPage from './pages/MovieListPage.jsx'
import MoviesByGenrePage from './pages/MoviesByGenrePage.jsx'
import PageNotFound from './pages/PageNotFound.jsx'
import MyLists from './pages/MyLists.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: '/movies', element: <MovieListPage /> },
      { path: '/movies/:id', element: <MovieDetailPage /> },
      { 
        path: '/genre', 
        element: <GenreListPage />,
        children: [
          { path: ':id', element: <MoviesByGenrePage /> }
        ]
      },
      { path: '/contato', element: <Contato /> },
      { path: '/my-lists', element: <MyLists /> },
      { path: '*', element: <PageNotFound /> }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)