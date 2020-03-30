// default theme preset

export const presetBase = {
  buttons: {
    outline: {
      bg: 'transparent',
      boxShadow: 'inset 0 0 2px',
      color: 'primary',
      variant: 'buttons.primary',
    },
    primary: {
      bg: 'primary',
      borderRadius: 'default',
      color: 'background',
      fontSize: 2,
      fontWeight: 'bold',
    },
    secondary: {
      bg: 'secondary',
      color: 'background',
      variant: 'buttons.primary',
    },
  },
  colors: {
    background: '#fff',
    gray: '#dddddf',
    highlight: 'hsla(205, 100%, 40%, 0.125)',
    muted: '#f6f6f9',
    primary: '#07c',
    secondary: '#30c',
    text: '#000',
  },
  fontSizes: [
    12, 14, 16, 20, 24, 32, 48, 64, 96
  ],
  fontWeights: {
    body: 400,
    bold: 700,
    heading: 700,
  },
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  radii: {
    circle: 99999,
    default: 4,
  },
  shadows: {
    card: '0 0 4px rgba(0, 0, 0, .125)',
  },
  sizes: {
    avatar: 48,
  },
  // rebass variants
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  styles: {
    root: {
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
    },
  },
  text: {
    caps: {
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    },
    display: {
      fontFamily: 'heading',
      fontSize: [ 5, 6, 7 ],
      fontWeight: 'heading',
      lineHeight: 'heading',
    },
    heading: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
    },
  },
  variants: {
    avatar: {
      borderRadius: 'circle',
      height: 'avatar',
      width: 'avatar',
    },
    card: {
      bg: 'background',
      boxShadow: 'card',
      p: 2,
    },
    link: {
      color: 'primary',
    },
    nav: {
      ':hover,:focus,.active': {
        color: 'primary',
      },
      color: 'inherit',
      display: 'inline-block',
      fontSize: 1,
      fontWeight: 'bold',
      p: 2,
      textDecoration: 'none'
    },
  },
}