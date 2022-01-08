import { useState, useCallback, useEffect } from "react";
import Button from "./../../components/Button";
import Sidebar from "./../../components/Sidebar";
import Card from "./../../components/Card";
import Overlay from "./../../components/Overlay";
import colors from "./../../utils/colors.json";
// import { useTaskData } from "./HomePage";
import "./index.css";

let colorCode = "";

const HomePage = () => {
  const [isShowSideModal, setIsShowSideModal] = useState(false);
  const [taskData, setTaskData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  // const [color, setColor] = useState("");
  // const [searchText, setSearchText] = useState("");

  const toggleSideModal = () => {
    setIsShowSideModal(!isShowSideModal);
  };

  const getTaskData = useCallback(
    (newTaskdata) => {
      console.log("data in page", newTaskdata);
      setIsShowSideModal(false);
      setTaskData([...taskData, newTaskdata]);
      setFilteredData([...taskData, newTaskdata]);
      colorCode = "";
      // localStorage.taskData = JSON.stringify(taskData);
    },
    [taskData]
  );

  const searchNotes = (searchText, color) => {
    console.log("search text => ", searchText, color);
    colorCode = color;
    console.log(taskData);
    if (searchText.trim().length > 0 && color.length > 0) {
      let searchedNotes = [];
      searchedNotes = taskData.filter((value, key) => {
        return (
          value["name"]
            .trim()
            .toLowerCase()
            .includes(searchText.trim().toLowerCase()) &&
          value["color"] === color
        );
      });
      setFilteredData(searchedNotes);
    } else if (searchText.trim().length > 0) {
      let searchedNotes = [];
      searchedNotes = taskData.filter((value, key) =>
        value["name"]
          .trim()
          .toLowerCase()
          .includes(searchText.trim().toLowerCase())
      );
      console.log(searchedNotes);
      setFilteredData(searchedNotes);
    } else if (color.length > 0) {
      console.log("=>", color, Object.keys(colors), Object.values(colors));
      let searchedNotes = [];
      searchedNotes = taskData.filter((value, key) => value["color"] === color);
      console.log(searchedNotes);
      setFilteredData(searchedNotes);
    } else {
      setFilteredData(taskData);
      // setColor("");
    }
  };

  // const searchNotes = (searchText) => {
  //   // if (searchText.trim() !== "") {
  //   console.log("search text => ", searchText, searchText.length);
  //   console.log(taskData);
  //   if (searchText.trim().length !== 0) {
  //     let setData = filteredData.length ? filteredData : taskData;
  //     setSearchText(searchText);
  //     let searchedNotes = [];
  //     searchedNotes = setData.filter((value, key) => {
  //       return value["name"]
  //         .trim()
  //         .toLowerCase()
  //         .includes(searchText.trim().toLowerCase());
  //     });
  //     console.log(searchedNotes);
  //     setFilteredData(searchedNotes);
  //   } else {
  //     setFilteredData(taskData);
  //     setColor("");
  //   }
  // };

  const resetFilters = () => {
    setFilteredData(taskData);
    colorCode = "";
    // setColor("");
    // setSearchText("");
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
              // value={searchText}
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
