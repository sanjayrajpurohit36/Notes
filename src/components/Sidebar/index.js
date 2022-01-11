import { useState, useRef } from "react";
import colors from "./../../utils/colors.json";
import Button from "./../Button";
import Close from "./../../assets/image/close.png";
import Tag from "./../../components/Tag";
import "./index.css";

const Sidebar = (props) => {
  const { isShow, onClose, onSubmitClick = () => {} } = props;
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [color, setColor] = useState("");
  const [tagList, setTagList] = useState({});
  const myTagRef = useRef(null);

  const addTags = (tagValue) => {
    let newTag = { [tagValue]: tagValue };
    myTagRef.current.value = "";
    setTagList({ ...tagList, ...newTag });
  };

  const removeTag = (element) => {
    let property = element.target.parentElement.parentElement.innerText;
    let newTagList = Object.assign({}, tagList);
    delete newTagList[property];
    setTagList({ ...newTagList });
  };

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
