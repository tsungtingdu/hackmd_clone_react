import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import _ from "lodash";
import Editor from "for-editor";
import Navbar from "../components/Navbar";
import LoadingMask from "../LoadingMask";
import styled from "styled-components";
import { saveToLocal } from "../apis/postApi";
import "../css/editor.scss";
import io from "socket.io-client";
import { API_ENDPOINT } from "../constant/constant";
import DiffMatchPatch from "diff-match-patch";

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

const Container = styled.div`
  display: flex;
  flex-flow: column-reverse;
`;

const EditorContainer = styled.div``;

const placeholder = "# Put your note title here";

const SocketPage = () => {
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState(1);
  // socket, create room id
  const location = useLocation();
  let roomId = location.pathname.split("/post/");
  roomId = Number(roomId[roomId.length - 1]);

  const [input, setInput] = useState();
  const prevInputRef = useRef();
  const dispatch = useDispatch();

  const getCaretPostion = () => {
    const myElement = document.querySelector("textarea");
    let startPosition = myElement.selectionStart;
    localStorage.setItem("caret", startPosition);
  };

  const setCaretPostion = () => {
    const myElement = document.querySelector("textarea");
    myElement.focus();
    let caret = localStorage.getItem("caret");
    caret = caret ? Number(caret) : null;
    myElement.setSelectionRange(caret, caret);
  };

  const handleChange = (e) => {
    setInput(e);
    saveToLocal({ id: roomId, content: input });
    // get and set local real-time caret position
    getCaretPostion();
    setCaretPostion();
    // socket, emit message
    socket.emit("post", roomId, e);
  };

  const handleKeyPress = (e) => {
    getCaretPostion();
  };

  const handleClick = (e) => {
    // get local real-time caret position
    getCaretPostion();
  };

  const diffSync = (data) => {
    const prevInput = prevInputRef.current;
    let prevContent = data.msg;
    if (prevInput) {
      const dmp = new DiffMatchPatch();
      let patches = dmp.patch_make(prevInput, prevContent);
      let newContent = dmp.patch_apply(patches, prevInput);
      setInput(newContent[0]);
    } else {
      setInput(prevContent);
    }
  };

  const syncMessage = useCallback(
    _.debounce((data) => {
      diffSync(data);
      // set caret back to local position
      setCaretPostion();
    }, 500),
    []
  );

  // set socket & get initial post data
  useEffect(() => {
    setSocket(io(ENDPOINT, { reconnect: true }));
    dispatch({
      type: "GET_POST_REQUEST",
      payload: {
        id: roomId,
      },
    });
  }, []);

  // join a new room
  useEffect(() => {
    if (socket) {
      socket.emit("join", roomId);
    }
  }, [socket]);

  // listening on broadcast message
  useEffect(() => {
    if (socket) {
      socket.on("post", (data) => {
        if (data.room === roomId) {
          syncMessage(data, input);
          setUsers(data.numOfUser);
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
        localStorage.setItem("caret", 0);
      };
    }
  }, [socket]);

  useEffect(() => {
    prevInputRef.current = input;
  }, [input]);

  return (
    <Container>
      <EditorContainer onKeyPress={handleKeyPress} onClick={handleClick}>
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
      </EditorContainer>
      <Navbar style={{ postion: "relative", zIndex: 1 }} users={users} />
      <LoadingMask />
    </Container>
  );
};

export default SocketPage;
