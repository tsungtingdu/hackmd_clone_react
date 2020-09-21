import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Posts from "./Posts";

const PostPanelContainer = styled.div`
  width: 100%;
  height: 100vh;
  padding: 20px 40px 0 20px;
  display: flex;
  flex-flow: column-reverse;
  justify-content: flex-end;
  overflow-y: scroll;
  overflow-x: hidden;
`;
const WidgetContainer = styled.div`
  width: 100%;
  height: 50px;
  margin: 10px 0;
  display: flex;
  flex-flow: row-reverse;
  align-items: center;
`;
const SelectBtn = styled.div`
  width: 130px;
  height: 36px;
  border: 1px solid #ffffff;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 12px;
  color: #ffffff;
  font-weight: 600;
  font-family: "Source Sans Pro", sans-serif;
  position: relative;
  cursor: pointer;
  &:hover {
    background-color: #ffffff;
    color: #333;
  }
`;

const SelectMenu = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(-40px, 75px);
  width: 210px;
  background-color: #686868;
  border-radius: 4px;
  padding-bottom: 4px;
  cursor: pointer;
`;

const SelectGroup = styled.div`
  display: flex;
  flex-flow: column;
  color: #ffffff;
  font-weight: 600;
  padding: 15px 0;
  border-bottom: 1px solid #ccc;

  .category {
    padding: 0 20px;
    font-size: 12px;
    color: #cbcbcb;
    line-height: 24px;
  }

  .option {
    padding: 0 20px;
    display: flex;
    gap: 8px;
    line-height: 30px;
    height: 30px;
    &:hover {
      background-color: #aaa;
    }
    &__check {
      width: 15px;
    }
  }
`;

const MenuLayer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: transparent;
`;

const PostPanel = (props) => {
  const LAYOUT_OPTIONS = ["GridLayout", "RowLayout"];
  const SORT_OPTIONS = ["NewToOld", "OldToNew", "AToZ", "ZToA"];
  const dispatch = useDispatch();
  const { layoutOption, setLayoutOption } = props;

  const handleMenuDisplay = () => {
    let newOp;
    if (layoutOption.menuDisplay) {
      newOp = {
        ...layoutOption,
        menuDisplay: false,
      };
    } else {
      newOp = {
        ...layoutOption,
        menuDisplay: true,
      };
    }
    setLayoutOption(newOp);
  };

  const handleSorting = (data) => {
    switch (data) {
      case "NewToOld":
        return dispatch({ type: "SORT_POST_NEWTOOLD" });
      case "OldToNew":
        return dispatch({ type: "SORT_POST_OLDTONEW" });
      case "AToZ":
        return dispatch({ type: "SORT_POST_ATOZ" });
      case "ZToA":
        return dispatch({ type: "SORT_POST_ZTOA" });
      default:
        return dispatch({ type: "SORT_POST_NEWTOOLD" });
    }
  };

  const handleLayoutSelect = (data) => {
    let newOp;
    if (LAYOUT_OPTIONS.includes(data)) {
      newOp = {
        ...layoutOption,
        layout: data,
      };
    } else if (SORT_OPTIONS.includes(data)) {
      newOp = {
        ...layoutOption,
        sort: data,
      };
    }
    setLayoutOption(newOp);
    handleSorting(newOp.sort);
  };

  return (
    <PostPanelContainer>
      <Posts layoutOption={layoutOption} />
      <WidgetContainer>
        {layoutOption.menuDisplay ? (
          <MenuLayer onClick={handleMenuDisplay} />
        ) : (
          ""
        )}
        <SelectBtn onClick={handleMenuDisplay}>
          Layout
          {" "}
          {layoutOption.menuDisplay ? (
            <i className="fas fa-angle-up" />
          ) : (
            <i className="fas fa-angle-down" />
          )}
        </SelectBtn>
        {layoutOption.menuDisplay ? (
          <SelectMenu>
            <SelectGroup>
              <div className="category">Layout</div>
              <div
                className="option"
                onClick={() => {
                  handleLayoutSelect("GridLayout");
                }}
              >
                <div className="option__check">
                  {layoutOption.layout === "GridLayout" ? (
                    <i className="fas fa-check" />
                  ) : (
                    ""
                  )}
                </div>
                <div className="option__icon">
                  <i className="fas fa-th" />
                </div>
                <div className="option__text">Grid layout</div>
              </div>
              <div
                className="option"
                onClick={() => {
                  handleLayoutSelect("RowLayout");
                }}
              >
                <div className="option__check">
                  {layoutOption.layout === "RowLayout" ? (
                    <i className="fas fa-check" />
                  ) : (
                    ""
                  )}
                </div>
                <div className="option__icon">
                  <i className="fas fa-list" />
                </div>
                <div className="option__text">Row layout</div>
              </div>
            </SelectGroup>
            <SelectGroup>
              <div className="category">Posts sorted by</div>
              <div
                className="option"
                onClick={() => {
                  handleLayoutSelect("NewToOld");
                }}
              >
                <div className="option__check">
                  {layoutOption.sort === "NewToOld" ? (
                    <i className="fas fa-check" />
                  ) : (
                    ""
                  )}
                </div>
                <div className="option__text">New to old</div>
              </div>
              <div
                className="option"
                onClick={() => {
                  handleLayoutSelect("OldToNew");
                }}
              >
                <div className="option__check">
                  {layoutOption.sort === "OldToNew" ? (
                    <i className="fas fa-check" />
                  ) : (
                    ""
                  )}
                </div>
                <div className="option__text">Old to New</div>
              </div>
              <div
                className="option"
                onClick={() => {
                  handleLayoutSelect("AToZ");
                }}
              >
                <div className="option__check">
                  {layoutOption.sort === "AToZ" ? (
                    <i className="fas fa-check" />
                  ) : (
                    ""
                  )}
                </div>
                <div className="option__text">A to Z</div>
              </div>
              <div
                className="option"
                onClick={() => {
                  handleLayoutSelect("ZToA");
                }}
              >
                <div className="option__check">
                  {layoutOption.sort === "ZToA" ? (
                    <i className="fas fa-check" />
                  ) : (
                    ""
                  )}
                </div>
                <div className="option__text">Z to A</div>
              </div>
            </SelectGroup>
          </SelectMenu>
        ) : (
          ""
        )}
      </WidgetContainer>
    </PostPanelContainer>
  );
};

export default PostPanel;
