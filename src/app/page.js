import HomeBlogComponent from "./home/HomeBlogComponent";

export const dynamic = "force-dynamic"; // Ensure SSR for every request

export default async function HomePage() {
  return <HomeBlogComponent />;
}
