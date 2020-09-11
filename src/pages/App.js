import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch({
      type: 'CREATE_POST_REQUEST',
    })
  }
  return (
    <>
      <div>Hello world!</div>
      <Link to="/editor" onClick={handleClick}>
        Create a new post
      </Link>
    </>
  )
}

export default App
