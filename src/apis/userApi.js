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

const getUserApi = async () => {
  try {
    const TOKEN = await getToken()
    const res = await axios.get(`${ENDPOINT}/user`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
    })
    return res.data
  } catch (err) {
    return
  }
}

const signOutApi = async () => {
  try {
    localStorage.setItem('HEYMD_TOKEN', null)
  } catch (err) {

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
  signInApi, signUpApi, setToken, getToken, removeToken, signOutApi, getUserApi
}
