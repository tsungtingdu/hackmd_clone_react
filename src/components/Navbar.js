import React, { useState, Fragment } from "react";
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

const ShareBtn = styled.div`
  height: 50px;
  width: 50px;
  color: #ffffff;
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

const SharePanel = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  width: 300px;
  height: 500px;
  background-color: #ffffff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  cursor: auto;
`;

const Publishing = styled.div`
  width: 100%;
  height: 100px;
  padding: 10px 20px;

  .text {
    color: #333;
    font-size: 16px;
    text-align: left;
    line-height: 36px;
    font-weight: 700;
    padding: 5px 0px;
    &_status {
      color: #337ab7;
    }
  }

  .publishBtn {
    color: #ffffff;
    height: 40px;
    background-color: #337ab7;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 15px;
    cursor: pointer;
    i {
      margin-right: 5px;
    }
  }
  .unpublishBtn {
    color: #337ab7;
    height: 40px;
    border: 1px solid #337ab7;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 15px;
    cursor: pointer;
    i {
      margin-right: 5px;
    }
  }
`;

const Navbar = (props) => {
  const [shareMenu, setShareeMenu] = useState(false);
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
  const handleShareMenu = () => {
    if (shareMenu) {
      setShareeMenu(false);
    } else {
      setShareeMenu(true);
    }
  };
  const handlePublish = (e) => {
    e.stopPropagation();
    if (post) {
      let status = post.post.Post.status;
      dispatch({
        type: "SAVE_POST_REQUEST",
        payload: {
          status: status === "private" ? "public" : "private",
          id: roomId ? roomId : null,
        },
      });
    }
  };
  return (
    <Nav>
      <div className="nav_content" onClick={handleClick}>
        <img className="nav_content_img" src={docs} alt="HeyMD" />
        <div className="nav_content_title">HeyMD</div>
      </div>
      {roomId ? (
        <Fragment>
          <Connection>
            <ShareBtn
              onClick={handleShareMenu}
              style={
                shareMenu ? { backgroundColor: "#aaa", color: "#333" } : {}
              }
            >
              <i className="fas fa-share-alt"></i>
              {shareMenu ? (
                <SharePanel>
                  <Publishing>
                    <div className="text">
                      Status:
                      <span className="text_status">
                        {post && post.post.Post.status === "private"
                          ? " Private"
                          : " Published"}
                      </span>
                    </div>

                    {post.post.Post.status === "private" ? (
                      <div className="publishBtn" onClick={handlePublish}>
                        <i className="fas fa-globe-americas"></i>
                        Publish
                      </div>
                    ) : (
                      <div className="unpublishBtn" onClick={handlePublish}>
                        <i className="fas fa-user-lock"></i>
                        Unpublish
                      </div>
                    )}
                  </Publishing>
                </SharePanel>
              ) : (
                ""
              )}
            </ShareBtn>
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
        </Fragment>
      ) : (
        ""
      )}
    </Nav>
  );
};

export default withRouter(Navbar);
