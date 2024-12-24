// hoc/WithAuth.js
"use client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect } from "react";

export default function withAuth(WrappedComponent, redirectPath = "/login") {
  return function ProtectedRoute(props) {
    const router = useRouter();

    useEffect(() => {
      const token = Cookies.get("album-token");
      if (!token) {
        router.push(redirectPath);
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
}
