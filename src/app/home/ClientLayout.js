// src/app/home/ClientLayout.js
"use client";

import Footer from "@/components/Footer";
import Header from "@/components/header";
import { usePathname } from "next/navigation";


export default function ClientLayout({ token, currentUser, children }) {
  const pathname = usePathname();
  const hideHeaderFooter = ["/login", "/signup", "/forgot-password", "/admin"].includes(pathname);

  return (
    <>
      {!hideHeaderFooter && <Header token={token} currentUser={currentUser} />}
      {children}
      {!hideHeaderFooter && <Footer isLoggedIn={!!token} userType={currentUser || "user"} />}
    </>
  );
}
