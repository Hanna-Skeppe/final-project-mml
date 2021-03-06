import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { Comments } from './Comments'
import { Ratings } from './Ratings'
import { Similar } from './Similar'
import { WatchStatus } from './WatchStatus'
import { movies } from '../reducers/movies'
import {
  ActorImage, ActorImageWrap, ActorList, ActorListWrap, ActorName, ActorWrap,
  Genre, MovieBackground, MovieDetailGenres, MovieDetailImage, MovieDetailRow,
  MovieImdb, MovieInfo, MovieOverview, MovieTitle, RatingMovieWrap, ShowSimilar,
  SimilarTitle, WrapMovie, WrapMovieInfo, UserName3
} from './Styling'

const API_KEY = process.env.REACT_APP_MOVIE_API_KEY


export const MovieDetail = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [cast, setCast] = useState([])
  const dispatch = useDispatch()

  const handleActor = (actor) => {
    dispatch(movies.actions.setActorName(actor))
  }

  useEffect(() => {
    setLoading(true)
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
      .then((res) => res.json())
      .then((json) => {
        if (json.status.code === 34) {
          setError("Movie not found")
        } else {
          setMovie(json)
        }
        setLoading(false)
      })
  }, [id])

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((json) => {
        setCast(json.cast.slice(0, 6))
        console.log(json.cast.slice(0, 6))
      })
  }, [id])

  if (loading) {
    return (
      <div>Movie page is loading...</div>
    )
  }

  if (!movie.title) {
    return (
      <div>{error}</div>
    )
  }


  return (
    <MovieBackground
      key={id}
    >
      <WrapMovie>
        <div>
          {movie.poster_path && (
            <MovieDetailImage
              src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} alt={movie.title}
            />
          )}
          {!movie.poster_path && (
            <MovieDetailImage
              src="https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" alt="Photo by Denise Jans on Unsplash" />
          )}
        </div>

        <WrapMovieInfo>
          <MovieTitle>{movie.title}</MovieTitle>
          <RatingMovieWrap>

            <Ratings
              movieId={movie.id}
              movieTitle={movie.title}
            />
            <WatchStatus
              movieId={movie.id}
              movieTitle={movie.title}
            />

          </RatingMovieWrap>
          <MovieDetailGenres>
            {movie.genres.map((genre) => (
              <Genre key={genre.name}>{genre.name}</Genre>
            ))}
          </MovieDetailGenres>
          <MovieOverview>{movie.overview}</MovieOverview>
          <MovieDetailRow>
            <MovieInfo><span aria-label="emoji">⏱</span> {movie.runtime} min</MovieInfo>
            <MovieImdb
              href={`https://www.imdb.com/title/${movie.imdb_id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              IMDb
            </MovieImdb>
          </MovieDetailRow>
        </WrapMovieInfo>
      </WrapMovie>

      <ActorListWrap>
        <ActorList>
          {cast.map((actor) => (
            <ActorWrap >
              <Link key={actor.id} to={`/cast/${actor.id}`} className="white-link" onClick={(e) => handleActor(actor.name)}>
                {actor.profile_path && (
                  <ActorImageWrap>
                    <ActorImage
                      src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                    />
                  </ActorImageWrap>
                )}
                {!actor.profile_path && (
                  <ActorImageWrap>
                    <ActorImage
                      src="https://images.pexels.com/photos/1446948/pexels-photo-1446948.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="Photo by Engin Akyurt from Pexels" />
                  </ActorImageWrap>
                )}
                <ActorName>{actor.name}</ActorName>
              </Link>
            </ActorWrap>
          ))}
        </ActorList>
      </ActorListWrap>

      <Comments
        movieId={movie.id}
        movieTitle={movie.title}
      />

      <ShowSimilar>
        <UserName3>Similar movies</UserName3>
        <Similar />
      </ShowSimilar>
    </MovieBackground>
  )
}