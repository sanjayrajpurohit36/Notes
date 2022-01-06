import { useState } from "react";
import Button from "./../../components/Button";
import Sidebar from "./../../components/Sidebar";
import Card from "./../../components/Card";
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
      <Button
        btnCallback={() => setIsShowSideModal(true)}
        btnClassName="test"
        btnstyle={{ cursor: "pointer" }}
      >
        Add +
      </Button>
      <div className="search-wrapper">
        <input
          placeholder="description"
          name="taskdescription"
          onChange={(e) => searchNotes(e.target.value)}
        ></input>
      </div>
      <Sidebar
        onSubmitClick={(data) => getTaskData(data)}
        isShow={isShowSideModal}
        onClose={toggleSideModal}
      />
      <div className="task-card-wrapper">
        {filteredData.map((value, key) => {
          return <Card data={value} key={key + "card"} />;
        })}
      </div>
    </>
  );
};
export default HomePage;
