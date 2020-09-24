import axios from "axios";
import { getTitle } from "../utilities/getTitle";
import { getToken } from "./userApi";
import { API_ENDPOINT } from "../constant/constant";

const ENDPOINT = `${API_ENDPOINT}/api`;

const createPostApi = async (TOKEN) => {
  try {
    const res = await axios.post(
      `${ENDPOINT}/post`,
      {
        title: "Untitled",
        content: "",
        status: "private",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    return null;
  }
};

const updatePostStatusApi = async (data) => {
  try {
    const res = await axios.put(
      `${ENDPOINT}/post/${data.id}`,
      {
        status: data.status ? data.status : "private",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    return null;
  }
};

const getPostsApi = async (data) => {
  try {
    const res = await axios.get(`${ENDPOINT}/posts`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
    });
    return res.data;
  } catch (err) {
    return null;
  }
};

const getPostApi = async (data) => {
  try {
    const res = await axios.get(`${ENDPOINT}/post/${data.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
    });
    return res.data;
  } catch (err) {
    return null;
  }
};

const DeletePostApi = async (data) => {
  try {
    const res = await axios.delete(`${ENDPOINT}/post/${data.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
    });
    return res.data;
  } catch (err) {
    return null;
  }
};

const saveToLocal = (data) => {
  let posts = JSON.parse(localStorage.getItem("HEYMD_POSTS"));
  if (!posts) posts = {};
  if (data.id && data.content) {
    posts[data.id] = {
      content: data.content ? data.content : posts[data.id].content,
      updatedAt: new Date(),
    };
  }
  localStorage.setItem("HEYMD_POSTS", JSON.stringify(posts));
};

const autoSaveApi = async (data) => {
  try {
    const TOKEN = await getToken();
    const res = await axios.put(
      `${ENDPOINT}/post/${data.id}`,
      {
        title: getTitle(data.content),
        content: data.content,
        status: data.status ? data.status : "private",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    return null;
  }
};

export {
  createPostApi,
  updatePostStatusApi,
  saveToLocal,
  getPostsApi,
  getPostApi,
  DeletePostApi,
  autoSaveApi,
};
