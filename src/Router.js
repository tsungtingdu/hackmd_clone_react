import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './pages/App'
import EditorPage from './pages/Editor'
import Signin from './pages/Signin'
import Signup from './pages/Signup'

const Router = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/signin"><Signin /></Route>
        <Route path="/signup"><Signup /></Route>
        <Route path="/editor"><EditorPage /></Route>
        <Route path="/"><App /></Route>
      </Switch>
    </BrowserRouter>
  </Provider>
)

export default Router
