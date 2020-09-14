import React, { Fragment } from 'react'
import styled from 'styled-components'

const ListCardsWrapper = styled.div`
  padding: 20px 0;
  display: flex;
  flex-flow: column;
`
const ListCard = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 50px;
  width: 100%;
  padding: 16px 40px;
  background-color: #ffffff;
  border-bottom: 1px solid #333333;
  cursor: pointer;
  &:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  &:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  .title {
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
    color: #333333;
  }
  .changeTime {
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
    margin-left: 10px;
  }
  &:hover {
    background-color: #eee;
  }
  .tooltip .tooltiptext {
    position: absolute;
    visibility: hidden;
    font-style: normal;
    width: 120px;
    background-color: rgba(0,0,0,0.75);
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
`

const ListCardsContainer = (props) => {
  const { posts } = props
  return (

    <Fragment>
      {posts !== undefined && (posts.length > 0) ? (
        <ListCardsWrapper>
          {posts.map(i => {
            return (<ListCard key={i.Post.id}>
              <div className="title">{i.Post.title}</div>
              <div className="viewMode tooltip">
                <i className="far fa-eye "></i>
                <span className="tooltiptext">Open in view mode</span>
              </div>
              <div className="changeTime"><i className="fas fa-history"></i>changed 2 days ago</div>
            </ListCard>)
          })}
        </ListCardsWrapper>
      ): ''}
    </Fragment>
 
  )
}

export default ListCardsContainer
