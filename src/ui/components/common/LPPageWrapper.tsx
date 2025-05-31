"use client";

import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import IconCircleButton from "./IconCircleButton";
import SearchIcon from "@mui/icons-material/Search";
import LPLoader from "../feedback/LPLoader";
import GenericErrorMessage from "../feedback/GenericErrorMessage";

interface LPPageBaseProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showGeneralHeader?: boolean;
  showBack?: boolean;
  onBack?: () => void;
  actionButton?: {
    label: string;
    onClick: () => void;
    variant?: "text" | "outlined" | "contained";
    color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  };
  loading?: boolean;
  error?: string | React.ReactNode;
  withHorizontalPadding?: boolean;
}

export default function LPPageBase({
  children,
  title,
  subtitle,
  showGeneralHeader = false,
  showBack = false,
  onBack,
  actionButton,
  loading = false,
  error,
  withHorizontalPadding = false,
}: LPPageBaseProps) {
  if (loading) return <LPLoader />;
  if (error) {
    if (typeof error === "string") {
      return <GenericErrorMessage error={error} />;
    } else return error;
  }
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={3}
      sx={{
        ...(withHorizontalPadding && {
          maxWidth: 960,
          mx: "auto",
          padding: 3,
          bgcolor: "background.paper",
        }),
      }}
    >
      {showGeneralHeader && (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <TextField
            placeholder="Search all family information..."
            variant="outlined"
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{ color: "custom.inputPlaceholder", fontSize: 20 }}
                  />
                </InputAdornment>
              ),
              sx: {
                borderRadius: 2,
                bgcolor: "background.paper",
              },
            }}
            sx={{
              maxWidth: 400,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                fontSize: "1rem",
                height: 40,
              },
              "& input::placeholder": {
                color: "common.white",
              },
            }}
          />

          <Box display="flex" alignItems="center" gap={1.5} ml={3}>
            <IconCircleButton
              icon="Notifications"
              onClick={() => console.log("Notifications")}
              ariaLabel="See notifications"
              showBadge
              badgeColor="error"
              bgColor="background.paper"
              borderColor="custom.iconButtonBorder"
              iconColor="text.primary"
            />

            <IconCircleButton
              icon="HelpOutline"
              onClick={() => console.log("Help")}
              ariaLabel="Help"
              bgColor="background.paper"
              borderColor="custom.iconButtonBorder"
              iconColor="text.primary"
            />

            <IconCircleButton
              icon="Person"
              onClick={() => console.log("Profile")}
              ariaLabel="User Profile"
              bgColor="custom.badgeBackground"
              borderColor="transparent"
              iconColor="text.secondary"
            />
          </Box>
        </Box>
      )}
      {(title || showBack || actionButton) && (
        <Box
          component="header"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" alignItems="center" gap={1}>
            {showBack && (
              <IconButton onClick={onBack} aria-label="Volver">
                <ArrowBackIcon />
              </IconButton>
            )}
            {title && (
              <Typography
                component="h1"
                fontSize="2rem"
                fontWeight={600}
                color="text.primary"
              >
                {title}
              </Typography>
            )}
          </Box>

          {actionButton && (
            <Button
              variant={actionButton.variant || "contained"}
              color={actionButton.color || "primary"}
              onClick={actionButton.onClick}
            >
              {actionButton.label}
            </Button>
          )}
        </Box>
      )}
      {subtitle && (
        <Box>
          <Typography
            component="p"
            fontSize="0.8rem"
            fontWeight={600}
            color="text.secondary"
          >
            {subtitle}
          </Typography>{" "}
        </Box>
      )}
      <Box component="section">{children}</Box>
    </Box>
  );
}
