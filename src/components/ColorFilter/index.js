import colors from "./../../utils/colors.json";
import "./index.css";

const ColorFilter = (props) => {
  const { selectedColor, onColorClick = () => {} } = props;

  return (
    <section className="color-tag-wrapper">
      <p>Color Filters</p>
      {Object.keys(colors).map((value, key) => {
        return (
          <div
            className="circle"
            key={value}
            style={{
              background: colors[value],
              border: selectedColor === colors[value] ? "2px solid black" : "",
            }}
            onClick={(e) => onColorClick("", colors[e.target.id])}
          ></div>
        );
      })}
    </section>
  );
};

export default ColorFilter;
