const SectionHeading = ({ heading, subheading, description1, description2, contentEditable, setTitle, setContent, content }) => (
  <div className="section-heading">
    <div className="row align-items-end">
      <div className="col-lg-6">
        {contentEditable?<input type="text" value={heading} onChange={(e) => {
          setTitle(e.target.value)
        }} 
        style={{textTransform:"uppercase", color:"#D51C29", border:"none", outline:"none", fontSize:"18px", fontWeight:"700", backgroundColor:"transparent", width:"100%"}}
        />:<h5 className="dash-style">{heading}</h5>}
        {contentEditable?<textarea 
          value={subheading}
          onChange={(e) => {
            const newContent = [...content]
            newContent[0] = e.target.value
            setContent(newContent)
          }}
          style={{
            border:"none",
            outline:"none",
            backgroundColor:"transparent",
            color:"#10101F",
            fontWeight:"900",
            fontSize:"48px",
          }}
        />:<h2>{subheading}</h2>}
      </div>
      <div className="col-lg-6">
        <div className="section-disc">
          {contentEditable?<textarea 
          value={description1}
          onChange={(e) => {
            const newContent = [...content]
            newContent[1] = e.target.value
            setContent(newContent)
          }}
          style={{
            border:"none",
            outline:"none",
            backgroundColor:"transparent",
            color:"#10101F",
            fontWeight:"500",
            fontSize:"16px",
          }}
        />:<p>{description1}</p>}
          {contentEditable?<textarea 
          value={description2}
          onChange={(e) => {
            const newContent = [...content]
            newContent[2] = e.target.value
            setContent(newContent)
          }}
          style={{
            border:"none",
            outline:"none",
            backgroundColor:"transparent",
            color:"#10101F",
            fontWeight:"500",
            fontSize:"16px",
          }}
        />:<p>{description2}</p>}
        </div>
      </div>
    </div>
  </div>
);

export default SectionHeading;
