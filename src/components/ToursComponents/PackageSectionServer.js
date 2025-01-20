import axios from "axios";
import { api_url } from "@/constants/base_url";
import PackageSectionClient from "./PackageSectionClient";
import { cookies } from "next/headers";

async function fetchTourPackages(destinationId = null) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("album-token")?.value;

    const response = await axios.get(
      `${api_url}tour${destinationId ? `?destination_id=${destinationId}` : ""}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data?.data?.data || [];
  } catch (error) {
    console.error("Error fetching tour packages:", error);
    return [];
  }
}

export default async function PackageSection() {
  const packages = await fetchTourPackages();

  return <PackageSectionClient initialPackages={packages} />;
}
