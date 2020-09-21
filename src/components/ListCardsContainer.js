import React from "react";
import styled from "styled-components";
import Moment from "react-moment";

const ListCardsWrapper = styled.div`
  padding: 20px 0;
  display: flex;
  flex-flow: column;
`;
const ListCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid #333333;
  cursor: pointer;
  .wrapper {
    height: 100%;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 16px 20px 16px 40px;

    .title {
      font-size: 16px;
      font-weight: 600;
      line-height: 22px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      padding-right: 10px;
      color: #333333;
    }
    .changeTime {
      min-width: 120px;
      margin-left: auto;
      font-size: 12px;
      font-weight: 400;
      line-height: 22px;
      font-style: italic;
      color: #777777;
      display: flex;
      align-items: center;
      i {
        margin-right: 5px;
      }
    }
    .viewMode {
      position: relative;
      font-size: 12px;
      font-weight: 600;
      font-style: italic;
      color: #777777;
      text-align: right;
      margin: 0 10px;
    }
    .tooltip .tooltiptext {
      position: absolute;
      visibility: hidden;
      font-style: normal;
      width: 120px;
      background-color: rgba(0, 0, 0, 0.75);
      color: #fff;
      font-weight: 600;
      text-align: center;
      padding: 5px 0;
      border-radius: 6px;
      z-index: 1;
      top: -24px;
      left: calc(-54px);
    }
    .tooltip:hover .tooltiptext {
      visibility: visible;
    }
  }
  &:hover {
    background-color: #eee;
  }
  &:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  &:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  .deleteBtn {
    min-width: 20px;
    max-width: 20px;
    font-size: 12px;
    margin: auto 10px;
    color: #c9302c;
    text-align: center;
    &:hover {
      transform: scale(1.25);
    }
  }
`;

const ListCardsContainer = (props) => {
  const { posts, handleCardOpen, handleCardDelete } = props;
  return (
    <>
      {posts !== undefined && posts.length > 0 ? (
        <ListCardsWrapper>
          {posts.map((i) => (
            <ListCard key={i.Post.id}>
              <div
                className="wrapper"
                onClick={() => {
                  handleCardOpen({ type: "open", payload: i.Post.id });
                }}
              >
                <div className="title">{i.Post.title}</div>
                <div className="viewMode tooltip">
                  <i className="far fa-eye" />
                  <span className="tooltiptext">Open in view mode</span>
                </div>
                <div className="changeTime">
                  <i className="fas fa-history" />
                  changed&nbsp;
                  <Moment fromNow>{i.Post.updatedAt}</Moment>
                </div>
              </div>
              <div
                className="deleteBtn"
                onClick={() => {
                  handleCardDelete({ type: "delete", payload: i.Post.id });
                }}
              >
                <i className="far fa-trash-alt" />
              </div>
            </ListCard>
          ))}
        </ListCardsWrapper>
      ) : (
        ""
      )}
    </>
  );
};

export default ListCardsContainer;
