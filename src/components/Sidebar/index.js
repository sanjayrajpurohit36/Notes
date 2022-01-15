import { useState, useRef } from "react";
import colors from "./../../utils/colors.json";
import Button from "./../Button";
import Close from "./../../assets/image/close.png";
import Tag from "./../../components/Tag";
import { checkContent } from "./../../utils/regexHelper";
import "./index.css";

const Sidebar = (props) => {
  const { isShow, onClose, onSubmitClick = () => {} } = props;
  const [taskObj, setTaskObj] = useState({
    name: "",
    color: "",
    description: "",
    tags: {},
  });
  const myTagRef = useRef(null);

  const removeTag = (element) => {
    let property = element.target.parentElement.parentElement.innerText;
    let newTagList = Object.assign({}, taskObj["tags"]);
    delete newTagList[property];
    setTaskObj({ ...taskObj, tags: newTagList });
  };

  const onSubmit = () => {
    if (
      Object.keys(taskObj).length >= 3 &&
      taskObj["name"].trim().length &&
      taskObj["description"].trim().length
    )
      onSubmitClick(taskObj);
    resetState();
  };

  const updateTaskObj = (key, value) => {
    if (["name", "description"].includes(key) && value.trim().length) {
      let isAlright = checkContent(value);
      isAlright && setTaskObj({ ...taskObj, [key]: value });
    } else if (key === "tags") {
      value = value.trim();
      if (value.length) {
        let newTag = { [value]: value };
        setTaskObj({
          ...taskObj,
          [key]: { ...taskObj[key], ...newTag },
        });
      }
      myTagRef.current.value = "";
    } else setTaskObj({ ...taskObj, [key]: value });
  };

  const onCloseClick = () => {
    onClose();
    resetState();
  };

  const resetState = () => {
    setTaskObj({
      name: "",
      color: "",
      description: "",
      tags: {},
    });
  };
  return (
    <div className={`side-bar-wrapper ${isShow ? "show" : "hide"}`}>
      <div className="close-icon" onClick={onCloseClick}>
        <img src={Close} alt="cross icon" />
      </div>
      <div className="task-form-wrapper">
        <div className="input-wrapper">
          <input
            className="input"
            placeholder="Name"
            name="taskname"
            value={taskObj["name"] || ""}
            onChange={(e) => updateTaskObj("name", e.target.value)}
          />
        </div>

        <div className="input-wrapper">
          <input
            className="input"
            placeholder="Description"
            name="taskdescription"
            value={taskObj["description"]}
            onChange={(e) => updateTaskObj("description", e.target.value)}
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
                  border:
                    taskObj["color"] === colors[value] ? "2px solid black" : "",
                }}
                value={taskObj["color"]}
                onClick={() => updateTaskObj("color", colors[value])}
              ></div>
            );
          })}
        </div>

        <div className="tag-section">
          <div className="tag-container">
            {taskObj &&
              Object.keys(taskObj["tags"]).length > 0 &&
              Object.keys(taskObj["tags"]).map((tagText, key) => (
                <Tag
                  tagName={tagText}
                  id={tagText + "-" + key}
                  onCrossClick={(e) => removeTag(e, key)}
                />
              ))}
          </div>
          <input
            className="input input-tag"
            placeholder="Add tag..."
            name="taskname"
            ref={myTagRef}
            onKeyDown={(e) => {
              (e.key === " " || e.key === "Enter") &&
                updateTaskObj("tags", e.target.value);
            }}
          />
        </div>

        <div className="submit-btn-wrapper">
          <Button
            className="btn submit-btn"
            btnCallback={() => {
              onSubmit();
            }}
            isDisable={Object.keys(taskObj).length < 3 ? true : false}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
