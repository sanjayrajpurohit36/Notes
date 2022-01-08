import "./index.css";

const Button = (props) => {
  const {
    btnCallback = () => {},
    btnStyles = {},
    btnClassName = "",
    isDisable,
  } = props;
  return (
    <>
      <button
        onClick={() => btnCallback()}
        className={`btn ${btnClassName.length ? btnClassName : ""}`}
        disabled={isDisable}
      >
        {props.children}
      </button>
    </>
  );
};

Button.defaultProps = {
  isDisable: false,
};
export default Button;
