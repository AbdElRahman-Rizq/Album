// hoc/WithAuth.js
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useEffect } from "react";

export default function withAuth(WrappedComponent, { redirectPath = "/login" } = {}) {
  return function ProtectedRoute(props) {
    const router = useRouter();

    useEffect(() => {
      const token = Cookies.get("album-token");
      if (!token) {
        router.push(redirectPath);
      }
    }, [router, redirectPath]);

    return <WrappedComponent {...props} />;
  };
}
