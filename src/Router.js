import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import App from './pages/App'
import Signin from './pages/Signin'
import Signup from './pages/Signup'

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/signin' ><Signin /></Route>
        <Route path='/signup'><Signup /></Route>
        <Route path="/" ><App /></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router