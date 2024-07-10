"use client";

import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated by checking the auth token
    const checkAuth = async () => {
      const response = await fetch("/api/auth-token");
      const authToken = await response.json();
      setIsAuthenticated(!!authToken);
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    // Clear the authentication token
    await fetch("/api/logout", {
      method: "POST",
    });
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
        {isAuthenticated && (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
