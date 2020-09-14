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
    case 'SORT_POST_NEWTOOLD':
      let newToOldPosts = state.posts
      newToOldPosts.sort((a, b) => {
        let dateA = new Date(a.Post.createdAt)
        let dateB = new Date(b.Post.createdAt)
        return dateB - dateA
      })
      return {
        ...state,
        posts: newToOldPosts
      }
    case 'SORT_POST_OLDTONEW':
      let oldToNewPosts = state.posts
      oldToNewPosts.sort((a, b) => {
        let dateA = new Date(a.Post.createdAt)
        let dateB = new Date(b.Post.createdAt)
        return dateA - dateB
      })
      return {
        ...state,
        posts: oldToNewPosts
      }
    case 'SORT_POST_ATOZ':
      let aToZPosts = state.posts
      aToZPosts.sort()
      return {
        ...state,
        posts: aToZPosts
      }
    case 'SORT_POST_ZTOA':
      let zToAPosts = state.posts
      zToAPosts.sort()
      zToAPosts.reverse()
      return {
        ...state,
        posts: zToAPosts
      }
    default:
      return state
  }
}

export default postReducer
