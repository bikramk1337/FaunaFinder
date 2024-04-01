import { createTheme } from "@mui/material";

export const themeLight = createTheme({
  palette: {
    primary: {
      main: "#ffbe6f",
    },
    secondary: {
      // main: "#aba9b3",
      main: "#6f6fff",
    },
  },
  typography: {
    fontFamily: ["Roboto", "Madimi One"].join(","),
  },
});
