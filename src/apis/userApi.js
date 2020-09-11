import axios from 'axios'

const ENDPOINT = 'https://hackmd-clone.herokuapp.com/api'

const signInApi = async (data) => {
  try {
    const { email, password } = data
    const res = await axios.post(
      `${ENDPOINT}/user/signin`,
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    return res.data
  } catch (err) {
    return {}
  }
}

const signUpApi = async (data) => {
  try {
    const {
      name, email, password, passwordCheck,
    } = data
    const res = await axios.post(`${ENDPOINT}/user/signup`, {
      name, email, password, passwordCheck,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return res.data
  } catch (err) {
    return {}
  }
}

const setToken = async (data) => {
  try {
    return localStorage.setItem('HEYMD_TOKEN', data.token)
  } catch (err) {

  }
}

const getToken = async () => {
  try {
    return localStorage.getItem('HEYMD_TOKEN')
  } catch (err) {

  }
}

const removeToken = async () => {
  localStorage.removeItem('HEYMD_TOKEN')
}

export {
  signInApi, signUpApi, setToken, getToken, removeToken,
}
