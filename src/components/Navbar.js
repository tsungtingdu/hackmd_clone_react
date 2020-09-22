import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { withRouter, useLocation } from "react-router-dom";
import docs from "../images/docs.png";

const Nav = styled.div`
  width: 100%;
  height: 50px;
  background-color: #4f4f4f;
  display: flex;
  justify-content: space-between;
  align-content: center;
  .nav_content {
    margin: auto 1rem;
    height: 20px;
    color: #ffffff;
    font-weight: 900;
    display: flex;
    align-content: center;
    cursor: pointer;
    &_title {
      font-size: 20px;
      line-height: 20px;
    }
    &_img {
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }
  }
`;

const Connection = styled.div`
  height: 100%;
  padding: 15px;
  display: flex;
  align-items: center;
`;

const Badge = styled.div`
  display: flex;
  font-size: 15px;
  line-height: 20px;
  padding: 5px 10px;
  background-color: #337ab7;
  border-radius: 4px;
  .icon {
    color: #ffffff;
    margin-right: 5px;
  }
  .text {
    color: #ffffff;
    font-weight: 700;
  }
`;

const DisconnectBadge = styled.div`
  display: flex;
  font-size: 15px;
  line-height: 20px;
  padding: 5px 10px;
  background-color: #c9302c;
  border-radius: 4px;
  .icon {
    color: #ffffff;
    margin-right: 5px;
  }
  .text {
    color: #ffffff;
    font-weight: 700;
  }
`;

const Navbar = (props) => {
  // get location
  const location = useLocation();
  let roomId = location.pathname.split("/post/");
  roomId = Number(roomId[roomId.length - 1]);

  // get post data
  let post = useSelector((state) => state.post);
  let numOfUser = post.post ? post.post.numOfUser : null;

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch({
      type: "CLEAR_POST_REQUEST",
    });
    dispatch({
      type: "GET_POSTS_REQUEST",
    });
    props.history.push("/");
  };
  return (
    <Nav>
      <div className="nav_content" onClick={handleClick}>
        <img className="nav_content_img" src={docs} alt="HeyMD" />
        <div className="nav_content_title">HeyMD</div>
      </div>
      {roomId ? (
        <Connection>
          {numOfUser ? (
            <Badge>
              <div className="icon">
                <i className="fas fa-users"></i>
              </div>
              <div className="text">
                <span> {numOfUser} </span> <span> ONLINE </span>
              </div>
            </Badge>
          ) : (
            <DisconnectBadge>
              <div className="icon">
                <i className="fas fa-plug"></i>
              </div>
              <div className="text">
                <span>OFFLINE</span>
              </div>
            </DisconnectBadge>
          )}
        </Connection>
      ) : (
        ""
      )}
    </Nav>
  );
};

export default withRouter(Navbar);
