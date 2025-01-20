"use client"; // Mark the component as a client-side component

import { api_url } from "@/constants/base_url";

import { useLanguage } from "@/providers/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import "./langFilter.css";
import { useHomeBlog } from "@/providers/HomeBlogContext";
const LangFilter = () => {
  const { language, setLanguage } = useLanguage();
  const { langs, setLang } = useHomeBlog();
  const [accessToken, setAccessToken] = useState(null);

  // Fetch token on client-side only
  useEffect(() => {
    const token = Cookies.get("album-token");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  // Fetch languages only if accessToken is available
  const {
    data: allLanguages,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["languages"],
    queryFn: async () =>
      axios.get(`${api_url}language`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    enabled: !!accessToken, // Prevent query from running without token
  });

  if (!langs || langs.length === 0) {
    return null; // Prevent rendering before langs is available
  }
  console.log("languagessss: ", langs);

  return (
    <select
      name="language-selector"
      onChange={(e) => {
        const selectedLanguage = e.target.value;
        setLanguage(selectedLanguage);
        setLang(langs?.find((item) => item.name === selectedLanguage));
      }}
      className="lang-filter"
      value={language}
      aria-label="Select Language"
    >
      {isLoading ? (
        <option>Loading...</option>
      ) : error ? (
        <option>Error fetching languages</option>
      ) : (
        allLanguages?.data?.data.map((item) => (
          <option key={item.name} value={item.name}>
            {item.name.toUpperCase()}
          </option>
        ))
      )}
    </select>
  );
};

export default LangFilter;
