import ActivitySection from "../components/ActivityComponents/ActivitySection";
import IneerBanner from "../components/IneerBanner/IneerBanner";


import axios from "axios";
import { api_url } from "@/constants/base_url";
import Head from "next/head";
import PackageSection from "./ToursComponents/PackageSection";


export const dynamic = "force-dynamic";

export default async function ToursPage() {
  return (
    <>
      <Head>
        <title>Tour Packages</title>
        <meta name="Tours" content="Discover our amazing tour packages and activities" />
        <meta name="keywords" content="tours, travel, packages, activities" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main id="content" className="site-main">
        <IneerBanner bannerName={"Tour Packages"} />
        <PackageSection />
        <ActivitySection />
      </main>
    </>
  );
}
