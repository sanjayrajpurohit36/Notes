import { useState } from "react";

function useTaskData() {
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
}

export default { useTaskData };
