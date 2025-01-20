"use client";
import { useEffect, useState } from "react";
import innerBannerImage from "@/assets/images/inner-banner.jpg";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import { useLanguage } from "@/providers/LanguageContext";
import Loading from "@/components/shared/Loading/Loading";
import BlogSubcards from "../components/BlogSubcards";
import RecentPost from "../components/RecentPost";
import { notifyError } from "@/components/shared/notify";
import { api_url } from "@/constants/base_url";
import Cookies from "js-cookie";
import {
  FaUser,
  FaComment,
  FaFacebookF,
  FaInstagram,
  FaPinterest,
  FaTags,
  FaTiktok,
  FaWhatsapp,
  FaTripadvisor,
} from "react-icons/fa";
import { SiTrustpilot } from "react-icons/si";

const BlogSingle = () => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current path

  const blog_Slug = pathname?.split("/")[2] || null;
  const { language: contextLanguage } = useLanguage();

  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!contextLanguage) {
      router.push("/blog");
      notifyError("No language selected");
    }
  }, [contextLanguage, router]);

  useEffect(() => {
    const fetchBlogData = async () => {
      if (!blog_Slug) return;

      try {
        const response = await axios.get(
          `${api_url}blog/show?slug=${blog_Slug}&language=${contextLanguage}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("album-token")}`,
            },
          }
        );


        // Adjust based on the actual API structure
        setBlogData(response?.data?.data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
        setBlogData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [blog_Slug, contextLanguage]);

  if (loading) {
    return <Loading color="#d51c29" />;
  }

  if (!blogData) {
    return <p style={{ color: '#d51c29', fontWeight: 'bold', textAlign: 'center' }}>No blog data available</p>;
  }

  return (
    <main id="content" className="site-main">
      <section className="inner-banner-wrap">
        <div
          className="inner-baner-container"
          style={{ backgroundImage: `url(${innerBannerImage})` }}
        >
          <div className="container">
            <div className="inner-banner-content">
              <h1 className="inner-title">{blogData?.blog?.title}</h1>
              <div className="entry-meta">

                <a href="#" style={{ marginRight: "1em" }}><FaUser /> Album Travel</a>

                <a href="#"><FaComment /> No Comments</a>

              </div>
            </div>
          </div>
        </div>
        <div className="inner-shape"></div>
      </section>

      <div className="single-post-section">
        <div className="single-post-inner">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 primary right-sidebar">
                <article className="single-content-wrap">
                  <h1>{blogData?.title}</h1>
                  <p>{blogData?.language?.description || ""}</p>
                </article>

                <BlogSubcards
                  blogId={blogData?.blog?.id}
                  language={contextLanguage}
                  languageId={blogData?.language?.id}
                />

                <div className="meta-wrap">
                  <div className="tag-links">
                    <FaTags style={{ color: "#1a1a1a", marginRight: "5px" }} />
                    <a href="#">Destination</a>, <a href="#">Hiking</a>,{" "}
                    <a href="#">Travel Diaries</a>
                  </div>
                </div>
              </div>

              <div
                className="col-lg-4 secondary"
                style={{ position: "relative" }}
              >
                <div
                  className="sidebar"
                  style={{ position: "sticky", top: "20%" }}
                >
                  <RecentPost />
                  <aside className="widget widget_social">
                    <h3 className="widget-title">Social Share</h3>
                    <div className="social-icon-wrap">
                      {/* Facebook */}
                      <a
                        href="https://www.facebook.com/albumtravelegypt?mibextid=ZbWKwL"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaFacebookF
                          style={{
                            color: "#1877F2",
                            fontSize: "1.5rem",
                            marginRight: "5px",
                          }}
                        />
                      </a>

                      {/* Pinterest */}
                      <a
                        href="https://www.pinterest.com/Albumtravel/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaPinterest
                          style={{
                            color: "#E60023",
                            fontSize: "1.5rem",
                            marginRight: "5px",
                          }}
                        />
                      </a>

                      {/* WhatsApp */}
                      <a
                        href="https://wa.me/+201033973047"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaWhatsapp
                          style={{
                            color: "#25D366",
                            fontSize: "1.5rem",
                            marginRight: "5px",
                          }}
                        />
                      </a>

                      {/* TikTok */}
                      <a
                        href="https://www.tiktok.com/@albumtravel"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaTiktok
                          style={{
                            color: "#000000",
                            fontSize: "1.5rem",
                            marginRight: "5px",
                          }}
                        />
                      </a>

                      {/* Instagram */}
                      <a
                        href="https://www.instagram.com/albumtravelegypt?igsh=MWtmamk2aGRpMTVqYg=="
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaInstagram
                          style={{
                            color: "#E4405F",
                            fontSize: "1.5rem",
                            marginRight: "5px",
                          }}
                        />
                      </a>

                      {/* TripAdvisor */}
                      <a
                        href="https://www.tripadvisor.com/Profile/albumtravel"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaTripadvisor
                          style={{
                            color: "#34E0A1",
                            fontSize: "1.5rem",
                            marginRight: "5px",
                          }}
                        />
                      </a>

                      {/* Trustpilot */}
                      <a
                        href="https://www.trustpilot.com/review/albumtravel.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <SiTrustpilot
                          style={{
                            color: "#00B67A",
                            fontSize: "1.5rem",
                            marginRight: "5px",
                          }}
                        />
                      </a>
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogSingle;
