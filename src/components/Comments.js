import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'
import { ButtonWatch } from './Styling'

export const Comments = ({ movieId, movieTitle }) => {
  const accessToken = useSelector((state) => state.users.accessToken)
  const userId = useSelector((state) => state.users.userId)
  const [comment, setComment] = useState("")
  const [postedComment, setPostedComment] = useState("")

  const CommentCard = styled.div`
    display: flex;
    flex-direction: column;
    height: 35vh;
    margin-bottom: 4vh;
    margin-left: 2vw;
    width: 60vw;
  `
  const CommentForm = styled.form`
  `
  const CommentTitle = styled.h3`
    color: white;
  `
  const CommentLabel = styled.label`
  `
  const CommentTextarea = styled.textarea`
    font-size: 16px;
    height: 12vh;
    margin-bottom: 2vh;
    margin-left: 0;
    margin-top: 1vh;
    resize: none;
    width: 55vw;
  `
  const CommentSendButton = styled.button`
    background: white;
    border: none;
    color: black;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    height: 6vh;
    margin-bottom: 3vh;
    margin-left: 0;
    margin-top: 1vh;
    width: 10vw;
  `

  const handleSubmit = (userId, movieTitle, comment, event) => {
    fetch(`https://final-movie-match.herokuapp.com/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify({ userId, movieId, movieTitle, comment }),
      headers: { "Content-Type": "application/json", "Authorization": accessToken },
    })
      .then(() => {
        setComment("")
        console.log(comment)
        onFormSubmit(comment)
        event.preventDefault()

      })
      .catch(err => console.log("error:", err))
  }

  const onFormSubmit = event => {
    setPostedComment(comment)
    event.preventDefault()

  }

  return (
    <div>
      <form>
        <CommentTitle>Comment</CommentTitle>

        <label>
          <textarea
            value={comment}
            placeholder="Type your thought here..."
            onChange={event => setComment(event.target.value)}
          >
          </textarea>
        </label>

        <ButtonWatch
          type="submit"
          onClick={handleSubmit}
        >
          Submit comment
        </ButtonWatch>

      </form>
    </div>
  )
}