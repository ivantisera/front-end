import { Box, Typography } from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";

type ComingSoonProps = {
  title: string;
};

export default function ComingSoon({ title }: ComingSoonProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      textAlign="center"
    >
      <ConstructionIcon sx={{ fontSize: 64, color: "warning.main" }} />
      <Typography variant="h1" sx={{ mt: 2 }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ mt: 1, color: "text.secondary" }}>
        This section is under construction. Stay tuned for updates!
      </Typography>
    </Box>
  );
}
