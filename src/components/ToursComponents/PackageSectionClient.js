'use client';

import { useState } from 'react';
import PackageWrap from "./PackageWrap";
import Loading from "@/components/shared/Loading/Loading";

const PackageSectionClient = ({ initialPackages = [] }) => {
  const [packages, setPackages] = useState(initialPackages);
  const [isLoading, setIsLoading] = useState(false);

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
  );
};

export default PackageSectionClient;
