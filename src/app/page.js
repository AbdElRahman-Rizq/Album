import { HomeBlogProvider } from "./home/HomeBlogProvider";
import HomeBlogComponent from "./home/HomeBlogComponent";
import { fetchBlogData, fetchLangs } from "./utils/homeApi";


export default async function HomePage() {
  // Fetch languages and blog data from the API
  const langsData = await fetchLangs();
  const langs = Object.keys(langsData)
    .filter((key) => key !== "_id" && key !== "updated_at")
    .map((name) => ({ name, id: langsData[name] }));

  const initialLang = langs[0]; // Default to the first language
  const initialBlog = initialLang
    ? await fetchBlogData(initialLang.name)
    : {};

  return (
    <HomeBlogProvider
      initialLangs={langs}
      initialLang={initialLang}
      initialBlog={initialBlog}
    >
      <HomeBlogComponent />
    </HomeBlogProvider>
  );
}

// export default function Home() {
//   return (
//     <HomeBlogProvider>
//       <HomeBlogComponent />
//     </HomeBlogProvider>
//   )
// }
