const styles = {
  background: "var(--grayL)",
  borderRadius: 2,
  color: "var(--color-white)",
  border: "1px solid var(--border-mainL)",
}
export const toastConfig = {
  success: {
    duration: 3000,
    style: {
      ...styles,
    },
    iconTheme: {
      primary: "var(--turquoise)",
      secondary: "var(--color-white)",
    },
  },
  loading: {
    style: {
      ...styles,
    },
    iconTheme: {
      primary: "var(--turquoise)",
      secondary: "var(--color-white)",
    },
  },
  error: {
    duration: 3000,
    style: {
      ...styles,
    },
  },
  blank: {
    duration: 3000,
    style: {
      ...styles,
    },
  },
}
