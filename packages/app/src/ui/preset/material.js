export const presetMaterial = {
  buttons: {
    outline: {
      bg: "transparent",
      boxShadow: "inset 0 0 2px",
      color: "primary",
      variant: "buttons.primary",
    },
    primary: {
      bg: "primary",
      borderRadius: "default",
      color: "background",
      fontSize: 2,
      fontWeight: "body",
      variant: "text.caps",
    },
    secondary: {
      bg: "secondary",
      color: "background",
      variant: "buttons.primary",
    },
  },
  colors: {
    background: "#fff",
    gray: "#555",
    muted: "#f6f6f6",
    primary: "#6200ee",
    secondary: "#03dac6",
    text: "#000",
  },
  fontSizes: [10, 12, 14, 16, 20, 24, 34, 48, 60, 96],
  fontWeights: {
    body: 400,
    bold: 700,
    heading: 400,
  },
  fonts: {
    body: "Roboto, sans-serif",
    heading: "inherit",
    monospace: '"Roboto Mono", monospace',
  },
  googleFonts:
    "https://fonts.googleapis.com/css?family=Roboto+Mono|Roboto:400,700&display=swap",
  lineHeights: {
    body: 1.5,
    heading: 1.2,
  },
  radii: {
    circle: 99999,
    default: 4,
  },
  shadows: {
    // source: https://medium.com/@Florian/freebie-google-material-design-shadow-helper-2a0501295a2d
    1: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    2: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
    3: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
    4: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
    5: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
  },
  sizes: {
    avatar: 48,
    icon: 24,
  },
  // rebass variants
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
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
      fontSize: [6, 7],
      fontWeight: "heading",
      lineHeight: "heading",
    },
    heading: {
      fontFamily: "heading",
      fontWeight: "heading",
      lineHeight: "heading",
    },
  },
  variants: {
    avatar: {
      borderRadius: "circle",
      height: "avatar",
      width: "avatar",
    },
    card: {
      bg: "background",
      boxShadow: 2,
      p: 2,
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
      variant: "text.caps",
    },
  },
};
