import React from 'react'
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
  return (
    <MainPageContainer>
      <MenuBar/>
      <PostPanel/>
    </MainPageContainer>
  )
}

export default App
