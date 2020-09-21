const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "SIGN_IN_SUCCESS":
      const { token, user } = action.data.data;
      return {
        ...state,
        userStatus: "SIGNED_IN",
        token,
        user,
      };
    case "SIGN_UP_SUCCESS":
      return {
        ...state,
        userStatus: "SIGNED_UP",
      };
    case "SIGN_OUT_SUCCESS":
      return {};
    default:
      return state;
  }
};

export default userReducer;
