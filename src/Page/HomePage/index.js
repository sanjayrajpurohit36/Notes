import { useState, useRef } from "react";
import Button from "./../../components/Button";
import Sidebar from "./../../components/Sidebar";
import Card from "./../../components/Card";
import Overlay from "./../../components/Overlay";
import colors from "./../../utils/colors.json";

import "./index.css";

let colorCode = "";
let taskData = [];

const HomePage = () => {
  const [isShowSideModal, setIsShowSideModal] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const myRef = useRef(null);
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
      console.log("=>", color, Object.keys(colors), Object.values(colors));
      searchedNotes = searchedNotes.filter(
        (value, key) => value["color"] === color
      );
    }

    setFilteredData(searchedNotes);
    if (color.length === 0 && searchText.length === 0) {
      setFilteredData(taskData);
    }
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

  const showMessage = () => {
    return taskData && taskData.length > 0 ? (
      <div className="no-data-found-wrapper">
        <h1> Oops! No Data Found</h1>
        <p>Please try searching another data.</p>
      </div>
    ) : (
      <div>
        <h1>Try adding tasks!</h1>
      </div>
    );
  };

  return (
    <>
      <header className="header-container">
        <div className="header-content-wrapper">
          <div className="header-search-bar-btn-wrapper">
            <input
              className="header-search-input"
              placeholder="Search"
              name="taskdescription"
              ref={myRef}
              onChange={(e) => searchNotes(e.target.value.trim(), colorCode)}
            ></input>
            <Button
              btnCallback={() => setIsShowSideModal(true)}
              btnClassName="header-addTask-btn"
            >
              Add +
            </Button>
          </div>
          {renderColorFilters()}
          <Button
            btnCallback={() => resetFilters(true)}
            btnClassName="header-addTask-btn"
          >
            Reset
          </Button>
        </div>
      </header>

      <Sidebar
        onSubmitClick={(data) => getTaskData(data)}
        isShow={isShowSideModal}
        onClose={toggleSideModal}
      />
      <div className="task-card-container">
        {
          <section className="card-list-container">
            {filteredData && filteredData.length > 0
              ? filteredData.map((value, key) => {
                  return <Card data={value} key={key + "card"} />;
                })
              : showMessage()}
          </section>
        }
      </div>
    </>
  );
};
export default HomePage;
