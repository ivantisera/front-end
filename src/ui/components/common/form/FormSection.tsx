import { Box, Typography } from "@mui/material";

interface FormSectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function FormSection({
  title,
  subtitle,
  children,
}: FormSectionProps) {
  return (
    <Box
      component="section"
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        pb: 5,
        mb: 5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        <Box sx={{ flex: 1, minWidth: 200 }}>
          <Typography
            variant="h6"
            component="h2"
            fontWeight={600}
            color="text.primary"
            sx={{ mt: 1 }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>

        <Box
          sx={{
            flex: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
