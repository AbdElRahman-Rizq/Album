"use client";
import { ADDRESS, INFO_MAILE, PHONE1, PHONE2 } from "../constants/globals";
import Link from "next/link";
import Image from "next/image";
import SocialMadia from "./socialMedia";

import { useEffect, useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt
} from "react-icons/fa";
import { useHomeBlog } from "@/providers/HomeBlogContext";

const Footer = ({
  isLoggedIn,
  userType,
  contentEditable,
  title,
  setTitle,
  content,
  setContent,
}) => {
  const { blog, isBlogLoading } = useHomeBlog();
  const [isLoaded, setIsLoaded] = useState(false);

  // Function to handle phone click
  const handlePhoneClick = (phoneNumber) => {
    // Remove any non-digit characters
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");

    // Different handling for web and mobile
    if (typeof window !== "undefined") {
      // For mobile devices or when accessed from a phone
      window.location.href = `tel:+${cleanedPhoneNumber}`;
    }
  };

  // Function to handle email click
  const handleEmailClick = (email) => {
    if (typeof window !== "undefined") {
      // Open default email client
      window.location.href = `mailto:${email}`;
    }
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return null; // Prevent rendering until content is fully loaded
  }

  return (
    <footer
      id="colophon"
      className={`site-footer footer-primary ${isLoggedIn === "true" && userType === "admin"
        ? "force-display-none"
        : ""
        }`}
    >
      <div className="top-footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <aside className="widget widget_text">
                {contentEditable ? (
                  <input
                    type="text"
                    value={title[0]}
                    onChange={(e) => {
                      const newContent = [...title];
                      newContent[0] = e.target.value;
                      setTitle(newContent);
                    }}
                    style={{
                      color: "white",
                      backgroundColor: "transparent",
                      border: "none",
                      outline: "none",
                      fontSize: "18px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                    }}
                  />
                ) : (
                  <h3 className="widget-title">
                    {blog?.sub_card_13?.title?.split("-.-")?.[0] ||
                      "About Travel"}
                  </h3>
                )}
                {contentEditable ? (
                  <textarea
                    value={content[0]}
                    onChange={(e) => {
                      const newContent = [...content];
                      newContent[0] = e.target.value;
                      setContent(newContent);
                    }}
                    style={{
                      color: "white",
                      backgroundColor: "transparent",
                      border: "none",
                      outline: "none",
                      fontSize: "16px",
                    }}
                  />
                ) : (
                  <div className="textwidget widget-text text-white">
                    {blog?.sub_card_13?.content?.split("-.-")?.[0] ||
                      `We are committed to curate and flawlessly execute travel
                  experiences that allow travelers to explore the world with
                  ease and create memories that last a lifetime.`}
                  </div>
                )}
                <div className="award-img ">
                  <a href="#">
                    <Image
                      src={"/images/logo6.png"}
                      alt="logo"
                      width={100}
                      height={50}
                    />
                  </a>
                  <a href="#">
                    <Image
                      src={"/images/logo2.png"}
                      alt="logo"
                      width={100}
                      height={50}
                    />
                  </a>
                </div>
              </aside>
            </div>
            <div className="col-lg-3 col-md-6">
              <aside className="widget widget_text">
                {contentEditable ? (
                  <input
                    type="text"
                    value={title[1]}
                    onChange={(e) => {
                      const newContent = [...title];
                      newContent[1] = e.target.value;
                      setTitle(newContent);
                    }}
                    style={{
                      color: "white",
                      backgroundColor: "transparent",
                      border: "none",
                      outline: "none",
                      fontSize: "18px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                    }}
                  />
                ) : (
                  <h3 className="widget-title">
                    {blog?.sub_card_13?.title?.split("-.-")?.[1] ||
                      "CONTACT INFORMATION"}
                  </h3>
                )}
                <div className="textwidget widget-text text-white">
                  {contentEditable ? (
                    <input
                      type="text"
                      value={content[1]}
                      onChange={(e) => {
                        const newContent = [...content];
                        newContent[1] = e.target.value;
                        setContent(newContent);
                      }}
                      style={{
                        color: "white",
                        backgroundColor: "transparent",
                        border: "none",
                        outline: "none",
                        fontSize: "16px",
                      }}
                    />
                  ) : (
                    blog?.sub_card_13?.content?.split("-.-")?.[1] ||
                    "PARTNER'S AND CLIENTS ."
                  )}
                  <ul>
                    <li>
                      {contentEditable ? (
                        <>
                          <input
                            value={content[2]}
                            onChange={(e) => {
                              const newContent = [...content];
                              newContent[2] = e.target.value;
                              setContent(newContent);
                            }}
                            style={{
                              color: "white",
                              backgroundColor: "transparent",
                              border: "none",
                              outline: "none",
                              fontSize: "16px",
                            }}
                          />
                          <input
                            value={content[3]}
                            onChange={(e) => {
                              const newContent = [...content];
                              newContent[3] = e.target.value;
                              setContent(newContent);
                            }}
                            style={{
                              color: "white",
                              backgroundColor: "transparent",
                              border: "none",
                              outline: "none",
                              fontSize: "16px",
                            }}
                          />
                        </>
                      ) : (
                        <div className="">
                          <a
                            href={`tel:+${blog?.sub_card_13?.content?.split("-.-")?.[2] ||
                              PHONE1.replace(/\D/g, "")
                              }`}
                            onClick={(e) => {
                              e.preventDefault();
                              handlePhoneClick(
                                blog?.sub_card_13?.content?.split("-.-")?.[2] ||
                                PHONE1
                              );
                            }}
                            className="flex items-center mb-2"
                          >
                            <FaPhoneAlt style={{ marginRight: "5px" }} />
                            <span>
                              {blog?.sub_card_13?.content?.split("-.-")?.[2] ||
                                PHONE1}
                            </span>
                          </a>
                          {PHONE2 && (
                            <a
                              href={`tel:+${blog?.sub_card_13?.content?.split("-.-")?.[3] ||
                                PHONE2.replace(/\D/g, "")
                                }`}
                              onClick={(e) => {
                                e.preventDefault();
                                handlePhoneClick(
                                  blog?.sub_card_13?.content?.split(
                                    "-.-"
                                  )?.[3] || PHONE2
                                );
                              }}
                              className="flex items-center"
                            >
                              <FaPhoneAlt style={{ marginRight: "5px" }} />
                              <span>
                                {blog?.sub_card_13?.content?.split(
                                  "-.-"
                                )?.[3] || PHONE2}
                              </span>
                            </a>
                          )}
                        </div>
                      )}
                    </li>
                    <li>
                      {contentEditable ? (
                        <input
                          value={content[4]}
                          onChange={(e) => {
                            const newContent = [...content];
                            newContent[4] = e.target.value;
                            setContent(newContent);
                          }}
                          style={{
                            color: "white",
                            backgroundColor: "transparent",
                            border: "none",
                            outline: "none",
                            fontSize: "16px",
                          }}
                        />
                      ) : (
                        <a
                          onClick={() => handleEmailClick(INFO_MAILE)}
                          style={{ cursor: "pointer" }}
                        >
                          <FaEnvelope style={{ marginRight: "5px" }} />
                          {INFO_MAILE}
                        </a>
                      )}
                    </li>
                    <li className="flex text-white">
                      {contentEditable ? (
                        <input
                          value={content[5]}
                          onChange={(e) => {
                            const newContent = [...content];
                            newContent[5] = e.target.value;
                            setContent(newContent);
                          }}
                          style={{
                            color: "white",
                            backgroundColor: "transparent",
                            border: "none",
                            outline: "none",
                            fontSize: "16px",
                          }}
                        />
                      ) : (
                        <>
                          <FaMapMarkerAlt style={{ marginRight: "5px" }} />
                          {ADDRESS}
                        </>
                      )}
                    </li>
                  </ul>
                </div>
              </aside>
            </div>
            <div className="col-lg-3 col-md-6">
              <aside className="widget widget_recent_post">
                {contentEditable ? (
                  <input
                    type="text"
                    value={title[2]}
                    onChange={(e) => {
                      const newContent = [...title];
                      newContent[2] = e.target.value;
                      setTitle(newContent);
                    }}
                    style={{
                      color: "white",
                      backgroundColor: "transparent",
                      border: "none",
                      outline: "none",
                      fontSize: "18px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                    }}
                  />
                ) : (
                  <h3 className="widget-title">
                    {blog?.sub_card_13?.title?.split("-.-")?.[2] ||
                      "Latest Post"}
                  </h3>
                )}
                <ul>
                  <li>
                    {contentEditable ? (
                      <textarea
                        value={content[6]}
                        onChange={(e) => {
                          const newContent = [...content];
                          newContent[6] = e.target.value;
                          setContent(newContent);
                        }}
                        style={{
                          color: "white",
                          backgroundColor: "transparent",
                          border: "none",
                          outline: "none",
                          fontSize: "16px",
                        }}
                      />
                    ) : (
                      <h5>
                        <a href="#">
                          {blog?.sub_card_13?.content?.split("-.-")?.[6] ||
                            `We believe that travel is more than just a getaway—it’s
                        a gateway to a richer`}
                        </a>
                      </h5>
                    )}
                    <div className="entry-meta">
                      <span className="post-on">
                        <a href="#">May 23, 2024 </a>
                      </span>
                      <span className="comments-link">
                        <a href="#">No Comments</a>
                      </span>
                    </div>
                  </li>
                  <li>
                    {contentEditable ? (
                      <textarea
                        value={content[7]}
                        onChange={(e) => {
                          const newContent = [...content];
                          newContent[7] = e.target.value;
                          setContent(newContent);
                        }}
                        style={{
                          color: "white",
                          backgroundColor: "transparent",
                          border: "none",
                          outline: "none",
                          fontSize: "16px",
                        }}
                      />
                    ) : (
                      <h5>
                        <a href="#">
                          {blog?.sub_card_13?.content?.split("-.-")?.[7] ||
                            `The Wonders of Egypt Egypt, the land of ancient pharaohs
                        and timeless treasures, awaits you! Dive into the rich
                        history`}
                        </a>
                      </h5>
                    )}
                    <div className="entry-meta">
                      <span className="post-on">
                        <a href="#">May 23, 2024 </a>
                      </span>
                      <span className="comments-link">
                        <a href="#">No Comments</a>
                      </span>
                    </div>
                  </li>
                </ul>
              </aside>
            </div>
            <div className="col-lg-3 col-md-6">
              <aside className="widget widget_newslatter ">
                {contentEditable ? (
                  <input
                    type="text"
                    value={title[3]}
                    onChange={(e) => {
                      const newContent = [...title];
                      newContent[3] = e.target.value;
                      setTitle(newContent);
                    }}
                    style={{
                      color: "white",
                      backgroundColor: "transparent",
                      border: "none",
                      outline: "none",
                      fontSize: "18px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                    }}
                  />
                ) : (
                  <h3 className="widget-title">
                    {blog?.sub_card_13?.title?.split("-.-")?.[3] ||
                      "CONTACT US"}
                  </h3>
                )}
                <div className="widget-text text-white">
                  {contentEditable ? (
                    <input
                      value={content[8]}
                      onChange={(e) => {
                        const newContent = [...content];
                        newContent[8] = e.target.value;
                        setContent(newContent);
                      }}
                      style={{
                        color: "white",
                        backgroundColor: "transparent",
                        border: "none",
                        outline: "none",
                        fontSize: "16px",
                        width: "100%",
                      }}
                    />
                  ) : (
                    blog?.sub_card_13?.content?.split("-.-")?.[8] ||
                    "LET'S JOIN US FOR MORE UPDATE !!"
                  )}
                </div>
                <form className="newslatter-form">
                  <input type="tel" name="s" placeholder="Your Phone.." />
                  {contentEditable ? (
                    <input
                      value={content[9]}
                      onChange={(e) => {
                        const newContent = [...content];
                        newContent[9] = e.target.value;
                        setContent(newContent);
                      }}
                      style={{
                        color: "white",
                        border: "none",
                        outline: "none",
                        fontSize: "16px",
                        backgroundColor: "#0791BE",
                        textAlign: "center",
                        padding: "20px 0",
                      }}
                    />
                  ) : (
                    <input
                      type="submit"
                      name="s"
                      value={
                        blog?.sub_card_13?.content?.split("-.-")?.[9] ||
                        "Contact us"
                      }
                    />
                  )}
                </form>
              </aside>
            </div>
          </div>
        </div>
      </div>
      <div className="buttom-footer">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-5">
              <div className="footer-menu">
                <ul>
                  <li>
                    {contentEditable ? (
                      <input
                        value={content[10]}
                        onChange={(e) => {
                          const newContent = [...content];
                          newContent[10] = e.target.value;
                          setContent(newContent);
                        }}
                        style={{
                          color: "white",
                          backgroundColor: "transparent",
                          border: "none",
                          outline: "none",
                          fontSize: "16px",
                        }}
                      />
                    ) : (
                      <Link href="/privacy-policy">
                        {blog?.sub_card_13?.content?.split("-.-")?.[10] ||
                          "Privacy Policy"}
                      </Link>
                    )}
                  </li>
                  <li>
                    {contentEditable ? (
                      <input
                        value={content[11]}
                        onChange={(e) => {
                          const newContent = [...content];
                          newContent[11] = e.target.value;
                          setContent(newContent);
                        }}
                        style={{
                          color: "white",
                          backgroundColor: "transparent",
                          border: "none",
                          outline: "none",
                          fontSize: "16px",
                        }}
                      />
                    ) : (
                      <Link href="/terms-and-conditions">
                        {blog?.sub_card_13?.content?.split("-.-")?.[11] ||
                          "Term & Condition"}
                      </Link>
                    )}
                  </li>
                  {/* <li>
                                 <a href="#">FAQ</a>
                              </li> */}
                </ul>
              </div>
            </div>
            <div className="col-md-2 text-center">
              <div className="footer-logo">
                <a href="#">
                  <Image
                    src={"/images/Album-Travel-Logo.png"}
                    alt="logo"
                    width={100}
                    height={50}
                  />
                </a>
              </div>

              <SocialMadia color="white" />

            </div>
            <div className="col-md-5">
              <div
                className="copy-right text-right"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {contentEditable ? (
                  <input
                    value={content[12]}
                    onChange={(e) => {
                      const newContent = [...content];
                      newContent[12] = e.target.value;
                      setContent(newContent);
                    }}
                    style={{
                      color: "white",
                      backgroundColor: "transparent",
                      border: "none",
                      outline: "none",
                      fontSize: "16px",
                      width: "100%",
                      textAlign: "center",
                    }}
                  />
                ) : (
                  blog?.sub_card_13?.content?.split("-.-")?.[12] ||
                  "Copyright  2024 Album Travel. All rights reserved"
                )}
                {contentEditable ? (
                  <input
                    value={content[13]}
                    onChange={(e) => {
                      const newContent = [...content];
                      newContent[13] = e.target.value;
                      setContent(newContent);
                    }}
                    style={{
                      color: "white",
                      backgroundColor: "transparent",
                      border: "none",
                      outline: "none",
                      fontSize: "16px",
                      width: "100%",
                      textAlign: "center",
                    }}
                  />
                ) : (
                  <a
                    href="https://aisevenp.com/en/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div
                      style={{
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        src={"/images/7pWhite.png"}
                        alt="logo"
                        width={100}
                        height={50}
                      />
                      {blog?.sub_card_13?.content?.split("-.-")?.[13] ||
                        "Developed by 7P"}
                    </div>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
