import userApi from '../apis/userApi'

const { signInApi, signUpApi } = userApi

const userReducer = async (state = {}, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return await signInApi(action.data)
    case 'SIGN_UP':
      return await signUpApi(action.data)
    default:
      return state
  }
}

export default userReducer
