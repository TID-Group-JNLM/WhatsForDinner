import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2E7D32",
      light: "#E8F5E9",
      dark: "#1B5E20",
    },
    secondary: {
      main: "#FFC23D",
      light: "#FFF1CC",
    },
    background: {
      default: "#FFFBF5",
    },
    warning: {
      main: "#ED6C02",
      contrastText: "#212121",
    },
  },
  typography: {
    fontFamily: '"Nunito", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    button: { textTransform: "none" },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { minHeight: 48 },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: { minWidth: 48, minHeight: 48 },
      },
    },
  },
});

export default theme;
