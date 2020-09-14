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
    case 'GET_POSTS_SUCCESS':
      let posts = action.resData.data
      posts = posts.filter( i => i.role === 'owner')
      posts.sort((a, b) => {
        let dateA = new Date(a.Post.createdAt)
        let dateB = new Date(b.Post.createdAt)
        return dateB - dateA
      })
      return {
        ...state,
        posts: posts
      }
    default:
      return state
  }
}

export default postReducer
