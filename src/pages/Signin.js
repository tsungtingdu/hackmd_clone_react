import React, { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom'
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

      &__link {
        color: #ffffff;
      }
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
  }
`
const HelperText = styled.p`
  color: #ff6363;
  font-size: 12px;
  text-align: left;
  margin: 5px 0;
`

const Signin = () => {
  const dispatch = useDispatch()
  const { register, handleSubmit, errors } = useForm()
  const [input, setInput] = useState({
    email: '',
    password: ''
  })

  const onSubmit = (data) => {
    dispatch({
      type: 'SIGN_IN_REQUEST',
      data,
    })
    clearInput()
  }

  const onChange = e => {
    let { name, value } = e.target
    let data = {
      ...input,
      [name]: value
    }
    setInput(data)
  }

  const clearInput = () => {
    setInput({ email: '', password: '' })
  }

  return (
    <Fragment>
      <Navbar />
      <StyledContainer >
        <div className="wrapper">
          <div className="title">Sign in</div>
          <Form action=""
            onSubmit={handleSubmit(onSubmit)} >
            <label htmlFor="">Email</label>
            <input
              type="text"
              placeholder="Your email"
              name="email"
              value={input.email}
              onChange={onChange}
              ref={register({
                required: 'Please fill in this field.',
                pattern: {
                  value: /^([a-zA-Z0-9_\-\\.]+)@([a-zA-Z0-9_\-\\.]+)\.([a-zA-Z]{2,5})$/,
                  message: "Invalid email",
                }
              })} />
            {errors.email && (
              <HelperText>
                {errors.email.message}
              </HelperText>
            )}
            <label htmlFor="">Password</label>
            <input
              type="password"
              placeholder="Your password"
              name="password"
              value={input.password}
              onChange={onChange}
              ref={register({
                required: 'Please fill in this field.',
                minLength: {
                  value: 8,
                  message: "Minimum length of password is 8",
                },
              })} />
            {errors.password && (
              <HelperText>
                {errors.password.message}
              </HelperText>
            )}
            <Button type="submit" variant="contained" color="primary">Sign in</Button>

          </Form>
          <div className="foot-text">New to HeyMD? <Link to="/signup" className="foot-text__link">Sign up</Link></div>
        </div>
      </StyledContainer>
    </Fragment>
  )
}

export default Signin