import emptyImg from "@/assets/images/empty.png";
import style from "./empty.module.css";
import Image from "next/image";

const Empty = ({ text }) => {
  return (
    <div className={style.container}>
      <Image src={emptyImg} alt="empty" />
      <h1>{text}</h1>
    </div>
  );
};

export default Empty;
