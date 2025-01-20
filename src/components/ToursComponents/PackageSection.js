'use client';

import { useState } from 'react';
import PackageWrap from "./PackageWrap";
import Loading from "@/components/shared/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { api_url } from "@/constants/base_url";
import { getTokenFromCookies } from "@/utils/cookieUtils";

const PackageSection = () => {
  const [destinationId, setDestinationId] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["destinationTours", destinationId],
    queryFn: () =>
      axios.get(`${api_url}tour${destinationId ? `?destination_id=${destinationId}` : ""}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTokenFromCookies()}`,
        },
      }),
  });

  return (
    <div className="package-section">
      <div className="container">
        <div className="package-inner packages">
          <div className="row">
            {isLoading ? (
              <div className="col-lg-4 col-md-6">
                <Loading />
              </div>
            ) : (
              data?.data?.data?.data?.map((pkg) => (
                <div className="col-lg-4 col-md-6" key={pkg.id}>
                  <PackageWrap {...pkg} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageSection;
