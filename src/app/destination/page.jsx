import IneerBanner from "@/components/IneerBanner";
import DistiItem from "@/components/distiItem";
import { api_url } from "@/constants/base_url";
import SubscribeSection from "@/components/SubscribeSection";
import style from "./destination.module.css";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Destination() {
  // Handle Authentication and Token Validation
  const cookieStore = cookies();
  const token = cookieStore.get("album-token")?.value;

  // if (!token) {
  //   console.error("Error: No token available.");
  //   return redirect("/login"); // Redirects and stops execution
  // }

  try {
    // Fetch data from the API
    const response = await axios.get(`${api_url}destinations`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Check for successful response
    if (response.status !== 200) {
      throw new Error("Error fetching destinations");
    }

    const destinations = response.data?.data || [];

    return (
      <main id="content" className="site-main">
        <IneerBanner bannerName={"Destination"} />
        <section className={style.destinationsContainer}>
          {destinations.map((destination) => (
            <DistiItem
              key={destination.id}
              imgSrc={`${api_url}${destination.image}`.replace(
                "/api/",
                "/storage/"
              )}
              country={destination.name}
              content="Jordan Capital"
              id={destination.slug}
            />
          ))}
        </section>
        <SubscribeSection />
      </main>
    );
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return redirect("/login"); // Redirect on API error
  }
}
