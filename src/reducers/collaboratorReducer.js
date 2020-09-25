const collaboratorReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_COLLABORATORS_SUCCESS":
      return {
        ...state,
        ...action.resData,
      };
    default:
      return state;
  }
};

export default collaboratorReducer;
