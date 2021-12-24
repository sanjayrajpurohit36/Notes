import "./index.css";

const Button = (props) => {
    const { btnCallback = () => {}, btnStyles = {}, btnClassName = "" } = props;
    return(
    <>
        <button onClick={() => btnCallback()} className={`btn ${btnClassName.length ? btnClassName : ''}`}>
            {props.children}
        </button>
    </>
    )
}

export default Button;