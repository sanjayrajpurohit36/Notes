import { useState, useRef } from "react";
import Button from "./../../components/Button";
import Sidebar from "./../../components/Sidebar";
import Card from "./../../components/Card";
import Overlay from "./../../components/Overlay";
import colors from "./../../utils/colors.json";
import imageConstant from "./../../constants/assetConstant";

import "./index.css";

let colorCode = "";
let taskData = [];

const HomePage = () => {
  const [isShowSideModal, setIsShowSideModal] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const myRef = useRef(null);
  const { emptyIcon } = imageConstant;
  const toggleSideModal = () => {
    setIsShowSideModal(!isShowSideModal);
  };

  const getTaskData = (newTaskData) => {
    setIsShowSideModal(false);
    taskData.push(newTaskData);
    setFilteredData([...taskData]);
    colorCode = "";
    // localStorage.taskData = JSON.stringify(taskData);
  };

  const searchNotes = (searchText, color) => {
    colorCode = color;
    let searchedNotes = taskData;
    if (searchText.trim().length > 0) {
      searchedNotes = searchedNotes.filter((value, key) =>
        value["name"]
          .trim()
          .toLowerCase()
          .includes(searchText.trim().toLowerCase())
      );
    }

    if (color.length > 0) {
      searchedNotes = searchedNotes.filter(
        (value, key) => value["color"] === color
      );
    }

    // if no color is selected & no text is searched.
    if (color.length === 0 && searchText.length === 0) {
      setFilteredData(taskData);
    }
    setFilteredData(searchedNotes);
  };

  const resetFilters = () => {
    myRef.current.value = "";
    setFilteredData(taskData);
    colorCode = "";
  };

  const renderColorFilters = () => {
    return (
      <section className="color-tag-wrapper--filter">
        <p>Color Filters</p>
        {Object.keys(colors).map((value, key) => {
          return (
            <div
              className="circle"
              id={value}
              key={value}
              style={{
                background: colors[value],
                border: colorCode === colors[value] ? "2px solid black" : "",
              }}
              onClick={(e) => searchNotes("", colors[e.target.id])}
            ></div>
          );
        })}
      </section>
    );
  };

  const showEmptyDataMessage = () => {
    const displayMessageObj = {
      true: "Add your notes!",
      false: "No notes exist!",
    };
    return (
      <div className="notes-icon-wrapper">
        <img src={emptyIcon} alt="notes icon" />
        {(!filteredData.length || !taskData.length) && (
          <p className="no-data-message">
            {displayMessageObj[taskData.length === 0] ||
              displayMessageObj[!(filteredData.length === 0)]}
          </p>
        )}
      </div>
    );
  };

  return (
    <>
      <header className="header-container">
        <div className="header-content-wrapper">
          <div className="header-search-bar-btn-wrapper">
            <div className="header-search-wrapper">
              <input
                className="header-search-input"
                placeholder="Search"
                name="taskdescription"
                ref={myRef}
                onChange={(e) => searchNotes(e.target.value.trim(), colorCode)}
              />
            </div>
            <div className="header-search-btn-wrapper">
              <Button
                btnCallback={() => setIsShowSideModal(true)}
                btnClassName="header-addTask-btn"
              >
                Add +
              </Button>
              <Button
                btnCallback={() => resetFilters(true)}
                btnClassName="header-addTask-btn"
              >
                Reset
              </Button>
            </div>
          </div>
          {renderColorFilters()}
        </div>
      </header>

      <Sidebar
        onSubmitClick={(data) => getTaskData(data)}
        isShow={isShowSideModal}
        onClose={toggleSideModal}
      />
      <div className="body-container">
        {filteredData && filteredData.length === 0 ? (
          showEmptyDataMessage()
        ) : (
          <>
            {filteredData.map((value, key) => {
              return <Card data={value} key={key + "card"} />;
            })}
          </>
        )}
      </div>
    </>
  );
};
export default HomePage;
