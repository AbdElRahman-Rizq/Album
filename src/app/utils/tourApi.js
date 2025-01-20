import { api_url } from "@/constants/base_url";
import axios from "axios";



// Create a custom axios instance with default configs
const apiClient = axios.create({
  baseURL: api_url,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  }
});

// New function to fetch blogs
export async function fetchBlogs() {
  try {
    const response = await apiClient.get('/blogLanguage');
    return response.data.data; // Return the data array
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return []; // Return an empty array on error
  }
}

export async function fetchTourDetails(slug, language) {
  try {


    // Validate slug
    if (!slug || slug === 'undefined') {
      throw new Error("Invalid tour Slug");
    }

    // Safely get cookies
    let token = null;


    const headers = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      "Accept-Language": language?.name
    };

    // First, fetch tour details to get the blog ID
    const tourResponse = await apiClient.get(`tour/${slug}`, { headers });
    const tourData = tourResponse.data?.data;
    console.log("TTTourData", tourData);

    // Parallel requests with better error handling
    const requests = [
      apiClient.get(`tourDay/${tourData?.id}`, { headers }),
      apiClient.get(`tourPricing/${tourData?.id}`, { headers }),
      tourData?.blogId
        ? apiClient.get(`blog/show?Blogid=${tourData.blogId}&language=${language?.name || "en"}`, { headers })
        : Promise.resolve(null)
    ];


    const [
      tourDaysResponse,
      pricingResponse,
      blogResponse
    ] = await Promise.allSettled(requests);

    // Safely extract tour days data
    let tourDaysData = [];
    if (tourDaysResponse.status === 'fulfilled') {
      try {
        tourDaysData = tourDaysResponse.value.data?.data ||
          tourDaysResponse.value?.data?.data ||
          tourDaysResponse.value?.data ||
          [];
        console.log("Tour Days Response: ", tourDaysData);
      } catch (error) {
        console.error("Error parsing tour days response:", error);
      }
    } else {
      console.error("Tour days request failed:", tourDaysResponse.reason);
    }

    // Safely extract pricing data
    let pricingData = [];
    if (pricingResponse.status === 'fulfilled') {
      try {
        pricingData = pricingResponse.value.data?.data?.data ||
          pricingResponse.value.data?.data ||
          pricingResponse.value?.data ||
          [];
      } catch (error) {
        console.error("Error parsing pricing response:", error);
      }
    } else {
      console.error("Pricing request failed:", pricingResponse.reason);
    }

    // Fetch blogs to filter by blogId
    const blogs = await fetchBlogs();

    // Filter the blog to get the languageId based on tourData.blogId
    const languageId = blogs?.find(blog => blog.blogId === tourData.blogId)?._id;

    // Additional request for subCard, only if languageId exists
    let subCardResponse = null;
    if (languageId) {
      try {
        subCardResponse = await apiClient.get(
          `blogLanguage/${languageId}`,
          { headers }
        );
      } catch (subCardError) {
        console.warn("Error fetching subCard:", subCardError);
      }
    }
    console.log("SubCard Response: ", subCardResponse?.data?.data);
    return {
      tour: tourData,
      blog: blogResponse.status === 'fulfilled' ? blogResponse.value?.data?.data : null,
      subCard: subCardResponse?.data?.data,
      tourDays: tourDaysData,
      pricing: pricingData,
      error: null
    };
  } catch (error) {
    console.error("Detailed Error fetching tour details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url,
      code: error.code
    });

    // More detailed error handling
    if (error.code === 'ECONNABORTED') {
      console.error('Request timed out. Check network connectivity.');
    } else if (error.code === 'ENOTFOUND') {
      console.error('DNS resolution failed. Check the API URL.');
    }

    // Return a default structure to prevent hydration errors
    return {
      tour: null,
      blog: null,
      tourDays: [],
      pricing: [],
      error: error.message || 'Unknown network error'
    };
  }
}
