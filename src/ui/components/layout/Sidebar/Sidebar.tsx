"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Box, Divider, IconButton, List, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { dashboardItem, menuGroups } from "@/constants/menu";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Box
      sx={{
        width: collapsed ? 64 : 240,
        transition: "width 0.2s ease-in-out",
        bgcolor: "background.paper",
        borderRight: "1px solid",
        borderColor: "divider",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        {!collapsed && (
          <Typography
            variant="h1"
            sx={{ fontWeight: "bold", color: "text.primary" }}
          >
            Lyfe
            <Box component="span" sx={{ color: "primary.main" }}>
              Plan
            </Box>
          </Typography>
        )}
        <IconButton onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </Box>

      {/* Dashboard */}
      <List disablePadding sx={{ px: 1 }} component="nav">
        <SidebarItem
          label={dashboardItem.label}
          icon={dashboardItem.icon}
          collapsed={collapsed}
          isActive={pathname === dashboardItem.path}
          onClick={() => router.replace(dashboardItem.path)}
        />
      </List>

      <Divider sx={{ my: 1 }} />

      {/* Menu Groups */}
      <Box flex={1} overflow="auto">
        {menuGroups.map((group) => (
          <Box key={group.title} px={1}>
            {!collapsed && (
              <Typography
                variant="caption"
                sx={{
                  ml: 1,
                  mt: 2,
                  mb: 1,
                  fontWeight: "bold",
                  color: "text.secondary",
                }}
              >
                {group.title}
              </Typography>
            )}
            <List disablePadding component="nav">
              {group.items.map(({ label, path, icon }) => (
                <SidebarItem
                  key={path}
                  label={label}
                  icon={icon}
                  collapsed={collapsed}
                  isActive={pathname === path}
                  onClick={() => router.replace(path)}
                />
              ))}
            </List>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
