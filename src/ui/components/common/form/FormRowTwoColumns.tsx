"use client";

import { Box } from "@mui/material";
import { ReactNode } from "react";

interface FormRowTwoColumnsProps {
  children: [ReactNode, ReactNode];
  gap?: number | string;
}

export default function FormRowTwoColumns({
  children,
  gap = 2,
}: FormRowTwoColumnsProps) {
  return (
    <Box display="flex" gap={gap} flexWrap="wrap">
      <Box flex={1} minWidth={250}>
        {children[0]}
      </Box>
      <Box flex={1} minWidth={250}>
        {children[1]}
      </Box>
    </Box>
  );
}
