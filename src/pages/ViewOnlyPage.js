import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, withRouter, useHistory } from "react-router-dom";
import Editor from "for-editor";
import Navbar from "../components/Navbar";
import LoadingMask from "../LoadingMask";
import styled from "styled-components";
import "../css/editor.scss";

const Container = styled.div`
  width: 100%;
  .for-preview {
    margin: 30px auto 0;
    width: 80%;
  }
`;

const toolbar = {};

const ViewOnlyPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [input, setInput] = useState();

  const location = useLocation();
  let [, postId] = location.pathname.split("/post/");
  [postId] = postId.split("/");

  let post = useSelector((state) => state.post);

  // retrieve data
  useEffect(() => {
    dispatch({ type: "GET_VIEW_ONLY_POST_REQUEST", payload: { postId } });
  }, []);

  // show data, or redirect to home
  useEffect(() => {
    if (post?.viewOnlyPost === "NOT FOUND") {
      history.push("/");
    }
    setInput(post?.viewOnlyPost?.content);
  }, [post]);

  return (
    <>
      <LoadingMask />
      <Navbar />
      <Container>
        <Editor
          value={input}
          height="calc(100vh - 50px)"
          subfield={false}
          preview
          toolbar={toolbar}
          language="en"
        />
      </Container>
    </>
  );
};

export default withRouter(ViewOnlyPage);
