import React from 'react'
import styled from 'styled-components'

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
    }
  }
`

const Navbar = () => (
  <Nav>
    <div className="nav_content">
      <div className="nav_content_title">HeyMD</div>
    </div>
  </Nav>
)

export default Navbar
