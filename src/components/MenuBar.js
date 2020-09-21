import React, { useState, useRef } from "react";
import _ from "lodash";
import styled from "styled-components";
import { Input } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

const MenuBarContainer = styled.div`
  min-width: 270px;
  height: 100vh;
  display: flex;
  flex-flow: column;
  background-color: #262626;

  .title {
    padding: 0 20px;
    height: 65px;
    font-weight: 600;
    font-size: 18px;
    color: #ffffff;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    span {
      margin-left: 15px;
    }
  }

  .searchBar {
    padding: 0 20px;
    height: 60px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    &__form {
      width: 100%;
      padding: 5px 10px;
      background-color: #333;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      input {
        flex: 1 1 200px;
        color: #ffffff;
        font-family: "Source Sans Pro", sans-serif;
      }

      i {
        color: #ffffff;
        background-color: transparent;
      }
    }
  }
  .newNote {
    padding: 0 20px;
    margin-top: 10px;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-decoration: none;
    &:hover {
      background-color: #333;
    }
    &__icon {
      height: 34px;
      width: 34px;
      border-radius: 50%;
      background-color: #5cb85c;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 700;
      font-size: 36px;
      margin-right: 15px;
    }
    &__text {
      color: #ffffff;
      font-weight: 600;
      font-size: 18px;
    }
  }
  .postSelector {
    height: 60px;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 20px;

    &__option {
      cursor: pointer;
      padding: 10px 20px;
      display: flex;
      width: 100%;
      color: #ffffff;
      font-weight: 600;
      font-size: 16px;
      &:hover {
        background-color: #333;
      }

      &-icon {
        display: flex;
        justify-content: center;
        width: 10px;
        margin: auto 15px auto 12px;
      }
    }
  }
  .profile {
    cursor: pointer;
    position: relative;
    margin-top: auto;
    padding: 0 20px;
    height: 55px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #ffffff;
    &__avatar {
      font-size: 18px;
      margin-right: 10px;
    }
    &__text {
      width: 100px;
      font-size: 14px;
      font-weight: 600;
    }
    &__btn {
      width: 30px;
      height: 30px;
      font-size: 18px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        background-color: #333;
      }
    }
    &__menu {
      cursor: pointer;
      position: absolute;
      top: 0;
      transform: translate(0, -100%);
      background-color: #686868;
      border-radius: 4px;
      width: 80%;
      &__option {
        display: flex;
        align-items: center;
        font-size: 14px;
        height: 30px;
        margin: 10px 0;
        padding: 0 15px;
        font-weight: 600;
        i {
          margin-right: 10px;
        }
        &:hover {
          background-color: #aaa;
        }
      }
    }
  }
`;
const useStyles = makeStyles({
  styledInput: {
    width: "100%",
    padding: "0 10px",
  },
});

const MenuBar = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [profileMenu, setProfileMenu] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { layoutOption, setLayoutOption } = props;

  const handleProfileMenu = () => {
    if (profileMenu === false) {
      setProfileMenu(true);
    } else {
      setProfileMenu(false);
    }
  };
  const handleLogout = () => {
    dispatch({
      type: "SIGN_OUT_REQUEST",
    });
    props.history.push("/signin");
  };
  const handleCreatePost = () => {
    dispatch({
      type: "CREATE_POST_REQUEST",
    });
  };

  const keywordSearch = useRef(
    _.debounce((keyword) => {
      dispatch({
        type: "KEYWORD_DATASET",
        payload: {
          keyword,
        },
      });
    }, 500)
  ).current;

  const handleKeyword = (e) => {
    setKeyword(e.target.value);
    keywordSearch(e.target.value);
  };

  const handleDataSet = (data) => {
    setKeyword("");
    if (data === "own") {
      dispatch({
        type: "GET_OWN_DATASET",
      });
    }
    if (data === "collaborative") {
      dispatch({
        type: "GET_COLLABORATIVE_DATASET",
      });
    }
    setLayoutOption({
      ...layoutOption,
      sort: "NewToOld",
    });
  };

  return (
    <MenuBarContainer>
      <div className="title">
        <i className="fas fa-user-alt" />
        <span>My Workspace</span>
      </div>
      <div className="searchBar">
        <form action="" className="searchBar__form">
          <Input
            type="search"
            name="keyword"
            id=""
            value={keyword}
            onChange={handleKeyword}
            classes={{ root: classes.styledInput }}
            placeholder="Search my notes"
          />
        </form>
      </div>
      <Link className="newNote" to="/editor" onClick={handleCreatePost}>
        <div className="newNote__icon">+</div>
        <div className="newNote__text">New note</div>
      </Link>
      <div className="postSelector">
        <div
          className="postSelector__option"
          onClick={() => handleDataSet("own")}
        >
          <div className="postSelector__option-icon">
            <i className="fas fa-lock" />
          </div>
          My Notes
        </div>
        <div
          className="postSelector__option"
          onClick={() => handleDataSet("collaborative")}
        >
          <div className="postSelector__option-icon">
            <i className="fas fa-users" />
          </div>
          Collaborative Notes
        </div>
      </div>
      <div className="profile" onClick={handleProfileMenu}>
        {profileMenu ? (
          <div className="profile__menu">
            <div className="profile__menu__option" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt" />
              <p>Sign out</p>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="profile__avatar">
          <i className="fas fa-user-circle" />
        </div>
        <div className="profile__text">Profile</div>
        <div className="profile__btn">
          {profileMenu ? (
            <i className="fas fa-angle-down" />
          ) : (
            <i className="fas fa-angle-up" />
          )}
        </div>
      </div>
    </MenuBarContainer>
  );
};

export default withRouter(MenuBar);
