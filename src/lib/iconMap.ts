import * as MuiIcons from "@mui/icons-material";

export const IconMap: Record<string, React.ElementType> = new Proxy(
  {},
  {
    get: (_, iconName: string) => {
      return (
        MuiIcons[iconName as keyof typeof MuiIcons] || MuiIcons.HelpOutline
      );
    },
  }
);
