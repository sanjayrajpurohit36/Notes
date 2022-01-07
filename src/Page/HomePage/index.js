import { useState } from "react";
import Button from "./../../components/Button";
import Sidebar from "./../../components/Sidebar";
import Card from "./../../components/Card";
import Overlay from "./../../components/Overlay";
import "./index.css";

const HomePage = () => {
  const [isShowSideModal, setIsShowSideModal] = useState(false);
  const [taskData, setTaskData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const toggleSideModal = () => {
    setIsShowSideModal(!isShowSideModal);
  };

  const getTaskData = (newTaskdata) => {
    console.log("data in page", newTaskdata);
    setIsShowSideModal(false);
    setTaskData([...taskData, newTaskdata]);
    setFilteredData([...taskData, newTaskdata]);
    // localStorage.taskData = JSON.stringify(taskData);
  };

  const searchNotes = (searchText) => {
    if (searchText.trim() !== "") {
      console.log("search text => ", searchText, searchText.length);
      console.log(taskData);
      let searchedNotes = [];
      searchedNotes = taskData.filter((value, key) =>
        value["name"]
          .trim()
          .toLowerCase()
          .includes(searchText.trim().toLowerCase())
      );
      console.log(searchedNotes);
      setFilteredData(searchedNotes);
    } else setFilteredData(taskData);
  };

  return (
    <>
      <header className="header-container">
        <div className="header-content-wrapper">
          <input
            className="header-search-input"
            placeholder="Search"
            name="taskdescription"
            onChange={(e) => searchNotes(e.target.value)}
          ></input>
          <Button
            btnCallback={() => setIsShowSideModal(true)}
            btnClassName="header-addTask-btn"
          >
            Add +
          </Button>
        </div>
      </header>
      <Sidebar
        onSubmitClick={(data) => getTaskData(data)}
        isShow={isShowSideModal}
        onClose={toggleSideModal}
      />
      {isShowSideModal && <Overlay />}
      <div className="task-card-container">
        {
          <section className="card-list-container">
            {filteredData && filteredData.length > 0 ? (
              filteredData.map((value, key) => {
                return <Card data={value} key={key + "card"} />;
              })
            ) : (
              <div className="no-data-found-wrapper">
                <h1> Oops! No Data Found</h1>
                <p>Please try searching another data.</p>
              </div>
            )}
          </section>
        }
      </div>
    </>
  );
};
export default HomePage;
