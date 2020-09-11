const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SIGN_IN_SUCCESS':
      const { token, user } = action.data.data
      return {
        ...state,
        token,
        user
      }
    case 'SIGN_UP_SUCCESS':
      return state
    default:
      return state
  }
}

export default userReducer
