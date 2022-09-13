import styled, { css } from "styled-components";
import token from "./token";

const { spacing, appearance, color, font, breakpoint } = token;

// Default: primary
type ColorScheme = "success" | "danger" | "info" | "black";

// Default: solid
type ButtonVariant =
  | "solid"
  | "ghost"
  | "borderless"
  | "inline"
  | "paddingless";
type Width = "s" | "m" | "l";

const setWidth = (px: string, fixed?: boolean): string => {
  return `
    width: ${fixed ? px : "100%"}; 
    ${fixed && `min-width: ${px}`}; 
    ${breakpoint.s} { width: ${px}; }
  `;
};

const widthMap = (w?: Width, fixed?: boolean): string => {
  if (w === "s") return setWidth("96px", fixed);
  if (w === "m") return setWidth("200px", fixed);
  if (w === "l") return setWidth("400px", fixed);
  return "width: 100%";
};

export interface WrapperProps {
  colorScheme?: ColorScheme;
  color?: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  width?: Width;
  fixedWidth?: boolean;
}

const getBaseColor = (props: WrapperProps): string => {
  if (props.color) {
    return props.color;
  } else if (props.colorScheme) {
    switch (props.colorScheme) {
      case "success":
        return color.green.regular;
      case "danger":
        return color.red.regular;
      case "info":
        return color.blue.regularV2;
      case "black":
        return color.black;
    }
  } else {
    return color.pink.regular;
  }
};

const GhostVariant = (props: WrapperProps) => css`
  background: ${color.white};
  border: 2px solid ${color.black}; /** Fallback incase of gradient */
  border: 2px solid ${getBaseColor(props)};
  color: ${color.black}; /** Fallback incase of gradient */
  color: ${getBaseColor(props)};
  cursor: pointer; /** Added so that directory can use without adding to directory's global styles */
  &:hover {
    opacity: 0.8;
  }
`;
const PaddinglessVariant = (props: WrapperProps) => css`
  display: block;
  background: none;
  border: 0;
  color: ${getBaseColor(props)};
  width: ${widthMap(props.width)};
  text-align: right;
  ${breakpoint.m} {
    padding: 0;
  }
`;

const BorderlessVariant = (props: WrapperProps) => css`
  background: none;
  border: 0;
  color: ${color.black}; /** Fallback incase of gradient */
  color: ${getBaseColor(props)};
`;

const InlineVariant = (props: WrapperProps) => css`
  display: inline;
  background: none;
  border: 0;
  color: ${color.black}; /** Fallback incase of gradient */
  color: ${getBaseColor(props)};
  font-size: inherit;
  font-weight: ${font.weight.regular};
  padding: 0;
  text-decoration: underline;

  ${breakpoint.m} {
    padding: 0;
  }
`;

const DisabledButtonState = css`
  opacity: 0.5;
  cursor: not-allowed;

  :hover {
    opacity: 0.5;
  }
`;

export const Wrapper = styled.button<WrapperProps>`
  color: ${color.white};
  box-sizing: border-box;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
  font-size: ${font.size.m};
  line-height: ${font.lineHeight.m};
  font-weight: ${font.weight.semi};
  padding: ${spacing.s} ${spacing.m};
  background: ${(props) => getBaseColor(props)};
  border-radius: ${appearance.borderRadius.s};
  border: ${(props) => `2px solid ${getBaseColor(props)}`};

  > :first-child {
    margin-left: 0;
  }
  > * {
    margin-left: ${spacing.s};
  }

  ${breakpoint.m} {
    padding: ${spacing.s} ${spacing.l};
  }

  ${(props) => props.variant === "ghost" && GhostVariant(props)}
  ${(props) => props.variant === "borderless" && BorderlessVariant(props)}
  ${(props) => props.variant === "inline" && InlineVariant(props)}
  ${(props) => props.variant === "paddingless" && PaddinglessVariant(props)}
  ${(props) => props.disabled && DisabledButtonState}
`;
