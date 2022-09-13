const token = {
  color: {
    blue: {
      lighter: "#E3F4FF",
      light: "#BBE2FF",
      regular: "#007BFF",
      regularV2: "#056FFA",
      dark: "#1269EC",
      darker: "#1F47CD",
    },
    pink: {
      lighter: "#FBE3EC",
      light: "#F5B8D1",
      regular: "#E62E7B",
      dark: "#BC005B",
      darker: "#82004E",
    },
    orange: {
      lighter: "#FFF8EF",
      light: "#FFECCA",
      regular: "#FFC35A",
      dark: "#FF9B45",
      darker: "#FF733D",
    },
    red: {
      lighter: "#FFEBED",
      light: "#FFCDD0",
      regular: "#F0564A",
      dark: "#D43328",
      darker: "#B82114",
    },
    grey: {
      lighter10: "#FCFCFC",
      lighter20: "#F7F7F7",
      lighter30: "#F2F2F2",
      lighter40: "#ECECEC",
      regular: "#CACACA",
      darker60: "#ADADAD",
      darker70: "#838383",
      darker80: "#6E6E6E",
      darker90: "#4E4E4E",
      darker100: "#2C2C2C",
    },
    green: {
      lighter: "#E2FBEE",
      light: "#B8F4D4",
      regular: "#00C460",
      dark: "#00B152",
      darker: "#007D30",
    },
    white: "#ffffff",
    black: "#2C2C2C",
  },
  breakpoint: {
    s: "@media (min-width: 640px)",
    m: "@media (min-width: 768px)",
    l: "@media (min-width: 1024px)",
    xl: "@media (min-width: 1280px)",
  },
  font: {
    family: "LibreFranklin",
    icon: "Font Awesome 5 Pro",
    size: {
      xs: "0.75rem", // 12px
      s: "0.875rem", // 14px
      m: "1rem", // 16px
      l: "1.25rem", // 20px
      xl: "1.5rem", //24px
      xxl: "2.25rem", //36px
      xxxl: "3rem", //48px
      field: "16px", // prevent iOS mobile autozoom
    },
    weight: {
      bold: 700,
      semi: 600,
      regular: 400,
    },
    lineHeight: {
      xs: 1.2,
      s: 1.3,
      m: 1.5,
      l: 1.7,
    },
  },
  shadow: {
    xs: "0 1px 3px 0 rgba(0,0,0,.1), 0 1px 2px 0 rgba(0,0,0,.06)",
    s: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
    m: "0 2px 4px 0 rgba(0,0,0,.26)",
    l: "0 4px 8px 0 rgba(0,0,0,.40)",
  },
  appearance: {
    borderRadius: {
      s: "0.25rem",
      m: "0.5rem",
      l: "2rem",
    },
    focus: `
    outline: none;
    box-shadow: 0 0 0 4px #BBE2FF;
      `,
  },
  opacity: {
    opaque: "1",
    hollow: "0.7",
  },
  spacing: {
    xxxs: "1px",
    xxs: "2px",
    xs: "4px",
    s: "8px",
    m: "16px",
    l: "24px",
    xl: "32px",
    xxl: "40px",
    xxxl: "48px",
    xxxxl: "64px",
    xxxxxl: "80px",
    xxxxxxl: "96px",
    hero: "120px",
  },
  maxContent: "730px",
  scroll: {
    offset: 0,
    smooth: true,
    duration: 500,
  },
};

export default token;
