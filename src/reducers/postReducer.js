const postReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_POST_SUCCESS':
      return {
        ...state,
        ...action.data
      }
    case 'SAVE_POST_SUCCESS':
      return {
        ...state,
        ...action.data
      }
    default:
      return state
  }
}

export default postReducer