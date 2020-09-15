const loadingReducer = (state = {}, action) => {
  switch (action.type) {
    case 'DATA_LOADING':
      return {
        ...state,
        loading: true
      }
    case 'DATA_LOADED':
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}

export default loadingReducer
