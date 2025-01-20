const SectionHeading = ({
  title,
  subheading,
  description1,
  description2,
  contentEditable,
  setTitle,
  setContent,
  content,
  textAlign,
  headingTextAlignment,
  rowAlignment,
  containerTextsStyle,
  children,
  onChange,
}) => {
  return (
    <>
      <div className={`section-heading ${headingTextAlignment}`}>
        <div className={`row ${rowAlignment}`}>
          <div className={containerTextsStyle}>
            {contentEditable ? (
              <input
                type="text"
                value={title}
                onChange={onChange}
                style={{
                  color: "#d51c29",
                  fontSize: "15px",
                  fontWeight: "700",
                  lineHeight: "1.2",
                  marginBottom: "22px",
                  textTransform: "uppercase",
                  display: "inline-block",
                  width: "100%",
                  border: "none",
                  outline: "none",
                  textAlign: textAlign || "center",
                }}
              />
            ) : (
              <h5 className="dash-style">{title}</h5>
            )}
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionHeading;
