"use client";
import { useState, useEffect } from "react";
import { FaChevronUp } from "react-icons/fa";

const ScrollToTopButton = ({ isLoggedIn, userType }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to a certain distance
  const toggleVisibility = () => {
    if (typeof window !== 'undefined') {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener("scroll", toggleVisibility);
      return () => {
        window.removeEventListener("scroll", toggleVisibility);
      };
    }
  }, []);

  return (
    <button
      type="button"
      className={`scroll-to-top scroll-to-top-btn ${isVisible ? "show" : ""} ${isLoggedIn === "true" && userType === "admin" ? "force-display-none" : ""}`}
      onClick={scrollToTop}
      style={{
        display: isVisible ? 'flex' : 'none',
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        color: 'white',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <FaChevronUp style={{
        zIndex: 1000,
        fontSize: '1.5em',
        color: 'white'
      }} />
    </button>
  );
};

export default ScrollToTopButton;