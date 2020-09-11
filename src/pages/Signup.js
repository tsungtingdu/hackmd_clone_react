import React, { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import Navbar from '../components/Navbar'

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
  width: 440px;
  label {
    color: #ffffff;
    font-size: 18px;
    font-weight: 400;
    margin: 15px 0 5px 0;
    display: flex;
    justify-content: space-between;
  }

  input {
    height: 40px;
    font-size: 18px;
    padding: 6px 12px;
    color: #ffffff;
    border: 1px solid #4f4f4f;
    border-radius: 2px;
    background-color: transparent;

    &::-webkit-input-placeholder,
    &::-moz-placeholder,
    &:-ms-input-placeholder,
    &:-moz-placeholder {
      color: #4f4f4f;
    }
  }
`
const HelperText = styled.div`
  display: flex;
  align-items: flex-end;

  p {
    color: #ff6363;
    font-size: 12px;
    margin: 0;
  }
`
const useStyles = makeStyles({
  styledBtn: {
    fontSize: '18px',
    padding: '10px',
    margin: '50px 0 0 0',
    backgroundColor: '#5cb85c',
    borderColor: '#4cae4c',
    color: '#ffffff',
    border: '1px solid transparent',
    borderRadius: '4px',
  },
})

const Signup = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { register, handleSubmit, errors } = useForm()

  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
    passwordCheck: '',
  })
  const clearInput = () => {
    setInput({
      name: '',
      email: '',
      password: '',
      passwordCheck: '',
    })
  }
  const onSubmit = (data) => {
    dispatch({
      type: 'SIGN_UP_REQUEST',
      data,
    })
    clearInput()
  }
  const onChange = (e) => {
    const { name, value } = e.target
    const data = {
      ...input,
      [name]: value,
    }
    setInput(data)
  }

  return (
    <>
      <Navbar />
      <StyledContainer>
        <div className="wrapper">
          <div className="title">Sign up</div>
          <Form action="" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="">
              <span>Username</span>
              {errors.name && (
                <HelperText>
                  <p>{errors.name.message}</p>
                </HelperText>
              )}
            </label>
            <input
              type="text"
              placeholder="Your username"
              name="name"
              value={input.name}
              onChange={onChange}
              ref={register({
                required: 'Please fill in this field.',
                minLength: {
                  value: 2,
                  message: 'Minimum length of username is 2',
                },
              })}
            />
            <label htmlFor="">
              <span>Email</span>
              {errors.email && (
                <HelperText>
                  <p>{errors.email.message}</p>
                </HelperText>
              )}
            </label>
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
                  message: 'Invalid email',
                },
              })}
            />
            <label htmlFor="">
              <span>Password</span>
              {errors.password && (
                <HelperText>
                  <p>
                    {errors.password.message}
                  </p>
                </HelperText>
              )}
            </label>
            <input
              type="text"
              placeholder="Your password"
              name="password"
              value={input.password}
              onChange={onChange}
              ref={register({
                required: 'Please fill in this field.',
                minLength: {
                  value: 8,
                  message: 'Minimum length of password is 8',
                },
              })}
            />

            <label htmlFor="">
              <span>Password check</span>
              {errors.passwordCheck && (
                <HelperText>
                  <p>{errors.passwordCheck.message}</p>
                </HelperText>
              )}
            </label>
            <input
              type="text"
              placeholder="Your password again"
              name="passwordCheck"
              value={input.passwordCheck}
              onChange={onChange}
              ref={register({
                required: 'Please fill in this field.',
                minLength: {
                  value: 8,
                  message: 'Minimum length of password is 8',
                },
              })}
            />
            <Button
              classes={{ root: classes.styledBtn }}
              type="submit"
              variant="contained"
            >
              Sign up
            </Button>
          </Form>
          <div className="foot-text">
            Have an account? <Link to="/signin" className="foot-text__link">
              Sign in
            </Link>
          </div>
        </div>
      </StyledContainer>
    </>
  )
}

export default Signup
