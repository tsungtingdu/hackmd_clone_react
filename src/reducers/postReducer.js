const postReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_POST_SUCCESS':
      const updatedPost = action.data.data
      return {
        ...state,
        post: {
          Post: updatedPost
        }
      }
    case 'GET_POSTS_SUCCESS':
      if (!action.resData.data) return state

      // sorting
      let allPosts = action.resData.data
      let posts = allPosts.filter( i => i.role === 'owner')
      posts.sort((a, b) => {
        let dateA = new Date(a.Post.updatedAt)
        let dateB = new Date(b.Post.updatedAt)
        return dateB - dateA
      })
      return {
        ...state,
        allPosts: allPosts,
        posts: posts
      }
    case 'GET_POST_SUCCESS':
      let post = action.resData.data
      return {
        ...state,
        post: post
      }
    case 'CLEAR_POST_REQUEST':
      return {
        ...state,
        post: {}
      }
    case 'SORT_POST_NEWTOOLD':
      if (!state.posts) return state

      // sorting
      let newToOldPosts = state.posts
      newToOldPosts.sort((a, b) => {
        let dateA = new Date(a.Post.updatedAt)
        let dateB = new Date(b.Post.updatedAt)
        return dateB - dateA
      })
      return {
        ...state,
        posts: newToOldPosts
      }
    case 'SORT_POST_OLDTONEW':
      if (!state.posts) return state

      // sorting
      let oldToNewPosts = state.posts
      oldToNewPosts.sort((a, b) => {
        let dateA = new Date(a.Post.updatedAt)
        let dateB = new Date(b.Post.updatedAt)
        return dateA - dateB
      })
      return {
        ...state,
        posts: oldToNewPosts
      }
    case 'SORT_POST_ATOZ':
      if (!state.posts) return state

      // sorting
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
      if (!state.posts) return state

      // sorting
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
      if (!state.allPosts) return state

      let allPostsForOwn = state.allPosts
      let ownPosts = allPostsForOwn.filter(i => i.role === 'owner')
      ownPosts.sort((a, b) => {
        let dateA = new Date(a.Post.updatedAt)
        let dateB = new Date(b.Post.updatedAt)
        return dateB - dateA
      })
      return {
        ...state,
        posts: ownPosts
      }
    case 'GET_COLLABORATIVE_DATASET':
      if (!state.allPosts) return state

      let allPostsForCo = state.allPosts
      let collaborativePosts = allPostsForCo.filter(i => i.role !== 'owner')
      collaborativePosts.sort((a, b) => {
        let dateA = new Date(a.Post.updatedAt)
        let dateB = new Date(b.Post.updatedAt)
        return dateB - dateA
      })
      return {
        ...state,
        posts: collaborativePosts
      }
    case 'CLEAR_POST':
      return {}
    default:
      return state
  }
}

export default postReducer
