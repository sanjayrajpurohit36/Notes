import "./index.css";
import { getTodaysDateAndTime } from "../../utils/timeHelper";
import Tag from "./../Tag";

const Card = (props) => {
  const { name, description, color } = props.data;

  return (
    <div className="card-wrapper" style={{ background: color }}>
      <div className="task-name">{`Task : ${name}`}</div>
      <div className="task-desc">{`Description : ${description}`}</div>
      <div className="timestamp">{`Created At : ${
        getTodaysDateAndTime()["date"] + ` ` + getTodaysDateAndTime()["time"]
      }`}</div>
    </div>
  );
};

export default Card;
