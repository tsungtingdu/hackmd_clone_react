import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import _ from "lodash";
import Editor from "for-editor";
import Navbar from "../components/Navbar";
import LoadingMask from "../LoadingMask";
import { saveToLocal } from "../apis/postApi";
import "../css/editor.scss";
import socket from "../apis/socketApi";

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
  save: true,
  subfield: true,
};

const placeholder = "# Put your note title here";

const SocketPage = () => {
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

  // socket test
  useEffect(() => {
    socket.on("post", (data) => {
      if (data.room === roomId) {
        setInput(data.msg);
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
  }, []);

  const handleSave = () => {
    const data = { id: post.id, content: input };
    dispatch({
      type: "SAVE_POST_REQUEST",
      data,
    });
  };

  return (
    <>
      <LoadingMask />
      <Navbar />
      <Editor
        value={input}
        height="calc(100vh - 50px)"
        onChange={handleChange}
        onSave={handleSave}
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
