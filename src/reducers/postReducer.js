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
      let allPosts = action.resData.data
      let posts = allPosts.filter( i => i.role === 'owner')
      posts.sort((a, b) => {
        let dateA = new Date(a.Post.createdAt)
        let dateB = new Date(b.Post.createdAt)
        return dateB - dateA
      })
      return {
        ...state,
        allPosts: allPosts,
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
      aToZPosts.sort((a, b) => {
        let aTitle = a.Post.title
        let bTitle = b.Post.title
        return aTitle.localeCompare(bTitle)
      })
      return {
        ...state,
        posts: aToZPosts
      }
    case 'SORT_POST_ZTOA':
      let zToAPosts = state.posts
      zToAPosts.sort((a, b) => {
        let aTitle = a.Post.title
        let bTitle = b.Post.title
        return bTitle.localeCompare(aTitle)
      })
      return {
        ...state,
        posts: zToAPosts
      }
    case 'GET_OWN_DATASET':
      let allPostsForOwn = state.allPosts
      let ownPosts = allPostsForOwn.filter(i => i.role === 'owner')
      return {
        ...state,
        posts: ownPosts
      }
    case 'GET_COLLABORATIVE_DATASET':
      let allPostsForCo = state.allPosts
      let collaborativePosts = allPostsForCo.filter(i => i.role !== 'owner')
      return {
        ...state,
        posts: collaborativePosts
      }
    default:
      return state
  }
}

export default postReducer
