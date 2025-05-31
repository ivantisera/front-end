"use client";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";

type SidebarItemProps = {
  label: string;
  icon: React.ElementType;
  isActive: boolean;
  collapsed: boolean;
  onClick: () => void;
};

const SidebarItem = React.memo(function SidebarItem({
  label,
  icon: Icon,
  isActive,
  collapsed,
  onClick,
}: SidebarItemProps) {
  return (
    <ListItem disablePadding component="li">
      <ListItemButton
        onClick={onClick}
        selected={isActive}
        sx={{
          borderRadius: 1,
          marginBottom: 0.5,
          mx: 1,
          pl: collapsed ? 0 : 2,
          pr: collapsed ? 0 : 2,
          justifyContent: collapsed ? "center" : "flex-start",
          backgroundColor: (theme) =>
            isActive ? theme.palette.custom.sidebarActiveBg : "transparent",
          color: (theme) =>
            isActive
              ? theme.palette.primary.main
              : theme.palette.custom.sidebarTextInactive,
          "&:hover": {
            backgroundColor: (theme) => theme.palette.custom.sidebarHoverBg,
          },
        }}
      >
        <ListItemIcon
          sx={{
            color: (theme) =>
              isActive
                ? theme.palette.primary.main
                : theme.palette.custom.sidebarIconInactive,
            minWidth: 0,
            mr: collapsed ? 0 : 1.5,
            justifyContent: "center",
          }}
        >
          <Icon fontSize="small" />
        </ListItemIcon>
        {!collapsed && (
          <ListItemText
            primary={label}
            primaryTypographyProps={{ fontSize: 14 }}
          />
        )}
      </ListItemButton>
    </ListItem>
  );
});

export default SidebarItem;
