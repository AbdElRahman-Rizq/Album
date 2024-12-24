"use client";
import { notifyError, notifySuccess } from "@/components/shared/notify";
import { api_url } from "@/constants/base_url";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

const HomeBlogContext = createContext();

export const useHomeBlog = () => useContext(HomeBlogContext);

export const HomeBlogProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [langs, setLangs] = useState([]);
  const [lang, setLang] = useState(() => {
    if (typeof window !== "undefined") {
      return null; // Initial client-side safe value
    }
    return null; // Safe server-side value
  });

  const [blog, setBlog] = useState({});
  const { data, isLoading } = useQuery({
    queryKey: ["homeBlogLangs"],
    queryFn: () =>
      axios.get(`${api_url}home`, {
        headers: {
          "Content-Type": "application/json",
        },
      }),
  });
  const { mutate: addLang, isPending: isAddLangLoading } = useMutation({
    mutationFn: (data) =>
      axios.post(`${api_url}home`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("album-token")}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["homeBlogLangs"]);
      notifySuccess("Language added successfully");
    },
    onError: () => {
      notifyError("Failed to add language");
    },
  });
  const { mutate: updateLang, isPending: isUpdateLangLoading } = useMutation({
    mutationFn: (data) =>
      axios.post(
        `${api_url}home`,
        { ...data, _method: "PUT" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      ),
  });
  const { mutate: deleteLang, isPending: isDeleteLangLoading } = useMutation({
    mutationFn: (langId) =>
      axios.delete(`${api_url}home/${langId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["homeBlogLangs"]);
      notifySuccess("Language deleted successfully");
    },
    onError: () => {
      notifyError("Failed to delete language");
    },
  });
  const {
    data: blogData,
    isLoading: isBlogLoading,
    refetch,
  } = useQuery({
    queryKey: ["homeBlog", lang],
    queryFn: () =>
      axios.get(`${api_url}home/${lang?.name}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    enabled: !!lang,
  });
  const { mutate: addSection, isPending: isAddSectionLoading } = useMutation({
    mutationFn: (data) =>
      axios.post(`${api_url}home/subcard`, data, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    onSuccess: () => {
      refetch();
      notifySuccess("Section added successfully");
    },
    onError: () => {
      notifyError("Failed to add section");
    },
  });

  const { mutate: updateSection, isPending: isUpdateSectionLoading } =
    useMutation({
      mutationFn: (data) =>
        axios.post(`${api_url}home/subcard`, data, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }),
      onSuccess: () => {
        refetch();
        notifySuccess("Section updated successfully");
      },
      onError: () => {
        notifyError("Failed to update section");
      },
    });

  const { data: allLanguages, isLoading: isAllLanguagesLoading } = useQuery({
    queryKey: ["languages"],
    queryFn: () =>
      axios.get(`${api_url}language`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
  });

  useEffect(() => {
    if (data?.data?.data) {
      const allLangs = Object.keys(data?.data?.data)
        .filter((item) => item !== "_id" && item !== "updated_at")
        .map((item) => {
          return { name: item, id: data?.data?.data?.[item] };
        })
        .sort((a, b) => (a.name === "en" ? -1 : b.name === "en" ? 1 : 0));
      setLangs(allLangs);
      setLang({
        name: allLangs[0]?.name,
        id: data?.data?.data?.[`${allLangs[0]?.name}`],
      });
    }
  }, [data]);
  useEffect(() => {
    if (blogData?.data?.data) {
      setBlog(blogData?.data?.data);
    }
  }, [blogData]);
  return (
    <HomeBlogContext.Provider
      value={{
        langs,
        lang,
        setLang,
        isLangsLoading: isLoading,
        addLang,
        isAddLangLoading,
        updateLang,
        isUpdateLangLoading,
        deleteLang,
        isDeleteLangLoading,
        blog,
        isBlogLoading,
        addSection,
        isAddSectionLoading,
        updateSection,
        isUpdateSectionLoading,
        allLanguages: allLanguages?.data?.data?.map((item) => item?.name),
      }}
    >
      {children}
    </HomeBlogContext.Provider>
  );
};
