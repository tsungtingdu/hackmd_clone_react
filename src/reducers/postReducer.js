const postReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_POST_SUCCESS":
      const updatedPost = action.resData.data;
      return {
        ...state,
        post: {
          Post: updatedPost,
        },
      };
    case "GET_POSTS_SUCCESS":
      if (!action.resData.data) return state;

      // sorting
      const allPosts = action.resData.data;
      const posts = allPosts.filter((i) => i.role === "owner");
      posts.sort((a, b) => {
        const dateA = new Date(a.Post.updatedAt);
        const dateB = new Date(b.Post.updatedAt);
        return dateB - dateA;
      });
      return {
        ...state,
        allPosts,
        posts,
        dataSet: "OWN_DATASET",
      };
    case "GET_POST_SUCCESS":
      const post = action.resData.data;
      return {
        ...state,
        post,
      };
    case "CLEAR_POST_REQUEST":
      return {
        ...state,
        post: {},
      };
    case "SORT_POST_NEWTOOLD":
      if (!state.posts) return state;

      // sorting
      const newToOldPosts = state.posts;
      newToOldPosts.sort((a, b) => {
        const dateA = new Date(a.Post.updatedAt);
        const dateB = new Date(b.Post.updatedAt);
        return dateB - dateA;
      });
      return {
        ...state,
        posts: newToOldPosts,
      };
    case "SORT_POST_OLDTONEW":
      if (!state.posts) return state;

      // sorting
      const oldToNewPosts = state.posts;
      oldToNewPosts.sort((a, b) => {
        const dateA = new Date(a.Post.updatedAt);
        const dateB = new Date(b.Post.updatedAt);
        return dateA - dateB;
      });
      return {
        ...state,
        posts: oldToNewPosts,
      };
    case "SORT_POST_ATOZ":
      if (!state.posts) return state;

      // sorting
      const aToZPosts = state.posts;
      aToZPosts.sort((a, b) => {
        const aTitle = a.Post.title;
        const bTitle = b.Post.title;
        return aTitle.localeCompare(bTitle);
      });
      return {
        ...state,
        posts: aToZPosts,
      };
    case "SORT_POST_ZTOA":
      if (!state.posts) return state;

      // sorting
      const zToAPosts = state.posts;
      zToAPosts.sort((a, b) => {
        const aTitle = a.Post.title;
        const bTitle = b.Post.title;
        return bTitle.localeCompare(aTitle);
      });
      return {
        ...state,
        posts: zToAPosts,
      };
    case "GET_OWN_DATASET":
      if (!state.allPosts) return state;

      const allPostsForOwn = state.allPosts;
      const ownPosts = allPostsForOwn.filter((i) => i.role === "owner");
      ownPosts.sort((a, b) => {
        const dateA = new Date(a.Post.updatedAt);
        const dateB = new Date(b.Post.updatedAt);
        return dateB - dateA;
      });
      return {
        ...state,
        posts: ownPosts,
        dataSet: "OWN_DATASET",
      };
    case "GET_COLLABORATIVE_DATASET":
      if (!state.allPosts) return state;

      const allPostsForCo = state.allPosts;
      const collaborativePosts = allPostsForCo.filter(
        (i) => i.role !== "owner"
      );
      collaborativePosts.sort((a, b) => {
        const dateA = new Date(a.Post.updatedAt);
        const dateB = new Date(b.Post.updatedAt);
        return dateB - dateA;
      });
      return {
        ...state,
        posts: collaborativePosts,
        dataSet: "COLLABORATIVE_DATASET",
      };
    case "KEYWORD_DATASET":
      if (!state.allPosts) return state;

      const { keyword } = action.payload;
      const allPostsForKeyword = state.allPosts;
      const keywordPosts = allPostsForKeyword.filter((i) => {
        const { title } = i.Post;
        return title.includes(keyword) && i.role === "owner";
      });
      keywordPosts.sort((a, b) => {
        const dateA = new Date(a.Post.updatedAt);
        const dateB = new Date(b.Post.updatedAt);
        return dateB - dateA;
      });
      return {
        ...state,
        posts: keywordPosts,
        dataSet: "OWN_DATASET",
      };
    case "CLEAR_POST":
      return {};
    case "UPDATE_NUMBER_OF_USERS":
      const numOfUser = action.payload.numOfUser;
      let updatedPostWithUser = {
        ...state.post,
        numOfUser,
      };
      return {
        ...state,
        post: updatedPostWithUser,
      };
    default:
      return state;
  }
};

export default postReducer;
