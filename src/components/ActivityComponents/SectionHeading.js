const ActivitySectionHeading = ({title, subtitle, content, contentEditable, setTitle, setContent, allContent, alignment}) => (
  <div className="section-heading text-center">
    <div className="row">
      <div className="col-lg-8 offset-lg-2">
        {contentEditable?<input type="text" value={title} onChange={(e) => {
          setTitle(e.target.value)
        }} style={{color: "#d51c29", 
          fontSize: "15px", 
          fontWeight: "700", 
          lineHeight: "1.2", 
          marginBottom: "22px", 
          textTransform: "uppercase", 
          display: "inline-block", 
          width:"100%", 
          border:"none", 
          outline:"none", 
          textAlign:alignment||"center"}} />:<h5 className="dash-style">{title || "TRAVEL BY ACTIVITY"}</h5>}
        {contentEditable?<textarea style={{width:"100%", textAlign:alignment||"center", border:"none", outline:"none", color:"#101F46", fontSize:"48px", fontWeight:"900"}} type="text" value={subtitle} onChange={(e) => {
          const newContent = [...allContent]
          newContent[0] = e.target.value
          setContent(newContent)
        }} />:<h2>{subtitle || "ADVENTURE & ACTIVITY"}</h2>}
        {contentEditable?<textarea type="text" value={content} onChange={(e) => {
          const newContent = [...allContent]
          newContent[1] = e.target.value
          setContent(newContent)
        }} style={{color:"#101F46", 
          fontSize: "15px", 
          fontWeight: "500", 
          lineHeight: "1.2", 
          marginBottom: "22px", 
          display: "inline-block", 
          width:"100%", 
          border:"none", 
          outline:"none", 
          textAlign:alignment||"center"}} />:<p>{content || "Mollit voluptatem perspiciatis convallis elementum corporis quo veritatis aliquid blandit, blandit torquent, odit placeat. Adipiscing repudiandae eius cursus? Nostrum magnis maxime curae placeat."}</p>}
      </div>
    </div>
  </div>
);
export default ActivitySectionHeading;
