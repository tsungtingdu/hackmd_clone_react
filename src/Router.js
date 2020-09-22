import React from "react";
import {
  Route,
  Switch,
  BrowserRouter,
  Redirect,
  useLocation,
} from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import Main from "./pages/Main";
import EditorPage from "./pages/Editor";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import SocketPage from "./pages/Socket";

const Router = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/signin">
          <Signin />
        </Route>
        <PrivateRoute path="/editor">
          <EditorPage />
        </PrivateRoute>
        <PrivateRoute path="/post/:id">
          <EditorPage />
        </PrivateRoute>
        {/* for development use */}
        <PrivateRoute path="/socket/post/:id">
          <SocketPage />
        </PrivateRoute>
        {/* for development use */}
        <PrivateRoute path="/">
          <Main />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  </Provider>
);

const PrivateRoute = ({ children, ...rest }) => {
  const isAuthenticated = localStorage.getItem("HEYMD_TOKEN");
  const dispatch = useDispatch();
  const location = useLocation();

  // get data back to store
  if (
    isAuthenticated !== null &&
    isAuthenticated !== "null" &&
    isAuthenticated !== undefined
  ) {
    // user data
    dispatch({ type: "GET_USER_REQUEST" });
    // all posts data
    dispatch({ type: "GET_POSTS_REQUEST" });
    // working post data
    const postPath = location.pathname;
    const postId = Number(postPath.split("/post/")[1]);
    if (!isNaN(postId)) {
      dispatch({
        type: "GET_POST_REQUEST",
        payload: {
          id: postId,
        },
      });
    }
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated !== null &&
        isAuthenticated !== "null" &&
        isAuthenticated !== undefined ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default Router;
