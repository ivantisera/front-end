import { ReactNode } from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import ThemeRegistry from "@/ui/components/layout/ThemeRegistry";
import QueryProvider from "@/ui/providers/QueryProvider";
import LayoutWrapper from "@/ui/components/LayoutWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <ThemeRegistry>
          <QueryProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
          </QueryProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
