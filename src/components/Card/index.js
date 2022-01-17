import "./index.css";
import { getTodaysDateAndTime } from "../../utils/timeHelper";
import Tag from "./../Tag";

const Card = (props) => {
  const { name, description, color } = props.data;

  return (
    <div className="card-wrapper" style={{ background: color }}>
      <div className="name">{`Title : ${name}`}</div>
      <div className="desc">{`Description : ${description}`}</div>
      <div className="timestamp">{`Created At : ${
        getTodaysDateAndTime()["date"] + ` ` + getTodaysDateAndTime()["time"]
      }`}</div>
    </div>
  );
};

export default Card;
