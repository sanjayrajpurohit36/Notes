import "./index.css";

const Card = (props) => {
  const { name, desc, color } = props.data;
  return (
    <div className="card-wrapper" style={{ background: color }}>
      <div className="task-name">{`Task : ${name}`}</div>
      <div className="task-desc">{`Description : ${desc}`}</div>
    </div>
  );
};

export default Card;
