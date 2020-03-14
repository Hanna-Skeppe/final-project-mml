import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { not_found } from "assets/not_found.jpeg"
import "components/movielist.css"
import { Ratings } from "./Ratings"

const API_KEY = process.env.REACT_APP_MOVIE_API_KEY

export const Similar = () => {
  const { id } = useParams()
  const [movies, setMovies] = useState([])

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`)
      .then(res => res.json())
      .then(json => {
        setMovies(json.results)
      }, [id])
  })

  return (
    <div className="top-movie-list">
      <section className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-wrapper">
            {movie.poster_path && (
              <img src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} alt={movie.id} />
            )}
            {!movie.poster_path && (
              <img src={not_found} alt={movie.title} />
            )}
            <div className="hover-details">
              <Link key={movie.id} to={`/movies/${movie.id}`}>
                <h1>{movie.original_title}</h1>
              </Link>
              <p>Released {movie.release_date}</p>
              <Ratings movieId={movie.id} movieTitle={movie.title} />
            </div>
          </div>
        ))}
      </section>
    </div >
  )
}
