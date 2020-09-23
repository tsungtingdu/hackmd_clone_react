import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import _ from "lodash";
import Editor from "for-editor";
import Navbar from "../components/Navbar";
import LoadingMask from "../LoadingMask";
import { saveToLocal } from "../apis/postApi";
import "../css/editor.scss";
import io from "socket.io-client";
import { API_ENDPOINT } from "../constant/constant";

const ENDPOINT = API_ENDPOINT;
const toolbar = {
  h1: true,
  h2: true,
  h3: true,
  h4: true,
  img: true,
  link: true,
  code: true,
  preview: true,
  expand: false,
  undo: true,
  redo: true,
  save: false,
  subfield: true,
};

const placeholder = "# Put your note title here";

const SocketPage = () => {
  const [socket, setSocket] = useState(null);
  // socket, create room id
  const location = useLocation();
  let roomId = location.pathname.split("/post/");
  roomId = Number(roomId[roomId.length - 1]);

  const [input, setInput] = useState();
  const dispatch = useDispatch();
  let post = useSelector((state) => state.post);

  const handleChange = (e) => {
    setInput(e);
    saveToLocal({ id: post.id, content: input });

    // socket, emit message
    socket.emit("post", roomId, e);
  };

  // set socket
  useEffect(() => {
    setSocket(io(ENDPOINT, { reconnect: true }));
  }, []);

  // join a new room
  useEffect(() => {
    if (socket) {
      socket.emit("join", roomId);
    }
  }, [socket]);

  const syncMessage = useRef(
    _.debounce((data) => {
      setInput(data.msg);
    }, 600)
  ).current;

  // listening on broadcast message
  useEffect(() => {
    if (socket) {
      socket.on("post", (data) => {
        if (data.room === roomId) {
          syncMessage(data);
          dispatch({
            type: "UPDATE_NUMBER_OF_USERS",
            payload: {
              numOfUser: data.numOfUser,
            },
          });
        }
      });
      return () => {
        socket.close();
      };
    }
  }, [socket]);

  return (
    <>
      <LoadingMask />
      <Navbar />
      <Editor
        value={input}
        height="calc(100vh - 50px)"
        onChange={handleChange}
        subfield
        preview
        toolbar={toolbar}
        placeholder={placeholder}
        language="en"
      />
    </>
  );
};

export default SocketPage;
