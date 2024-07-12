"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { CircularProgress, Container } from "@mui/material";

export default function ClientRedirect({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authToken = Cookies.get("auth_token");
    const pathname = window.location.pathname;

    if (pathname === "/" || pathname.startsWith("/login")) {
      if (authToken) {
        router.push("/actionItems");
      } else {
        router.push("/login");
      }
    } else if (pathname.startsWith("/actionItems")) {
      if (!authToken) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  return <>{children}</>;
}
