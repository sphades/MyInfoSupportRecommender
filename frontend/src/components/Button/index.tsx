import { ReactNode, MouseEventHandler } from "react";
import { Link as ReactLink } from "react-router-dom";
import { Wrapper, WrapperProps } from "./styles";
import { CSSProperties } from "react";
import React from "react";

interface BaseProps extends WrapperProps {
  id?: string;
  children: ReactNode;
  innerText?: string; // needed for screen reader to read non-text button labels
  style?: CSSProperties;
}

export interface ButtonProps extends BaseProps {
  onClick: MouseEventHandler;
}

interface LinkProps extends BaseProps {
  href?: string;
  target?: string;
  rel?: string;
}

interface RouterProps extends BaseProps {
  to: string;
}

type Props = ButtonProps | LinkProps | RouterProps;

const Clickable = (props: Props): JSX.Element => {
  let Element: any = "button";
  if ((props as LinkProps).href) Element = "a";
  if ((props as RouterProps).to) Element = ReactLink;

  const { colorScheme } = props;

  return (
    <Wrapper {...props} as={Element} colorScheme={colorScheme}>
      {props.innerText && (
        <span className="visually-hidden">{props.innerText}</span>
      )}
      {props.children}
    </Wrapper>
  );
};

export const Button = (props: ButtonProps): JSX.Element => (
  <Clickable {...props} />
);
export const Link = (props: LinkProps): JSX.Element => <Clickable {...props} />;
export const RouterLink = (props: RouterProps): JSX.Element => (
  <Clickable {...props} />
);
