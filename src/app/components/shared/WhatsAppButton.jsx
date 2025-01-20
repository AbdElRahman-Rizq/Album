"use client";
import { useState, useEffect } from "react";
import FaWhatsapp from "@/assets/images/whatsapp-icon.png";
import Image from "next/image";

const WhatsAppButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      if (scrollPercent > 5) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    showButton && (
      <a
        href="https://wa.me/+201033973047"
        className="whatsapp-button"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src={FaWhatsapp} alt="whatsapp" width={80} height={100} />
      </a>
    )
  );
};

export default WhatsAppButton;
