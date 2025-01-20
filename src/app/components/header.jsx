"use client";

import { useState, useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import logo2 from "@/assets/images/Album-Travel-Logo.png";
import CustomModal from "./shared/CustomModal";
import ROLES from "../constants/roles";
import LangFilter from "./LangFilter/LangFilter";
import SocialMadia from "./socialMedia";
import "./header.css";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaSearch
} from "react-icons/fa";
import {
  FaBars
} from "react-icons/fa6";
import { ADDRESS, INFO_MAILE, PHONE1, PHONE2 } from "../constants/globals";

function Header({ userType }) {
  const router = useRouter();
  const pathname = usePathname();

  const [token, setToken] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const iconStyle = { marginRight: '5px', color: 'black' };

  useLayoutEffect(() => {
    // Ensure cookies are only accessed on the client side
    const storedToken = Cookies.get("album-token");
    setToken(storedToken);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    Cookies.remove("currentUser");
    Cookies.remove("album-token");
    router.push("/login");
  };

  return (
    <>
      {token && userType === ROLES.ADMIN ? (
        "admin"
      ) : (
        <>
          <header
            id="masthead"
            className={`site-header header-primary ${token && userType === ROLES.ADMIN ? "force-display-none" : ""
              }`}
          >
            <div className="top-header">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-9 d-none d-lg-block">
                    <div className="header-contact-info">
                      <ul>
                        <li>
                          <Link href={`tel:${PHONE1}`}>
                            <FaPhone style={iconStyle} />
                            {PHONE1}
                          </Link>
                        </li>
                        <li>
                          <Link href={`tel:${PHONE2}`}>
                            <FaPhone style={iconStyle} />
                            {PHONE2}
                          </Link>
                        </li>
                        <li>
                          <Link href={`mailto:${INFO_MAILE}`}>
                            <FaEnvelope style={iconStyle} />
                            {INFO_MAILE}
                          </Link>
                        </li>
                        <li>
                          <FaMapMarkerAlt style={iconStyle} />
                          {ADDRESS}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-3 d-flex justify-content-lg-end justify-content-between">
                    <SocialMadia />
                    <LangFilter />
                  </div>
                </div>
              </div>
            </div>

            <div className="bottom-header">
              <div className="container-fluid px-lg-3 d-flex align-items-center buttom-header-container">
                <div className="site-identity">
                  <h1 className="site-title">
                    <Link href="/">
                      <Image src={logo2} priority alt="logo" width={200} height={50} />
                    </Link>
                  </h1>
                </div>

                <div className="main-navigation d-none d-lg-block">
                  <nav id="navigation" className="navigation">
                    <ul>
                      <li className={pathname === "/" ? "active" : ""}>
                        <Link href="/">Home</Link>
                      </li>
                      <li
                        className={pathname === "/destination" ? "active" : ""}
                      >
                        <Link href="/destination">Destinations</Link>
                      </li>
                      <li className={pathname === "/tours" ? "active" : ""}>
                        <Link href="/tours">Tours</Link>
                      </li>
                      <li className={pathname === "/about" ? "active" : ""}>
                        <Link href="/about">About</Link>
                      </li>
                      <li className={pathname === "/blog" ? "active" : ""}>
                        <Link href="/blog">Blog</Link>
                      </li>
                    </ul>
                  </nav>
                </div>

                <div
                  className="header-btn"

                >
                  <Link href="/contact" className="button-primary">
                    BOOK NOW
                  </Link>
                  {!token ? (
                    <Link href="/login" className="button-primary">
                      LOGIN
                    </Link>
                  ) : (
                    <button onClick={handleLogout} className="button-primary">
                      LOGOUT
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="mobile-menu-container">
              <div className="slicknav_menu">
                <button
                  className="slicknav_btn mobile-menu-toggle"
                  onClick={toggleMobileMenu}
                >
                  <span className="slicknav_menutxt">Menu</span>
                  <span className="slicknav_icon">
                    <FaBars style={iconStyle} />
                  </span>
                </button>
                <nav
                  className={`slicknav_nav d-lg-none ${isMobileMenuOpen ? 'd-block' : 'd-none'
                    }`}
                >
                  <ul onClick={closeMobileMenu}>
                    <li className={pathname === "/" ? "active" : ""}>
                      <Link href="/">Home</Link>
                    </li>
                    <li className={pathname === "/destination" ? "active" : ""}>
                      <Link href="/destination">Destinations</Link>
                    </li>
                    <li className={pathname === "/tours" ? "active" : ""}>
                      <Link href="/tours">Tours</Link>
                    </li>
                    <li className={pathname === "/about" ? "active" : ""}>
                      <Link href="/about">About</Link>
                    </li>
                    <li className={pathname === "/blog" ? "active" : ""}>
                      <Link href="/blog">Blog</Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </header>
        </>
      )}
    </>
  );
}

export default Header;
