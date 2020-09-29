import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import Router from "./Router";
import "./css/index.scss";
import configStore from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

const store = configStore();

const StyledToastContainer = styled.div`
  .Toastify__toast {
    border-radius: 4px;
    padding: 15px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
    &-body {
      font-family: "Source Sans Pro", sans-serif;
      font-weight: 700;
      margin: 0;
      display: flex;
      align-items: center;
    }
    &--success {
      background-color: #5cb85c;
    }
    &--error {
      background-color: #c9302c;
    }
  }
`;

ReactDOM.render(
  <Fragment>
    <StyledToastContainer>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </StyledToastContainer>
    <Router store={store} />
  </Fragment>,
  document.getElementById("root")
);
