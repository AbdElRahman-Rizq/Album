import axios from "axios";
import { api_url } from "../constants/base_url";
import Cookies from "js-cookie";

// Fetch languages and blog data
export const fetchLangs = async () => {
  try {
    const response = await axios.get(`${api_url}home`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("album-token")}`,
      },
    });
    return response.data?.data || {};
  } catch (error) {
    console.error("Error fetching languages:", error);
    return {};
  }
};

export const fetchBlogData = async (langName) => {
  try {
    console.log("lang: ", langName);
    const response = await axios.get(`${api_url}home/${langName}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("album-token")}`,
      },
    });
    return response.data?.data || {};
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return {};
  }
};

export const fetchTours = async () => {
  try {
    const response = await axios.get(`${api_url}tour`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("album-token")}`,
      },
    });
    return response.data?.data || [];
  } catch (error) {
    console.error("Error fetching tours:", error);
    return [];
  }
};