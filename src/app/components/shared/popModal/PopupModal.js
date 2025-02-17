"use client";

import { useState, useEffect } from "react";
import styles from "./PopupModal.module.css"; // Create this CSS file
import Link from "next/link";

const PopupModal = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={styles.overlay} >
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={() => setIsVisible(false)}>x</button>
        <div className={styles.container}>
          <div className={styles.content}>
            <img src="/images/itb-berlin-2025.png" alt="ITB Berlin 2025" className={styles.image} />
            <div>
              <h2>ITB </h2> 
              <h2>BERLIN</h2>
              <p>4-6 March</p>
            </div>
          </div>
            <div className={styles.popupBottom}>
              
              <h4>MEET US @ ITB BERLIN 2025</h4>
              <p>Let's Connect and Explore New Horizons!</p>
            </div>
        <Link href="/contact"className={styles.contactButton}>
        Contact Us
        </Link>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
