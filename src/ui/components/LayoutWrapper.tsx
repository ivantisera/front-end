"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import Sidebar from "./layout/Sidebar/Sidebar";
import { routesFullScreen } from "@/constants/routesFullScreen";
import { useTheme } from "@mui/material";

function shouldHideSidebar(pathname: string): boolean {
  return routesFullScreen.some((rule) =>
    typeof rule === "string" ? pathname === rule : rule.test(pathname)
  );
}

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideSidebar = shouldHideSidebar(pathname);
  const theme = useTheme();

  if (hideSidebar) {
    return (
      <main
        style={{
          minHeight: "100vh",
          backgroundColor: theme.palette.background.default,
        }}
      >
        {children}
      </main>
    );
  }

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main
        style={{
          flexGrow: 1,
          padding: 24,
          minHeight: "100vh",
          backgroundColor: theme.palette.background.default,
        }}
      >
        {children}
      </main>
    </div>
  );
}
