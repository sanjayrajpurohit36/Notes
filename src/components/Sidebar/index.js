import { useState } from "react";
import colors from "./../../utils/colors.json";
import Button from "./../Button";
import Close from "./../../assets/image/close.png";
import "./index.css";

const Sidebar = (props) => {
  const { isShow, onClose } = props;
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [color, setColor] = useState("");
  const { onSubmitClick = () => {} } = props;

  const onSubmit = () => {
    if (name.length && desc.length && color.length) {
      let taskObj = {
        name,
        desc,
        color,
      };
      onSubmitClick(taskObj);
    }
    setName("");
    setDesc("");
    setColor("");
  };

  return (
    <div className={`side-bar-wrapper ${isShow ? "show" : "hide"}`}>
      <div className="close-icon" onClick={() => onClose()}>
        <img src={Close} alt="cross icon" />
      </div>
      <div className="task-form-wrapper">
        <div className="input-wrapper">
          {/* <label htmlFor="task-name">Name</label> */}
          <input
            className="input"
            placeholder="Name"
            name="taskname"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input-wrapper">
          {/* <label htmlFor="task-description">Description</label> */}
          <input
            className="input"
            placeholder="Description"
            name="taskdescription"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="color-tag-wrapper">
          {Object.keys(colors).map((value, key) => {
            return (
              <div
                className="circle"
                id={value}
                key={value}
                style={{
                  background: colors[value],
                  border: color === colors[value] ? "2px solid black" : "",
                }}
                onClick={(e) => setColor(colors[e.target.id])}
              ></div>
            );
          })}
        </div>
        <div className="submit-btn-wrapper">
          <Button
            className="btn submit-btn"
            btnCallback={() => {
              onSubmit();
            }}
            isDisable={
              name.length && desc.length && color.length ? false : true
            }
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
