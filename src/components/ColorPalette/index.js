import { useState } from "react";
import colors from "./../../utils/colors.json";
import "./index.css";

const ColorPalette = (props) => {
  const { onColorClick = () => {}, title = "", className = "" } = props;
  const [clickedColorCode, setColorCode] = useState("");

  const handleColorClick = (code) => {
    onColorClick(code);
    setColorCode(code);
  };

  return (
    <section className={`color-tag-wrapper ${className}`}>
      <span className="color-tag-wrapper--title">{title}</span>
      {Object.keys(colors).map((value, key) => {
        console.log(colors[value]);
        return (
          <div
            className="color-tag-wrapper--circle"
            key={value}
            id={colors[value]}
            style={{
              background: colors[value],
              border:
                clickedColorCode === colors[value] ? "2px solid black" : "",
            }}
            onClick={(e) => handleColorClick(e.target.id)}
          ></div>
        );
      })}
    </section>
  );
};

export default ColorPalette;
