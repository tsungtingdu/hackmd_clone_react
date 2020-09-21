import { combineReducers } from "redux";

import userReducer from "./userReducer";
import postReducer from "./postReducer";
import loadingReducer from "./loadingReducer";

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
  loading: loadingReducer,
});

export default rootReducer;
