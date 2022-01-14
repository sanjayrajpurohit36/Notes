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
  });
  const [tagList, setTagList] = useState({});
  const myTagRef = useRef(null);

  const addTags = (tagValue) => {
    debugger;
    if (tagValue.length && tagValue.isAlphaNumeric) {
      let newTag = { [tagValue.trim()]: tagValue.trim() };
      setTagList({ ...tagList, ...newTag });
    }
    myTagRef.current.value = "";
  };

  const removeTag = (element) => {
    let property = element.target.parentElement.parentElement.innerText;
    let newTagList = Object.assign({}, tagList);
    delete newTagList[property];
    setTagList({ ...newTagList });
  };

  const onSubmit = () => {
    if (
      Object.keys(taskObj).length === 3 &&
      taskObj["name"].trim().length &&
      taskObj["description"].trim().length
    ) {
      onSubmitClick(taskObj);
    }
    setTaskObj({
      name: "",
      color: "",
      description: "",
    });
  };

  const updateTaskObj = (key, value) => {
    if (["name", "description"].includes(key) && value.length) {
      let isAlright = checkContent(value);
      isAlright && setTaskObj({ ...taskObj, [key]: value });
    } else setTaskObj({ ...taskObj, [key]: value });
  };

  return (
    <div className={`side-bar-wrapper ${isShow ? "show" : "hide"}`}>
      <div className="close-icon" onClick={() => onClose()}>
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
            {tagList &&
              Object.keys(tagList).length > 0 &&
              Object.keys(tagList).map((tagText, key) => (
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
              (e.key === " " || e.key === "Enter") && addTags(e.target.value);
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
