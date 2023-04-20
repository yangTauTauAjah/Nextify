export const tokens = {
  grey: {
    100: "#f0f0f3",
    200: "#e1e2e7",
    300: "#d1d3da",
    400: "#c2c5ce",
    500: "#b3b6c2",
    600: "#8f929b",
    700: "#6b6d74",
    800: "#48494e",
    900: "#242427",
  },
  blue: {
    100: "#d3ddff",
    200: "#a7baff",
    300: "#7c98ff",
    400: "#5075ff",
    500: "#2453ff",
    600: "#1d42cc",
    700: "#163299",
    800: "#0e2166",
    900: "#071133"
  },
  red: {
    100: "#ffd6d3",
    200: "#ffaca6",
    300: "#fe837a",
    400: "#fe594d",
    500: "#fe3021",
    600: "#cb261a",
    700: "#981d14",
    800: "#66130d",
    900: "#330a07"
  },
  green: {
    100: "#d2ffe5",
    200: "#a4ffcb",
    300: "#77ffb2",
    400: "#49ff98",
    500: "#1cff7e",
    600: "#16cc65",
    700: "#11994c",
    800: "#0b6632",
    900: "#063319"
  },
  yellow: {
    // yellow
    100: "#fcf0dd",
    200: "#fae1bb",
    300: "#f7d299",
    400: "#f5c377",
    500: "#f2b455",
    600: "#c29044",
    700: "#916c33",
    800: "#614822",
    900: "#302411",
  },
  cyan: {
    100: "#d1fffa",
    200: "#a3fff6",
    300: "#75fff1",
    400: "#47ffed",
    500: "#19ffe8",
    600: "#14ccba",
    700: "#0f998b",
    800: "#0a665d",
    900: "#05332e"
  },
  tertiary: {
    // purple
    500: "#8884d8",
  },
  background: {
    light: "#2d2d34",
    main: "#7d4141",
  },
};

// mui theme settings
export const themeSettings = {
  palette: {
    primary: {
      ...tokens.blue,
      main: tokens.blue[500],
      light: tokens.blue[400],
    },
    secondary: {
      ...tokens.green,
      main: tokens.green[500],
      light: tokens.green[400],
    },
    tertiary: {
      ...tokens.yellow,
      main: tokens.yellow[500],
      light: tokens.yellow[400],
    },
    red: {
      ...tokens.red,
      main: tokens.red[500],
      light: tokens.red[400],
    },
    cyan: {
      ...tokens.cyan,
      main: tokens.cyan[500],
      light: tokens.cyan[400],
    },
    grey: {
      ...tokens.grey,
      main: tokens.grey[500],
      light: tokens.grey[400],
    },
    background: {
      default: tokens.background.main,
    },
  }
};