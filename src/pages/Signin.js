import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Link, withRouter } from 'react-router-dom'
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
    border: 1px solid  #4f4f4f;
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

const Signin = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const userState = useSelector(state => state.user)
  const { register, handleSubmit, errors } = useForm()
  const [input, setInput] = useState({
    email: '',
    password: '',
  })

  const handleRedirect = () => {
    if (userState && userState.user && userState.user.id) {
      props.history.push('/')
    } 
  }
  
  useEffect(() => {
    handleRedirect()
  }, [userState])

  const clearInput = () => {
    setInput({ email: '', password: '' })
  }

  const onSubmit = (data) => {
    dispatch({
      type: 'SIGN_IN_REQUEST',
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
          <div className="title">Sign in</div>
          <Form
            action=""
            onSubmit={handleSubmit(onSubmit)}
          >
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
                  <p>{errors.password.message}</p>
                </HelperText>
              )}
            </label>
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
                  message: 'Minimum length of password is 8',
                },
              })}
            />

            <Button
              classes={{ root: classes.styledBtn }}
              type="submit"
              variant="contained"
            >
              Sign in
            </Button>
          </Form>
          <div className="foot-text">
            New to HeyMD? <Link to="/signup" className="foot-text__link">Sign up</Link>
          </div>
        </div>
      </StyledContainer>
    </>
  )
}

export default withRouter(Signin)
