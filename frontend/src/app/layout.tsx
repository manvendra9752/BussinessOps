import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import Providers from "@/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "BusinessOps",
  description: "Business Operations Management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
