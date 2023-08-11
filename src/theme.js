import { createTheme } from "@mui/material";

export const myTheme = createTheme({
  palette: {
    primary: {
      light: "#FEFBEA",
      main: "#FFCA00",
      dark: "#111111",
      contrastText: "#E3E3E3",
    },
    secondary: {
      light: "#FEFBEA",
      main: "#FFCA00",
      dark: "#111111",
      contrastText: "#7A7A7A",
    },
  },
  typography: {
    fontFamily: "Lato, Arial",
    fontSize: 12,
    h1: {
      fontFamily: "Lato, Arial",
      fontSize: 30,
      fontWeight: 700,
    },
    h2: {
      fontFamily: "Lato, Arial",
      fontSize: 20,
      fontWeight: 700,
      paddingBottom: 20,
    },
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: "transparent",
      },
    },
  },
});

export default createTheme(myTheme);
