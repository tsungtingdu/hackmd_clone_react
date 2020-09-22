import React, { Fragment, useEffect, useState } from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import Main from "./pages/Main";
import EditorPage from "./pages/Editor";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import SocketPage from "./pages/Socket";
import LoadingMask from "./LoadingMask";
import { getUserApi } from "./apis/userApi";

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
  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState(false);
  const dispatch = useDispatch();

  const fetchData = async () => {
    let user = await getUserApi();
    let userId = user ? user.data.user.id : null;

    // check login auth
    if (userId) {
      setLogin(true);
      dispatch({ type: "GET_USER_REQUEST" });
      dispatch({ type: "GET_POSTS_REQUEST" });
    } else {
      setLogin(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      {loading ? (
        <LoadingMask />
      ) : (
        <Route
          {...rest}
          render={({ location }) =>
            login ? (
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
      )}
    </Fragment>
  );
};

export default Router;
