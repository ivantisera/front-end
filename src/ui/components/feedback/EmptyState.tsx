"use client";

import { Box, Button, Typography } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;

  primaryAction?: {
    label: string;
    onClick: () => void;
    variant?: "contained" | "outlined" | "text";
    color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  };

  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({
  title,
  description = "There is currently no data to display.",
  icon = <InboxIcon sx={{ fontSize: 64, color: "grey.600" }} />,
  primaryAction,
  secondaryAction,
}: EmptyStateProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      textAlign="center"
      px={3}
      py={5}
    >
      {icon}

      <Typography
        component="h1"
        variant="h4"
        fontWeight={600}
        color="text.primary"
        sx={{ mt: 2 }}
      >
        {title}
      </Typography>

      {description && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mt: 1, maxWidth: 360 }}
        >
          {description}
        </Typography>
      )}

      {(primaryAction || secondaryAction) && (
        <Box
          display="flex"
          gap={2}
          mt={4}
          flexWrap="wrap"
          justifyContent="center"
        >
          {primaryAction && (
            <Button
              variant={primaryAction.variant ?? "contained"}
              color={primaryAction.color ?? "primary"}
              onClick={primaryAction.onClick}
            >
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button variant="text" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
}
