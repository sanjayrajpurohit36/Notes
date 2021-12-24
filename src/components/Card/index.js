
import "./index.css"

const Card = (props) => {
    const {name, desc, color} = props.data;
    return (
        <div className="card-wrapper" style={{background: color}}> 
            <div>{name}</div>
            <div>{desc}</div>
        </div>
    )
}

export default Card;