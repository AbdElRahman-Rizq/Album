'use client';

import { useEffect } from "react";
import Image from "next/image";
import innerBanner from "@/assets/images/inner-banner.jpg";

export default function IneerBanner({ bannerName }) {
  useEffect(() => {
    document.getElementById("top")?.scrollIntoView({ behavior: 'auto' });
  }, []);

  return (
    <section className="inner-banner-wrap" id="top">
      <div className="inner-baner-container relative">
        <Image
          src={innerBanner}
          alt="Inner Banner"
          fill
          priority
          quality={80}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          className="absolute inset-0 z-0"
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            // zIndex: 10
          }}
        ></div>
        <div className="container relative" style={{ zIndex: 20 }}>
          <div className="inner-banner-content">
            <h1 className="inner-title">{bannerName}</h1>
          </div>
        </div>
      </div>
      <div className="inner-shape"></div>
    </section>
  );
}
