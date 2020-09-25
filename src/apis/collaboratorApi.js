import axios from "axios";
import { API_ENDPOINT } from "../constant/constant";

const ENDPOINT = `${API_ENDPOINT}/api`;

const getCollaborators = async (data) => {
  try {
    const res = await axios.get(`${ENDPOINT}/collaborators/${data.id}`, {
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

const addCollaborator = async (data) => {
  try {
    const res = await axios.post(
      `${ENDPOINT}/collaborator/${data.id}`,
      {
        email: data.email,
        role: "collaborator",
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
const removeCollaborator = async (data) => {
  try {
    const res = await axios.put(
      `${ENDPOINT}/collaborator/${data.id}`,
      {
        email: data.email,
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
export { getCollaborators, addCollaborator, removeCollaborator };
