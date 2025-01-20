import Image from "next/image";

const AboutService = ({
  icon,
  title,
  description,
  contentEditable,
  content,
  setContent,
  index,
}) => (
  <div className="about-service">
    <div className="about-service-icon">
      <Image src={icon} alt={title} width={200} height={200} />
    </div>
    <div className="about-service-content">
      {contentEditable ? (
        <input
          type="text"
          value={title}
          onChange={(e) => {
            const newContent = [...content];
            newContent[index] = e.target.value;
            setContent(newContent);
          }}
          style={{
            textTransform: "uppercase",
            color: "#10101F",
            border: "none",
            outline: "none",
            fontSize: "18px",
            fontWeight: "700",
            backgroundColor: "transparent",
            width: "100%",
          }}
        />
      ) : (
        <h4>{title}</h4>
      )}
      {contentEditable ? (
        <textarea
          value={description}
          onChange={(e) => {
            const newContent = [...content];
            newContent[index + 1] = e.target.value;
            setContent(newContent);
          }}
          style={{
            border: "none",
            outline: "none",
            backgroundColor: "transparent",
            color: "#10101F",
            fontWeight: "500",
            fontSize: "16px",
          }}
        />
      ) : (
        <p>{description}</p>
      )}
    </div>
  </div>
);

export default AboutService;
