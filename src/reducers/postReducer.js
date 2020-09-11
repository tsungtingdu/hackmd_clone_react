const postReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_POST_SUCCESS':
      const { id, title, content } = action.data.data
      return {
        ...state,
        id,
        title,
        content
      }
    default:
      return state
  }
}

export default postReducer
