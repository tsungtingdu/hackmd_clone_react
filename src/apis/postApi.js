import axios from "axios";
import { getTitle } from "../utilities/getTitle";
import { getToken } from "./userApi";

const ENDPOINT = "https://hackmd-clone.herokuapp.com/api";

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
      },
    );
    return res.data;
  } catch (err) {
    return {};
  }
};

const savePostApi = async (data) => {
  try {
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
          Authorization: `Bearer ${data.token}`,
        },
      },
    );
    return res.data;
  } catch (err) {
    return {};
  }
};

const getPostsApi = async (data) => {
  try {
    const res = await axios.get(
      `${ENDPOINT}/posts`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
      },
    );
    return res.data;
  } catch (err) {
    return {};
  }
};

const getPostApi = async (data) => {
  try {
    const res = await axios.get(
      `${ENDPOINT}/post/${data.id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
      },
    );
    return res.data;
  } catch (err) {
    return {};
  }
};

const DeletePostApi = async (data) => {
  try {
    const res = await axios.delete(
      `${ENDPOINT}/post/${data.id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
      },
    );
    return res.data;
  } catch (err) {
    return {};
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
    console.log("api called!");
    console.log(data);
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
      },
    );
    return res.data;
  } catch (err) {
    return {};
  }
};

export {
  createPostApi, savePostApi, saveToLocal, getPostsApi, getPostApi, DeletePostApi, autoSaveApi,
};
