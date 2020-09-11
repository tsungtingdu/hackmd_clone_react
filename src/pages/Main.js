import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import MenuBar from '../components/MenuBar'
import PostPanel from '../components/PostPanel'

const MainPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: #333;
`

const App = () => {
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch({
      type: 'CREATE_POST_REQUEST',
    })
  }
  return (
    <MainPageContainer>
      <MenuBar/>
      <PostPanel/>
    </MainPageContainer>
  )
}

export default App
