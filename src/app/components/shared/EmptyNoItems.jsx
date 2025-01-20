import { TbMoodEmpty } from "react-icons/tb";
import style from "./emptyNoItems.module.css"

const EmptyNoItems = ({text}) => {
    return (
        <div className={style.Empty}>
            <TbMoodEmpty />
            <p>{text || "No Details Yet!"}</p>
        </div>
    )
}

export default EmptyNoItems
