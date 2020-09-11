const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SIGN_IN_SUCCESS':
      return {
        ...state,
        ...action.data
      }
    case 'SIGN_UP_SUCCESS':
      return {
        ...state,
        ...action.data
      }
    default:
      return state
  }
}

export default userReducer