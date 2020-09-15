import React, { useState, Fragment } from 'react'
import styled from 'styled-components'
import MenuBar from '../components/MenuBar'
import PostPanel from '../components/PostPanel'
import LoadingMask from '../LoadingMask'

const MainPageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #333;
`

const App = () => {
  const [layoutOption, setLayoutOption] = useState({
    menuDisplay: false,
    layout: 'GridLayout',
    sort: 'NewToOld'
  })
  return (
    <Fragment>
      <LoadingMask />
      <MainPageContainer>
        <MenuBar layoutOption={layoutOption} setLayoutOption={setLayoutOption}/>
        <PostPanel layoutOption={layoutOption} setLayoutOption={setLayoutOption} />
      </MainPageContainer>
    </Fragment>
  )
}

export default App
