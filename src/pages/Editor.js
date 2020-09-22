import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, withRouter } from "react-router-dom";
import _, { isNull } from "lodash";
import Editor from "for-editor";
import Navbar from "../components/Navbar";
import LoadingMask from "../LoadingMask";
import { saveToLocal, getPostApi } from "../apis/postApi";
import { getToken } from "../apis/userApi";
import "../css/editor.scss";

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

const EditorPage = (props) => {
  const [input, setInput] = useState();
  const dispatch = useDispatch();
  const location = useLocation();

  let post = useSelector((state) => state.post);
  post = post.post && post.post.Post ? post.post.Post : {};

  const fetchData = async () => {
    dispatch({
      type: "DATA_LOADING",
    });
    // clear data
    dispatch({
      type: "CLEAR_POST_REQUEST",
    });
    // retrieve new data
    const postPath = location.pathname;
    const postId = Number(postPath.split("/post/")[1]);
    let token = await getToken();
    let data = {
      id: postId,
      token: token,
    };

    let post = await getPostApi(data);
    if (post.data) {
      dispatch({
        type: "GET_POST_REQUEST",
        payload: {
          id: postId,
        },
      });
    } else {
      props.history.push("/");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const autoSave = useRef(
    _.debounce((data) => {
      dispatch({
        type: "AUTO_SAVE_POST",
        data,
      });
    }, 2000)
  ).current;

  const handleChange = (e) => {
    setInput(e);
    saveToLocal({ id: post.id, content: input });
    autoSave({ id: post.id, content: e });
  };

  const handleSave = () => {
    const data = { id: post.id, content: input };
    dispatch({
      type: "SAVE_POST_REQUEST",
      data,
    });
  };

  useEffect(() => {
    if (post) {
      setInput(post.content);
      saveToLocal({ id: post.id, content: input });
    }
  }, [post]);

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

export default withRouter(EditorPage);
