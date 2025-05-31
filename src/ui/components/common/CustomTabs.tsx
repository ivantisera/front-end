"use client";

import { Tabs, Tab, Box, Typography } from "@mui/material";
import { useState } from "react";

export type TabData = {
  label: string;
  count?: number;
  content: () => React.ReactNode;
};

interface CustomTabsProps {
  tabs: TabData[];
  defaultIndex?: number;
  onTabChange?: (index: number) => void;
}

export default function CustomTabs({
  tabs,
  defaultIndex = 0,
  onTabChange,
}: CustomTabsProps) {
  const [tabIndex, setTabIndex] = useState(defaultIndex);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    onTabChange?.(newValue);
  };

  return (
    <Box>
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons={false}
        sx={{ borderBottom: "1px solid", borderColor: "custom.inputBorder" }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={tab.label}
            label={
              <Box display="flex" alignItems="center" gap={1}>
                <Typography
                  component="span"
                  sx={{
                    fontWeight: tabIndex === index ? 600 : 400,
                    color: "text.primary",
                  }}
                >
                  {tab.label}
                </Typography>
                {tab.count !== undefined && (
                  <Box
                    sx={{
                      bgcolor: "custom.badgeBackground",
                      borderRadius: 2,
                      fontSize: "0.75rem",
                      px: 1,
                      py: "1px",
                      color: "text.primary",
                    }}
                  >
                    {tab.count}
                  </Box>
                )}
              </Box>
            }
            disableRipple
            sx={{
              minHeight: 48,
              textTransform: "none",
              px: 2,
              borderBottom:
                tabIndex === index ? "3px solid" : "3px solid transparent",
              borderColor: tabIndex === index ? "primary.main" : "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
              transition: "border-color 0.2s ease",
            }}
          />
        ))}
      </Tabs>

      <Box mt={3}>{tabs[tabIndex].content()}</Box>
    </Box>
  );
}
