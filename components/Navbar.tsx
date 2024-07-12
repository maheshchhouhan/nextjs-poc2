"use client";

import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [authToken, setAuthToken] = useState(Cookies.get("auth_token"));

  useEffect(() => {
    setAuthToken(Cookies.get("auth_token"));
  }, [Cookies.get("auth_token")]);

  const handleLogout = async () => {
    // Clear the authentication token from cookies
    Cookies.remove("auth_token");

    // Redirect to the login page
    router.push("/login");
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Action Items
        </Typography>
        {authToken && (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
