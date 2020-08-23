import React from "react";
import {
  NavigationContainer,
  NavigationTitle,
  NavigationImage,
  NavigationBottomBar,
} from "./NavigationItem.style";
import { Link } from "react-router-dom";
import css from "@emotion/css";

export interface INavigationItem {
  title?: string;
  image?: string;
  selected?: boolean;
  route: string;
}

const NavigationItem: React.FC<INavigationItem> = ({
  title,
  image,
  selected = false,
  route,
}) => {
  return (
    <Link
      to={route}
      css={css`
        text-decoration: none;
      `}
    >
      <NavigationContainer>
        {title && (
          <NavigationTitle selected={selected}>{title}</NavigationTitle>
        )}
        {image && <NavigationImage src={image} />}
        {selected && <NavigationBottomBar />}
      </NavigationContainer>
    </Link>
  );
};

export default NavigationItem;
