import { useState, useRef } from "react";
import Button from "./../../components/Button";
import Sidebar from "./../../components/Sidebar";
import Card from "./../../components/Card";
import ColorPalette from "../../components/ColorPalette";
import imageConstant from "./../../constants/assetConstant";
import "./index.css";

let clickedColorCode = "";
let taskData = [];

const HomePage = () => {
  const [isShowSideModal, setIsShowSideModal] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const myRef = useRef(null);
  const { emptyNote } = imageConstant;
  const toggleSideModal = () => {
    setIsShowSideModal(!isShowSideModal);
  };

  const getTaskData = (newTaskData) => {
    setIsShowSideModal(false);
    taskData.push(newTaskData);
    setFilteredData([...taskData]);
    clickedColorCode = "";
    // localStorage.taskData = JSON.stringify(taskData);
  };

  const searchNotes = (searchText, colorCode) => {
    clickedColorCode = colorCode;
    let searchedNotes = taskData;
    if (searchText.trim().length > 0) {
      searchedNotes = searchedNotes.filter((value, key) =>
        value["name"]
          .trim()
          .toLowerCase()
          .includes(searchText.trim().toLowerCase())
      );
    }

    if (clickedColorCode.length > 0) {
      searchedNotes = searchedNotes.filter(
        (value, key) => value["color"] === clickedColorCode
      );
    }

    // if no color is selected & no text is searched.
    if (clickedColorCode.length === 0 && searchText.length === 0) {
      setFilteredData(taskData);
    }
    setFilteredData(searchedNotes);
  };

  const resetFilters = () => {
    myRef.current.value = "";
    setFilteredData(taskData);
    clickedColorCode = "";
  };

  const showEmptyDataMessage = () => {
    const displayMessageObj = {
      true: "Add your notes!",
      false: "No notes exist!",
    };
    return (
      <div className="notes-icon-wrapper">
        <img src={emptyNote} alt="notes icon" />
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
                onChange={(e) =>
                  searchNotes(e.target.value.trim(), clickedColorCode)
                }
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
          <ColorPalette
            title={"Color Filter"}
            className="header-color-filter"
            onColorClick={(colorCode) => {
              searchNotes("", colorCode);
            }}
          />
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
