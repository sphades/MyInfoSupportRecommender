import { cl } from "./color";

export const radius = {
  s: "0.25rem",
  m: "0.5rem",
  l: "2rem",
};

/**
 * Note: We will only be using the following:
 * m: To determine when to switch between mobile / desktop components
 * maxContent: Maximum container size that we support
 */
export const breakpoint = {
  s: "@media (min-width: 576px)",
  m: "@media (min-width: 768px)",
  l: "@media (min-width: 992px)",
  xl: "@media (min-width: 1200px)",
  maxContent: "1140px",
};

export const containerSize = {
  s: "540px",
  m: "720px",
  l: "960px",
  xl: "1140px",
};

export const focusShadow = `0 0 0 4px ${cl.blue.light}`;

export const shadow = {
  xs: "0 1px 3px 0 rgba(0, 0, 0, 0.10)", // category cards in Figma
  s: " 0 1px 3px 0 rgba(0, 0, 0, 0.12)", // banner buttons in Figma
  m: " 0 2px 4px 0 rgba(0, 0, 0, 0.26)", // mobile screens in Figma
  l: " 0 3px 5px 0 rgba(0, 0, 0, 0.40)", // extrapolation
};

export const scroll = {
  offset: 0,
  smooth: true,
  duration: 500,
};

export const icon = {
  size: {
    xs: "16px",
    s: "24px", // icon pill circle
    m: "32px", // base mobile-circle, chevron-square
    l: "40px", // base mobile-square
    xl: "48px", // base desktop-square, large mobile
    xxl: "72px", // large desktop
  },
};

export const font = {
  size: {
    xs: "0.75rem", // 12px
    s: "0.875rem", // 14px
    m: "1rem", // 16px
    l: "1.25rem", // 20px
    xl: "1.5rem", //24px
    xxl: "2.25rem", //36px
    xxxl: "3rem", //48px
    xxxxl: "4rem", //64px
    /** Top are application sizes to be deprecated (to many xxxxxl sizes) */
    _0_75: "0.75rem", //12px
    _0_875: "0.875rem", //14px
    _1: "1rem", //16px
    _1_125: "1.125rem", //18px
    _1_25: "1.25rem", //20px
    _1_375: "1.375rem", //22px
    _1_5: "1.5rem", //24px
    _1_75: "1.75rem", // 28px
    _2: "2rem", //32px
    _2_5: "2.5rem", //40px
    _3_25: "3.25rem", //52px
  },
  weight: {
    bold: 700,
    semi: 600,
    regular: 400,
    light: 300,
  },
  lineHeight: {
    xxs: 1.25,
    xs: 1.3,
    s: 1.4,
    m: 1.5,
    l: 1.7,
  },
  family: "LibreFranklin",
};

export const sp = {
  _1: "1px",
  _2: "2px",
  _4: "4px",
  _8: "8px",
  _12: "12px",
  _14: "14px",
  _16: "16px",
  _20: "20px",
  _24: "24px",
  _28: "28px",
  _32: "32px",
  _40: "40px",
  _48: "48px",
  _56: "56px",
  _64: "64px",
  _80: "80px",
  _96: "96px",
};
