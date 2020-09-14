import axios from 'axios'

const ENDPOINT = 'https://hackmd-clone.herokuapp.com/api'

const createPostApi = async (TOKEN) => {
  try {
    const res = await axios.post(
      `${ENDPOINT}/post`,
      {
        title: '',
        content: '',
        status: 'private',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
      },
    )
    return res.data
  } catch (err) {
    return {}
  }
}

const savePostApi = async (data) => {
  try {
    const res = await axios.put(
      `${ENDPOINT}/post/${data.id}`,
      {
        title: data.title,
        content: data.content,
        status: data.status ? data.status : 'private',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.token}`,
        },
      },
    )
    return res.data
  } catch (err) {
    return {}
  }
}

const getPostsApi = async (data) => {
  try {
    const res = await axios.get(
      `${ENDPOINT}/posts`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.token}`,
        },
      },
    )
    return res.data
  } catch (err) {
    return {}
  }
}

const getPostApi = async (data) => {
  try {
    const res = await axios.get(
      `${ENDPOINT}/post/${data.id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.token}`,
        },
      },
    )
    return res.data
  } catch (err) {
    return {}
  }
}

const saveToLocal = (data) => {
  localStorage.setItem(`HEYMD_CONTENT_${data.id}`, data.content)
}

export { createPostApi, savePostApi, saveToLocal, getPostsApi, getPostApi}
