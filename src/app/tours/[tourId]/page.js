
import TourDetailsClient from "./TourDetailsClient";
import QueryProvider from "@/providers/QueryProvider";

export default async function TourDetailsPage({ params }) {
  const tourId = params.tourId;


  // Get language from cookies using server-side method




  return (
    <QueryProvider>
      <div style={{ paddingTop: "10%" }}>
        <TourDetailsClient
          slug={tourId}
        />
      </div>
    </QueryProvider>
  );
}