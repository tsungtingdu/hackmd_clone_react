import React from 'react'
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom'
import { useSelector, Provider } from 'react-redux'
import Main from './pages/Main'
import EditorPage from './pages/Editor'
import Signin from './pages/Signin'
import Signup from './pages/Signup'

const Router = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/signup"><Signup /></Route>
        <Route path="/signin"><Signin /></Route>
        <PrivateRoute path="/editor"><EditorPage /></PrivateRoute>
        <PrivateRoute path="/"><Main /></PrivateRoute>
      </Switch>
    </BrowserRouter>
  </Provider>
)

const PrivateRoute = ({ children, ...rest }) => {
  const user = useSelector((state) => state.user.user)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        (user && user.id) ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: location }
              }}
            />
          )
      }
    />
  )
}

export default Router
