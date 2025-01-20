"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import Head from "next/head";
import { FaFacebookF, FaPinterest, FaWhatsapp, FaInstagram } from "react-icons/fa";
import WidgetSocial from "./components/widgetSocial";
import RecentPost from "./components/RecentPost";
import innerBanner from "@/assets/images/inner-banner.jpg";
import { useLanguage } from "@/providers/LanguageContext";
import { api_url } from "@/constants/base_url";
import Banner from "@/components/shared/banner";
import Loading from "@/components/shared/Loading/Loading";
import Empty from "@/components/empty/empty";
import ArchiveCard from "./components/archiveCard";
import Pagination from "@/components/pagination/pagination";

const Blog = () => {
  const { language, setLanguage } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [allBlogs, setAllBlogs] = useState([]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchBlogs = async (page) => {
    const response = await axios.get(`${api_url}blog?page=${page}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${typeof window !== "undefined" ? Cookies.get("album-token") : ""}`,
      },
    });
    return response.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["gestBlog", currentPage, language],
    queryFn: () => fetchBlogs(currentPage),
    onSuccess: (response) => {
      setAllBlogs((prevBlogs) => [...prevBlogs, ...response.data.data]);
    },
    onError: (err) => {
      console.error("Error fetching data:", err);
    },
  });

  const totalPages = Math.ceil(data?.data?.total / data?.data?.per_page) || 1;

  useEffect(() => {
    const fetchAllPages = async () => {
      let fetchedBlogs = [];
      for (let page = 1; page <= totalPages; page++) {
        const pageData = await fetchBlogs(page);
        fetchedBlogs = [...fetchedBlogs, ...pageData.data.data];
      }
      setAllBlogs(fetchedBlogs);
    };

    if (language) {
      fetchAllPages();
    }
  }, [language, totalPages]);

  const filteredBlogs = allBlogs.filter(
    (blog) => blog[language]
  );

  const { data: metaData } = useQuery({
    queryKey: ["blogMeta"],
    queryFn: () => axios.get(`${api_url}page/blog`)
  });

  const metaTitle = metaData?.data?.title || "Blogs";
  const metaDescription = metaData?.data?.description || "Explore our latest blogs.";

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
      </Head>
      <main id="content" className="site-main">
        <Banner innerBanner={innerBanner}>Blogs</Banner>
        <div className="archive-section blog-archive">
          <div className="archive-inner">
            <div className="container">
              <div className="row">
                {/* Main Blog Content */}
                <div className="col-lg-8 primary right-sidebar">
                  {isLoading ? (
                    <div className="loading">
                      <Loading />
                    </div>
                  ) : (
                    <>
                      <div className="grid row" style={{ position: "relative" }}>
                        {language === null || language === "all" ? (
                          allBlogs.length === 0 ? (
                            <Empty text="No Blogs yet" />
                          ) : (
                            allBlogs.map((blog) => (
                              <div key={blog._id} className="grid-item col-md-6">
                                <ArchiveCard
                                  id={blog._id}
                                  title={blog.title}
                                  date={blog.created_at}
                                  imgSrc={blog?.img}
                                  comments="No Comments"
                                  language={null}
                                />
                              </div>
                            ))
                          )
                        ) : filteredBlogs.length === 0 ? (
                          <Empty text="No Blogs Support this language" />
                        ) : (
                          filteredBlogs?.map((blog) => (
                            <div key={blog._id} className="grid-item col-md-6">
                              <ArchiveCard
                                slug={blog.slug}
                                id={blog._id}
                                title={blog.title}
                                date={blog.created_at}
                                comments="No Comments"
                                language={language}
                              />
                            </div>
                          ))
                        )}
                      </div>

                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                      />
                    </>
                  )}
                </div>

                {/* Sidebar Content */}
                <div className="col-lg-4 secondary">
                  <div className="sidebar">
                    <RecentPost />
                    <aside className="widget widget_social">
                      <h3 className="widget-title">Social Share</h3>
                      <div className="social-icon-wrap">
                        <WidgetSocial
                          type="facebook"
                          name="Facebook"
                          href="https://www.facebook.com/albumtravelegypt"
                        >
                          <FaFacebookF className="icon mx-2" />
                        </WidgetSocial>
                        <WidgetSocial
                          type="pinterest"
                          name="Pinterest"
                          href="https://www.pinterest.com/Albumtravel/"
                        >
                          <FaPinterest className="icon mx-2" />
                        </WidgetSocial>
                        <WidgetSocial
                          type="whatsapp"
                          name="Whatsapp"
                          href="https://wa.me/+201033973047"
                        >
                          <FaWhatsapp className="icon mx-2" />
                        </WidgetSocial>
                        <WidgetSocial
                          type="instagram"
                          name="Instagram"
                          href="https://www.instagram.com/albumtravelegypt"
                        >
                          <FaInstagram className="icon mx-2" />
                        </WidgetSocial>
                      </div>
                    </aside>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Blog;
