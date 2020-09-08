import React, { Fragment } from 'react'
import Navbar from '../conponents/Navbar'
import { Button } from '@material-ui/core'
import styled from 'styled-components'

const StyledContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 50px);
  margin: 0;
  background-color: #333;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;

  .wrapper {
    max-width: 440px;
    margin: 0 auto;
    display: flex;
    flex-flow: column;
    justify-content: center;

    .title {
      text-align: center;
      margin: 40px 0 30px 0;
      color: #ffffff;
      font-weight: 600;
      font-size: 28px;
    }

    .foot-text {
      text-align: center;
      margin: 30px 0;
      color: #ffffff;
      font-weight: 400;
      font-size: 18px;
    }
  }

  .label {
    color: #ffffff;
    font-size: 18px;
    margin: 10px 0 5px 0;
  }
`
const Form = styled.form`
  display: flex;
  flex-flow: column;
  
  label {
    color: #ffffff;
    font-size: 18px;
    font-weight: 400;
    margin: 0 0 5px 0;
  }

  input {
    height: 40px;
    font-size: 18px;
    padding: 6px 12px;
    border-radius: 4px;
    margin-bottom: 15px;
  }
`

const Signup = () => {
  return (
    <Fragment>
      <Navbar />
      <StyledContainer >
        <div className="wrapper">
          <div className="title">Sign up</div>
          <Form action="">
            <label htmlFor="">Username</label>
            <input
              type="text"
              placeholder="Your username"
              name="username" />
            <label htmlFor="">Email</label>
            <input
              type="text"
              placeholder="Your email"
              name="email" />
            <label htmlFor="">Password</label>
            <input
              type="text"
              placeholder="Your password"
              name="password" />
            <label htmlFor="">Password check</label>
            <input
              type="text"
              placeholder="Your password again"
              name="passwordCheck" />

            <Button variant="contained" color="primary">Sign up</Button>

          </Form>
          <div className="foot-text">Have an account? <span>Sign in</span></div>
        </div>
      </StyledContainer>
    </Fragment>
  )
}

export default Signup