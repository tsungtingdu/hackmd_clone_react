import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

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

    &_title {
      font-size: 20px;
      line-height: 20px;
      cursor: pointer;
    }
  }
`

const Navbar = (props) => {
  const dispatch = useDispatch()
  const handleClick = () => {
    props.history.push('/')
    dispatch({
      type: 'GET_POSTS_REQUEST'
    })
  }
  return (
    <Nav>
      <div className="nav_content">
        <div className="nav_content_title" onClick={handleClick}>HeyMD</div>
      </div>
    </Nav>
  )
}

export default withRouter(Navbar)
