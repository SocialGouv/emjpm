const theme = {
  useColorSchemeMediaQuery: false,
  useRootStyles: true,
  breakpoints: ["40em", "52em", "64em"],
  buttons: {
    outline: {
      bg: "transparent",
      border: "1px solid rgba(0, 107, 230, .43)",
      borderRadius: "default",
      color: "primary",
      fontSize: 2,
      fontWeight: "bold",
    },
    primary: {
      bg: "primary",
      borderRadius: "default",
      color: "background",
      fontSize: 2,
      fontWeight: "bold",
    },
    secondary: {
      bg: "secondary",
      borderRadius: "default",
      color: "background",
      fontSize: 2,
      fontWeight: "bold",
    },
  },
  colors: {
    background: "#F2F5F9",
    black: "#373737",
    border: "#707070",
    cardPrimary: "#FFFFFF",
    cardSecondary: "#fefeff",
    error: "#df1400",
    gray: "#707074",
    lightGray: "#555555",
    link: "#0072ca",
    mediumGray: "#767676",
    muted: "#f6f6f9",
    primary: "#0072ca",
    secondary: "#30c",
    success: "#2d7600",
    text: "#404040",
    textSecondary: "#767676",
    textTertiary: "#555555",
    titleSecondary: "#595959",
    warning: "#ab6600",
    whiteGray: "#EBEFF5",
    yellow: "#946800",
    red: "#df1400",
  },
  fontSizes: [12, 14, 16, 18, 22, 26, 30, 40, 46, 54],
  fontWeights: {
    body: 400,
    bold: 700,
    heading: 700,
    semibold: 600,
  },
  fonts: {
    body: '"Open Sans", sans-serif',
    heading: "Quicksand",
    monospace: '"Input Mono", monospace',
  },
  input: {
    backgroundColor: "#FFFFFF",
    border: "1px solid #D4D4D4",
    color: "#595959",
    fontWeight: "bold",
    textAlign: "center",
  },
  label: {
    color: "#555555",
    fontSize: "13px",
    fontWeight: "bold",
    width: "auto",
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  radii: {
    circle: 99999,
    default: 5,
  },
  shadows: {
    card: "0 1px 1px rgba(33, 82, 139, .16)",
    pop: "0 1px 1px rgba(33, 82, 139, .16), 0 1px 6px rgba(33, 82, 139, .16)",
  },
  // rebass variants
  sizes: {
    avatar: 48,
  },
  space: [0, 10, 12, 20, 24, 32, 42, 72],
  styles: {
    root: {
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
    },
  },
  text: {
    caps: {
      letterSpacing: "0.1em",
      textTransform: "uppercase",
    },
    display: {
      fontFamily: "heading",
      fontSize: [5, 6, 7],
      fontWeight: "heading",
      lineHeight: "heading",
    },
    heading: {
      fontFamily: "heading",
      fontWeight: "heading",
      lineHeight: "heading",
    },
    headingSecondary: {
      color: "black",
      variant: "text.heading",
    },
    secondary: {
      color: "textSecondary",
      fontSize: [3],
    },
  },
  variants: {
    avatar: {
      borderRadius: "circle",
      height: "avatar",
      width: "avatar",
    },
    bgDark: {
      bg: "black",
    },
    bgLight: {
      bg: "cardPrimary",
    },
    bgPrimary: {
      bg: "primary",
    },
    card: {
      bg: "cardPrimary",
      borderRadius: "default",
      boxShadow: "card",
      p: 2,
    },
    input_small: {
      padding: "inherit",
      width: "50px",
    },
    link: {
      color: "primary",
    },
    nav: {
      ":hover,:focus,.active": {
        color: "primary",
      },
      color: "inherit",
      display: "inline-block",
      fontSize: 1,
      fontWeight: "bold",
      p: 2,
      textDecoration: "none",
    },
    popCard: {
      bg: "cardPrimary",
      borderRadius: "default",
      boxShadow: "pop",
      p: 2,
    },
    sideCard: {
      bg: "cardSecondary",
      borderRadius: "default",
      boxShadow: "card",
      p: 2,
    },
  },
};

export default theme;
