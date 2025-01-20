"use client";
import { useEffect } from "react";
import Image from "next/image";
import innerBanner from "@/assets/images/inner-banner.jpg";

export default function IneerBanner({ bannerName }) {
  useEffect(() => {
    document.getElementById("top").scrollIntoView({ behavior: "auto" });
  });

  return (
    <section className="inner-banner-wrap" id="top">
      <div
        className="inner-baner-container"
        style={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Image */}
        <Image
          src={innerBanner}
          alt="Inner Banner"
          fill
          priority
          quality={80}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit: "cover",
            position: "absolute",
            inset: 0,
            zIndex: 0,
          }}
        />

        {/* Dark Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust opacity here
            zIndex: 5,
          }}
        ></div>

        {/* Content */}
        <div
          className="container"
          style={{
            position: "relative",
            zIndex: 10,
          }}
        >
          <div className="inner-banner-content">
            <h1 className="inner-title">{bannerName}</h1>
          </div>
        </div>
      </div>
      <div className="inner-shape"></div>
    </section>
  );
}
