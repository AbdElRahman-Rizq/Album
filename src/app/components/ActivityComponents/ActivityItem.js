import Image from "next/image";

const ActivityItem = ({
  icon,
  title,
  destinations,
  index,
  contentEditable,
  content,
  setContent,
}) => (
  <div className="activity-item">
    <div className="activity-icon">
      <a href="#">
        <Image
          src={icon}
          alt={title}
          width={100}
          height={100}
          style={{ objectFit: "cover" }}
        />
      </a>
    </div>
    <div className="activity-content">
      {contentEditable ? (
        <input
          style={{
            width: "100%",
            textAlign: "center",
            border: "none",
            outline: "none",
            color: "#101F46",
            fontSize: "20px",
            fontWeight: "700",
          }}
          type="text"
          value={title}
          onChange={(e) => {
            const newContent = [...content];
            newContent[index] = e.target.value;
            setContent(newContent);
          }}
        />
      ) : (
        <h4>
          <a href="#">{title}</a>
        </h4>
      )}

      {contentEditable ? (
        <input
          style={{
            width: "100%",
            textAlign: "center",
            border: "none",
            outline: "none",
            color: "#101F46",
            fontSize: "18px",
            fontWeight: "500",
          }}
          type="text"
          value={destinations}
          onChange={(e) => {
            const newContent = [...content];
            newContent[index + 1] = e.target.value;
            setContent(newContent);
          }}
        />
      ) : (
        <p>{destinations}</p>
      )}
    </div>
  </div>
);

export default ActivityItem;
