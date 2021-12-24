import { useState } from "react"
import colors from "./../../utils/colors.json"
import Button from "./../Button";
import "./index.css";

const Sidebar = (props) => {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [color, setColor] = useState("");
    const {onSubmitClick = () => {}} = props;

    const onSubmit = () => {
        let taskObj = {
            name,
            desc,
            color,
        }
        onSubmitClick(taskObj);
        setName("");
        setDesc("");
        setColor("")
    }

    return (
        <>
            <label htmlFor="task-name">Name</label>
            <input placeholder="name" name="taskname" value={name} onChange={(e) => setName(e.target.value)}/>

            <label htmlFor="task-description">Description</label>
            <input placeholder="description" name="taskdescription" value={desc} onChange={(e) => setDesc(e.target.value)}/>
            <div className="color-tag-wrapper">
                {
                    Object.keys(colors).map((value, key) => {
                        return <div className="circle" id={value} key={value} style={{background:colors[value]}} onClick={(e) => setColor(colors[e.target.id])}></div>
                    }) 
                }
            </div>
            <Button btnCallback={() => {onSubmit()}}>Submit</Button>

        </>
    )
}


export default Sidebar;