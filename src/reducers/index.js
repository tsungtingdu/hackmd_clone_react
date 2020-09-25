import { combineReducers } from "redux";

import userReducer from "./userReducer";
import postReducer from "./postReducer";
import loadingReducer from "./loadingReducer";
import collaboratorReducer from "./collaboratorReducer";

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
  loading: loadingReducer,
  collaborator: collaboratorReducer,
});

export default rootReducer;
