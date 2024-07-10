import type { Metadata } from "next";
import "./globals.css";
import { Box, CssBaseline, Container } from "@mui/material";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Action Items - NextJS POC",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CssBaseline />
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Navbar />
          </Box>
          {children}
        </Container>
      </body>
    </html>
  );
}
