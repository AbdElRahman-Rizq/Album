import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { api_url } from '../../constants/base_url';
import axios from 'axios';
import PostThumb from './postThumb';
import Cookies from 'js-cookie';
import { useLanguage } from '@/providers/LanguageContext';

const RecentPost = () => {
  const { language } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [allBlogs, setAllBlogs] = useState([]);
  const [blogLanguageDetails, setBlogLanguageDetails] = useState([]);

  const fetchBlogs = async (page) => {
    const response = await axios.get(`${api_url}blog?page=${page}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${typeof window !== "undefined" ? Cookies.get("album-token") : ""}`,
      },
    });
    return response.data;
  };

  const fetchBlogLanguageDetails = async () => {
    const response = await axios.get(`${api_url}blogLanguage`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${typeof window !== "undefined" ? Cookies.get("album-token") : ""}`,
      },
    });
    return response.data;
  };

  const { data: blogData } = useQuery({
    queryKey: ['getBlog', currentPage],
    queryFn: () => fetchBlogs(currentPage),
    onSuccess: (response) => {
      setAllBlogs((prevBlogs) => [...prevBlogs, ...response.data.data]);
    },
    onError: (err) => {
      console.error("Error fetching data:", err);
    }
  });

  const { data: languageDetailsResponse } = useQuery({
    queryKey: ["getBlogLanguageDetails"],
    queryFn: fetchBlogLanguageDetails,
    onSuccess: (response) => {
      setBlogLanguageDetails(response.data);
    }
  });

  const totalPages = Math.ceil(blogData?.data?.total / blogData?.data?.per_page) || 1;

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

  // Filter blogs based on language
  const filteredBlogs = allBlogs.filter((blog) => {
    // If language is null or 'all', return all blogs
    if (language === null || language === "all") return true;

    // Check if the blog has a language-specific ID for the current language
    return blog[language] !== undefined;
  });

  return (
    <aside className="widget widget_latest_post widget-post-thumb">
      <h3 className="widget-title">Recent Post</h3>
      <ul>
        {filteredBlogs?.filter(blog => blog.slug !== null)?.slice(0, 3)?.map((blog) => {
          // Find the language-specific details for this blog
          const languageDetails = languageDetailsResponse?.data?.find(
            (details) => details.blogId == blog._id && details.language == language
          );
          console.log("languageDetails: ", languageDetailsResponse);
          return (
            <PostThumb
              key={blog._id}
              slug={blog.slug}
              imgSrc={languageDetails?.main_card.image[0]}
              title={blog.title}
              date={blog.created_at}
              comments={"No Comments"}
              language={language}
            />
          );
        })}
      </ul>
    </aside>
  )
}

export default RecentPost;