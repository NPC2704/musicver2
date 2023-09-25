import { createTheme } from "@mui/material"

export const theme_ = createTheme({
  typography: {
    fontFamily: "Nunito Sans, sans-serif",
  },
  palette: {
    primary: {
      main: "#43bcff",
    },
    background: {
      default: "var(--grayL)",
      paper: "var(--grayL2)",
    },
    text: {
      secondary: "var(--color-white)",
    },
  },
  components: {
    // MuiBackdrop: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: "#000000c4",
    //     },
    //   },
    // },
    MuiMenu: {},
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: "var(--color-white)",
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        root: {
          backgroundColor: "#000000c4",
        },
        paper: {
          color: "var(--color-white)",
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "var(--whiteT1)",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {},
        input: {
          color: "var(--color-white)",
        },
      },
    },

    MuiInput: {
      styleOverrides: {
        root: {
          "&::placeholder": {
            color: "var(--whiteT1)",
          },
          "&::before": {
            borderBottom: "1px solid var(--border-mainL)",
          },

          "&:hover:not(.Mui-disabled, .Mui-error):before": {
            borderBottom: "1px solid var(--border-mainL)",
          },
        },
      },
    },
  },
})
