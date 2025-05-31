import { Box, CircularProgress } from "@mui/material";

export default function LPLoader() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="200px"
      width="100%"
    >
      <CircularProgress color="primary" />
    </Box>
  );
}
