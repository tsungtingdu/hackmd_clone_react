import React, { useEffect } from 'react'
import styled from 'styled-components'
import GridCardsContainer from '../components/GridCardsContainer'
import ListCardsContainer from '../components/ListCardsContainer'

const PostsContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 20px 0;
  overflow-y: auto;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    visibility: hidden;
  }
`

const SectionTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  .title {
    width: 100%;
    color: #ffffff;
    font-size: 26px;
    font-weight: 700;
    display: flex;
    align-items: center;
    &::before,
    &::after {
      content: "";
      width: 100%;
      display: block;
      height: 1px;
      background-color: #686868;
      flex-grow: 1;
    }
    &::before {
      margin-right: 1rem;
    }
    &::after {
      margin-left: 1rem;
    }
  }
`

const Posts = (props) => {
  const { layoutOption } = props
  // for testing, will remove 
  const posts = new Array(10).fill('test')
  return (
    <PostsContainer id="postsContainer">
      <SectionTitle>
        <div className="title">Posts</div>
      </SectionTitle>
      {
        layoutOption.layout === 'GridLayout' ? (<GridCardsContainer posts={posts} />) : (<ListCardsContainer posts={posts} />)
      }
    </PostsContainer>
    )
  }

export default Posts