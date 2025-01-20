import ActivitySection from "../../components/ActivityComponents/ActivitySection";
import IneerBanner from "../../components/IneerBanner";
import PackageSection from "../../components/ToursComponents/PackageSectionServer";

import axios from "axios";
import { api_url } from "@/constants/base_url";
import Head from "next/head";


export const dynamic = "force-dynamic"; // Ensure SSR for every request

export default async function ToursPage() {
  const { data } = await axios.get(`${api_url}page/tour`); // Fetch data directly

  const metaTitle = data?.title || "Tour Packages"; // Set meta title
  const metaDescription = data?.description || "Explore our tour packages."; // Set meta description
  console.log("title: ", metaTitle);

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
      </Head>
      <main id="content" className="site-main">
        <IneerBanner bannerName={"Tour Packages"} />
        <PackageSection />
        <ActivitySection />
      </main>
    </>
  );
}
