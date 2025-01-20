"use client"; // Mark this as a client component

import { useEffect, useState } from "react";
import axios from "axios";
import { api_url } from "@/constants/base_url";
import Image from "next/image";
import Loading from "@/components/shared/Loading/Loading";

const getSubCards = (data, blogId, language) => {
  const subCards = Object.keys(data)
    .filter((key) => key.startsWith("sub_card_"))
    .map((key) => data[key]);

  return subCards;
};

const BlogSubcards = ({ blogId, language, languageId }) => {
  const [mainCard, setMainCard] = useState(null);
  const [subCards, setSubCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data on the client side using axios
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(
          `${api_url}blogLanguage/${languageId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const data = response.data.data;
        setMainCard(data?.main_card || {});
        setSubCards(getSubCards(data, blogId, language));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog data:", error);
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [blogId, language, languageId]);

  if (loading) {
    return <Loading />; // Show loading spinner or placeholder
  }

  return (
    <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
      <li>
        <figure className="post-thumb">
          {mainCard?.image &&
            mainCard?.image?.map((item, index) => (
              <a key={index} href="#">
                <Image
                  src={`${api_url}${item}`.replace("/api/", "/storage/")}
                  alt={mainCard?.title || "blog subcard"}
                  style={{ marginBottom: "20px" }}
                  width={200}
                  height={200}
                />
              </a>
            ))}
        </figure>
        <div className="post-content">
          <h4>{mainCard?.title}</h4>
          <p>{mainCard?.content}</p>
        </div>
      </li>
      {subCards.length > 0 ? (
        subCards.map((item, index) => (
          <li key={index}>
            <figure className="post-thumb">
              {item.image &&
                item.image.map((image, i) => (
                  <a key={i} href="#">
                    <Image
                      src={`${api_url}${image}`.replace("/api/", "/storage/")}
                      alt={item?.title}
                      style={{ marginBottom: "20px" }}
                      width={200}
                      height={200}
                    />
                  </a>
                ))}
            </figure>
            <div className="post-content">
              <h4>{item.title}</h4>
              <p>{item.content}</p>
            </div>
          </li>
        ))
      ) : (
        <p>No sub-cards available.</p>
      )}
    </ul>
  );
};

export default BlogSubcards;
