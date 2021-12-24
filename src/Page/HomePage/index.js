import { useState } from "react";
import Button from "./../../components/Button";
import Sidebar from "./../../components/Sidebar";
import Card from "./../../components/Card";
import './index.css';
const HomePage = () => {
    const [taskData, setTaskData] = useState([]);
    
    const getTaskData = (newTaskdata) => {
      console.log("data in page",newTaskdata);
      setTaskData([...taskData, newTaskdata])
      // localStorage.taskData = JSON.stringify(taskData);
    }
    
    return (
    <>
        <Button btnCallback={(e) => console.log("hi")} btnClassName="test" btnstyle={{cursor:"pointer"}}> 
          Add +
        </Button>
        <div className="sidebar-wrapper" style={{alignSelf: "end"}}>
          <Sidebar onSubmitClick={(data) =>getTaskData(data)}/>
        </div>
        <div className="task-card-wrapper">
          { taskData.map((value, key) => {
              return <Card data={value}/>
            })
          }
        </div>
    </>);
}
export default HomePage;