import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import 'pages/movielist.css'
import {
  ActorTitle, HoverDetails, ListImage, MobileView,
  MovieInfo, MovieList, MovieTitle, MovieWrapper
} from '../components/Styling'

const API_KEY = process.env.REACT_APP_MOVIE_API_KEY


export const Actors = () => {
  const { castId } = useParams()
  const name = useSelector(state => state.movies.actorName)
  const [person, setPerson] = useState([])

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/person/${castId}/movie_credits?api_key=${API_KEY}&language=en-US`)
      .then((res) => res.json())
      .then((json) => {
        setPerson(json.cast)
      })
  }, [castId])


  return (
    <div className="top-movie-list">
      <ActorTitle>Movies with {name}</ActorTitle>
      <MovieList className="movie-list">
        {person.map((persons) => (
          <MovieWrapper>

            {persons.poster_path && (
              <ListImage src={`https://image.tmdb.org/t/p/w342${persons.poster_path}`} alt={persons.title} />
            )}
            {!persons.poster_path && (
              <ListImage src="https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" alt="Photo by Denise Jans on Unsplash" />
            )}
            <HoverDetails className="hover-details">
              <MobileView className="mobile-view">
                <Link className="white-link" key={persons.credit_id} to={`/movies/${persons.id}`}>
                  <MovieTitle>{persons.title}</MovieTitle>
                </Link>
                <MovieInfo>Character: {persons.character}</MovieInfo>
                <MovieInfo>{persons.release_date}</MovieInfo>
              </MobileView>
            </HoverDetails>

          </MovieWrapper>
        ))}
      </MovieList>
    </div>
  )
}