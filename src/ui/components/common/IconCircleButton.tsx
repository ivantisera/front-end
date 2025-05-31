"use client";

import { Badge, Box, IconButton, SxProps, Theme } from "@mui/material";
import React from "react";
import * as Icons from "@mui/icons-material";

interface IconCircleButtonProps {
  icon: keyof typeof Icons;
  onClick?: () => void;
  bgColor?: string;
  borderColor?: string;
  iconColor?: string;
  ariaLabel?: string;
  sx?: SxProps<Theme>;
  showBadge?: boolean;
  badgeColor?: "default" | "primary" | "secondary" | "error";
}

export default function IconCircleButton({
  icon,
  onClick,
  bgColor = "transparent",
  borderColor = "custom.iconButtonBorder",
  iconColor = "text.primary",
  ariaLabel = "",
  sx = {},
  showBadge = false,
  badgeColor = "error",
}: IconCircleButtonProps) {
  const Icon = Icons[icon] || Icons.HelpOutline;

  const button = (
    <Box
      component={IconButton}
      onClick={onClick}
      aria-label={ariaLabel}
      sx={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        backgroundColor: bgColor,
        border: `1px solid ${borderColor}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 0,
        ...sx,
      }}
    >
      <Icon sx={{ fontSize: 20, color: iconColor }} />
    </Box>
  );

  return showBadge ? (
    <Badge variant="dot" color={badgeColor} overlap="circular">
      {button}
    </Badge>
  ) : (
    button
  );
}
