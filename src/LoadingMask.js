import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core'

const useStyles = makeStyles({
  styledProgress: {
    color: '#ffffff',
  },
})
const LoadingMaskContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0%;
  bottom: 0;
  left: 0%;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 999;
`

const LoadingMask = () => {
  const loading = useSelector(state => state.loading)
  const loadingState = loading.loading === true ? loading.loading : false
  const classes = useStyles()

  return (
    <LoadingMaskContainer style={{ display: loadingState ? "flex" : "none" }}>
      <CircularProgress classes={{ root: classes.styledProgress }} />
    </LoadingMaskContainer >
  ) 
}

export default LoadingMask