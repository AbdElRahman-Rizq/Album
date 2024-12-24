import style from "./Loading.module.css"

const Loading = ({ color }) => {
    return (
        <div className={style.spinner}>
            <div className={style.bubble1} style={{ backgroundColor: color}}></div>
            <div className={style.bubble2} style={{ backgroundColor: color}}></div>
        </div>
    )
}

export default Loading