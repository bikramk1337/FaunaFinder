import { PaletteColorOptions, createTheme } from "@mui/material";

const { palette } = createTheme();

declare module "@mui/material/styles" {
  interface Palette {
    brand: PaletteColorOptions;
  }
  interface PaletteOptions {
    brand: PaletteColorOptions;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    brand: true;
  }
}

export const themeLight = createTheme({
  palette: {
    primary: {
      main: "#6f6fff",
    },
    secondary: {
      main: "#aba9b3",
    },
    brand: palette.augmentColor({
      color: {
        main: "#ffbe6f",
      },
    }),
  },
  typography: {
    fontFamily: ["Roboto", "Madimi One"].join(","),
  },
});
