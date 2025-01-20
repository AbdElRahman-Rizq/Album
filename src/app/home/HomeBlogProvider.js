// "use client";
// import React, { createContext, useContext, useState } from "react";

// const HomeBlogContext = createContext();

// export const useHomeBlog = () => useContext(HomeBlogContext);

// export const HomeBlogProvider = ({
//   children,
//   initialLangs = [],
//   initialLang = "en",
//   initialBlog = {},
// }) => {
//   const [langs, setLangs] = useState(initialLangs);
//   const [lang, setLang] = useState(initialLang?.name || "en");
//   const [blog, setBlog] = useState(initialBlog);

//   return (
//     <HomeBlogContext.Provider
//       value={{ langs, lang, blog, setLangs, setLang, setBlog }}
//     >
//       {children}
//     </HomeBlogContext.Provider>
//   );
// };
