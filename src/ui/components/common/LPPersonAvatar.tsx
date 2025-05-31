"use client";

import { Avatar, Box, Typography } from "@mui/material";
import { FC } from "react";

type LPPersonAvatarProps = {
  gid: string;
  firstName?: string;
  lastName?: string;
  initials?: string;
  imageUrl?: string;
  showName?: boolean;
  size?: number; // px
};

const gradients = [
  "linear-gradient(135deg, #6366F1, #8B5CF6)",
  "linear-gradient(135deg, #EC4899, #F472B6)",
  "linear-gradient(135deg, #F59E0B, #FBBF24)",
  "linear-gradient(135deg, #10B981, #34D399)",
  "linear-gradient(135deg, #3B82F6, #60A5FA)",
];

function getGradient(gid: string) {
  const hash = gid.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return gradients[hash % gradients.length];
}

const LPPersonAvatar: FC<LPPersonAvatarProps> = ({
  gid,
  firstName,
  lastName,
  initials,
  imageUrl,
  showName = false,
  size = 30,
}) => {
  const fallbackInitials = initials?.substring(0, 2).toUpperCase();
  const showImage = !!imageUrl;

  const avatar = (
    <Avatar
      src={showImage ? imageUrl : undefined}
      sx={(theme) => ({
        width: size,
        height: size,
        fontSize: size * 0.48,
        fontWeight: 600,
        color: theme.palette.common.white,
        background: showImage ? undefined : getGradient(gid),
        backgroundImage: showImage ? undefined : getGradient(gid),
        backgroundSize: "cover",
        backgroundPosition: "center",
      })}
    >
      {!showImage && fallbackInitials}
    </Avatar>
  );

  if (!showName) return avatar;

  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        alignItems: "center",
        gap: 0.7,
        backgroundColor: theme.palette.custom.avatarNameBg,
        paddingRight: 1,
        py: 0.5,
        borderRadius: "9999px",
        height: size * 0.8,
      })}
    >
      {avatar}
      <Typography
        variant="body2"
        fontWeight={500}
        sx={(theme) => ({
          color: theme.palette.custom.avatarNameText,
          whiteSpace: "nowrap",
        })}
      >
        {firstName} {lastName}
      </Typography>
    </Box>
  );
};

export default LPPersonAvatar;
