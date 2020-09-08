import axios from 'axios'

const ENDPOINT = 'https://hackmd-clone.herokuapp.com/api'

const userApi = {
  signInApi: async (data) => {
    try {
      const { email, password } = data
      const res = await axios.post(`${ENDPOINT}/user/signin`, { email, password }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return res.data
    } catch (err) {
      return {}
    }
  },
  signUpApi: async (data) => {
    try {
      const { name, email, password, passwordCheck } = data
      const res = await axios.post(`${ENDPOINT}/user/signup`, { name, email, password, passwordCheck }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return res.data
    } catch (err) {
      return {}
    }
  }
}

export default userApi
