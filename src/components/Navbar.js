import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import docs from '../images/docs.png'

const Nav = styled.div`
  width: 100%;
  height: 50px;
  background-color: #4f4f4f;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  .nav_content {
    margin: auto 1rem;
    height: 20px;
    color: #ffffff;
    font-weight: 900;
    display: flex;
    align-content: center;
    cursor: pointer;
    &_title {
      font-size: 20px;
      line-height: 20px; 
    }
    &_img {
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }
  }
`

const Navbar = (props) => {
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch({
      type: 'CLEAR_POST_REQUEST'
    })
    dispatch({
      type: 'GET_POSTS_REQUEST'
    })
    props.history.push('/')
  }
  return (
    <Nav>
      <div className="nav_content" onClick={handleClick}>
        <img className="nav_content_img" src={docs} />
        <div className="nav_content_title">HeyMD</div>
      </div>
    </Nav>
  )
}

export default withRouter(Navbar)
