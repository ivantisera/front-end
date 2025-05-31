import { createTheme } from "@mui/material";
import "@emotion/react";
import { Theme as MuiTheme } from "@mui/material/styles";

declare module "@emotion/react" {
  interface Theme extends MuiTheme {
    palette: MuiTheme["palette"];
  }
}

declare module "@mui/material/styles" {
  interface Palette {
    custom: {
      tableHeader: string;
      tableRowHover: string;
      tableRowSelected: string;
      inputBackground: string;
      inputBorder: string;
      inputBorderFocus: string;
      inputPlaceholder: string;
      inputLabel: string;
      cardBorder: string;
      badgeBackground: string;
      iconButtonBorder: string;
      sidebarActiveBg: string;
      sidebarHoverBg: string;
      sidebarIconInactive: string;
      sidebarTextInactive: string;
      avatarNameBg: string;
      avatarNameText: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      tableHeader: string;
      tableRowHover: string;
      tableRowSelected: string;
      inputBackground?: string;
      inputBorder?: string;
      inputBorderFocus?: string;
      inputPlaceholder?: string;
      inputLabel?: string;
      cardBorder?: string;
      badgeBackground?: string;
      iconButtonBorder?: string;
      sidebarActiveBg?: string;
      sidebarHoverBg?: string;
      sidebarIconInactive?: string;
      sidebarTextInactive?: string;
      avatarNameBg?: string;
      avatarNameText?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#7c3aed",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#6366f1",
    },
    background: {
      default: "#f9fafb",
      paper: "#ffffff",
    },
    text: {
      primary: "#111827",
      secondary: "#6B7280",
    },
    divider: "#f3f3f3",
    custom: {
      tableHeader: "#FFFCF8",
      tableRowHover: "#FAFAFA",
      tableRowSelected: "#F4F1FF",
      inputBackground: "#ffffff",
      inputBorder: "#d1d5db",
      inputBorderFocus: "#7c3aed",
      inputPlaceholder: "#6B7280",
      inputLabel: "#374151",
      cardBorder: "#C4B5FD",
      badgeBackground: "#E5E5E5",
      iconButtonBorder: "#D1D1C9",
      sidebarActiveBg: "#ede9fe",
      sidebarHoverBg: "#f5f3ff",
      sidebarIconInactive: "#9ca3af",
      sidebarTextInactive: "#4b5563",
      avatarNameBg: "#f4eadc",
      avatarNameText: "#3f3d38",
    },
  },
  typography: {
    fontFamily: "var(--font-inter), Helvetica, Arial, sans-serif",
    fontSize: 14,
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
    h1: { fontSize: 28, fontWeight: 700 },
    h2: { fontSize: 22, fontWeight: 600 },
    body1: { fontSize: 14 },
    body2: { fontSize: 12 },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          paddingInline: 16,
          height: 36,
        },
      },
    },
  },
});

export default theme;
