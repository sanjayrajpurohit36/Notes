import "./index.css";
import Close from "./../../assets/image/close.png";

const Tag = (props) => {
  const { tagName, onCrossClick = () => {} } = props;

  return (
    <div className="tag-wrapper">
      <div className="tag-content">{tagName}</div>
      <div className="tag-close-icon" onClick={(e) => onCrossClick(e)}>
        <img src={Close} alt="cross icon" />
      </div>
    </div>
  );
};

Tag.defaultProps = {
  tagName: "test",
};

export default Tag;
