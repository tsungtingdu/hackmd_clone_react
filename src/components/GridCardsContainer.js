import React from "react";
import styled from "styled-components";
import Moment from "react-moment";

const GridCardsWrapper = styled.div`
  padding: 20px 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 20px;

  @media screen and (max-width: 1400px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media screen and (max-width: 1400px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media screen and (max-width: 1280px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media screen and (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const GridCard = styled.div`
  position: relative;
  border-radius: 4px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 140px;
  background-color: #ffffff;
  padding: 16px;
  cursor: pointer;
  .wrapper {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    .title {
      font-size: 16px;
      font-weight: 600;
      line-height: 22px;
      color: #333333;
      text-align: center;
    }
    .changeTime {
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
  }
  &:hover {
    background-color: #eee;
  }
  .viewMode {
    position: absolute;
    bottom: 8px;
    right: 16px;
    font-size: 12px;
    font-weight: 600;
    font-style: italic;
    color: #777777;
    text-align: right;
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
    z-index: 1;
  }

  .deleteBtn {
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    width: 20px;
    font-size: 12px;
    margin: 10px 10px 0 0;
    color: #c9302c;
    text-align: center;
    &:hover {
      transform: scale(1.25);
    }
  }
`;

const GridCardsContainer = (props) => {
  const { posts, handleCardOpen, handleCardDelete } = props;
  return (
    <>
      {posts !== undefined && posts.length > 0 ? (
        <GridCardsWrapper>
          {posts.map((i) => (
            <GridCard key={i.Post.id}>
              <div
                className="deleteBtn"
                onClick={() => {
                  handleCardDelete({ type: "delete", payload: i.Post.id });
                }}
              >
                <i className="far fa-trash-alt" />
              </div>
              <div
                className="wrapper"
                onClick={() => {
                  handleCardOpen({ type: "open", payload: i.Post.id });
                }}
              >
                <div className="title">{i.Post.title}</div>
                <div className="changeTime">
                  <i className="fas fa-history" />
                  changed&nbsp;
                  <Moment fromNow>{i.Post.updatedAt}</Moment>
                </div>
                <div className="viewMode tooltip">
                  <i className="far fa-eye " />
                  <span className="tooltiptext">Open in view mode</span>
                </div>
              </div>
            </GridCard>
          ))}
        </GridCardsWrapper>
      ) : (
        ""
      )}
    </>
  );
};

export default GridCardsContainer;
