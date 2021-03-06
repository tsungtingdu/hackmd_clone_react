import axios from "axios";
import { API_ENDPOINT } from "../constant/constant";

const ENDPOINT = `${API_ENDPOINT}/api`;

const signInApi = async (data) => {
  try {
    const { email, password } = data;
    const res = await axios.post(
      `${ENDPOINT}/user/signin`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (err) {
    return null;
  }
};

const signUpApi = async (data) => {
  try {
    const { name, email, password, passwordCheck } = data;
    const res = await axios.post(
      `${ENDPOINT}/user/signup`,
      {
        name,
        email,
        password,
        passwordCheck,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (err) {
    return null;
  }
};

const getUserApi = async () => {
  try {
    const TOKEN = await getToken();
    const res = await axios.get(`${ENDPOINT}/user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    return res.data;
  } catch (err) {}
};

const signOutApi = async () => {
  try {
    localStorage.setItem("HEYMD_TOKEN", null);
    localStorage.setItem("HEYMD_POSTS", null);
  } catch (err) {}
};

const setToken = async (data) => {
  try {
    localStorage.setItem("HEYMD_USERID", data.user.id);
    return localStorage.setItem("HEYMD_TOKEN", data.token);
  } catch (err) {}
};

const getToken = async () => {
  try {
    return localStorage.getItem("HEYMD_TOKEN");
  } catch (err) {}
};

const removeToken = async () => {
  localStorage.removeItem("HEYMD_TOKEN");
  localStorage.removeItem("HEYMD_USERID");
};

export {
  signInApi,
  signUpApi,
  setToken,
  getToken,
  removeToken,
  signOutApi,
  getUserApi,
};
