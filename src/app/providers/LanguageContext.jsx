"use client";
import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const LanguageContext = createContext();

// Custom hook for accessing the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

// LanguageProvider component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en"); // Default to 'en'

  useEffect(() => {
    // Ensure this only runs on the client side
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    // Update localStorage whenever language changes
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
