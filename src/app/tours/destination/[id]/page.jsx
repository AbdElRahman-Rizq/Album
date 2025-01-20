import Loading from "@/components/shared/Loading/Loading";
import axios from "axios";
import { cookies } from "next/headers";
import IneerBanner from "@/components/IneerBanner";
import { api_url } from "@/constants/base_url";
import { redirect } from "next/navigation";
import ActivitySection from "../../../../components/ActivityComponents/ActivitySection";
import PackageWrap from "../../../../components/ToursComponents/PackageWrap";

export default async function DestinationPage({ params }) {
  const { id } = await params;

  let packages = [];
  let error = null;

  try {
    // ✅ Get token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("album-token")?.value;

    // if (!token) {
    //   console.error("No token found. Redirecting to login.");
    //   // redirect("/login");
    // }

    // ✅ Fetch data from the API
    const response = await axios.get(
      `${api_url}tour${id ? `?destination_slug=${id}` : ""}`,
      {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      }
    );

    // if (response.status === 200) {
    packages = response?.data?.data?.data || [];
    // } else {
    // throw new Error("Failed to fetch packages.");
    // }
  } catch (err) {
    console.error("Error fetching tours:", err.message);
    error = err.message;
  }

  return (
    <main id="content" className="site-main">
      <IneerBanner bannerName="Tour Packages" />
      <div className="package-section">
        <div className="container">
          <div className="package-inner packages">
            <div className="row">
              {error ? (
                <div className="col-12 text-center">
                  <h4 className="text-danger">{error}</h4>
                </div>
              ) : packages.length === 0 ? (
                <div className="col-12 text-center">
                  <h4>No packages found for this destination.</h4>
                </div>
              ) : (
                packages.map((pkg) => (
                  <div className="col-lg-4 col-md-6" key={pkg.id}>
                    <PackageWrap {...pkg} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <ActivitySection />
    </main>
  );
}
