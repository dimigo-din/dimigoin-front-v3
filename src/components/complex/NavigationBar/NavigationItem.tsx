import React from "react";
import { NavigationTitle, BottomBar } from "./NavigationItem.style";
import css from "@emotion/css";
import { UnstyledLink } from "../../basic/Atomics";

export interface INavigationItem {
  title?: string;
  image?: string;
  selected?: boolean;
  route: string;

}

const NavigationItem: React.FC<INavigationItem & {
  onLinkClicked(offset: number): void;
}> = ({
  title,
  selected = false,
  route,
  onLinkClicked
}) => {
    return (
      <UnstyledLink
        to={route}
        onClick={(e) => {
          const target = (e.target as HTMLAnchorElement)
          onLinkClicked(target.offsetLeft - 89)
        }}
        css={css`
        display: inline-block;    
        margin-left: 32px;
        line-height: 90px;
        height: 90px;
        overflow: hidden;
        flex-basis: 1;
        flex-shrink: 0;
      `}
      >
        <NavigationTitle selected={selected}>{title}
          {selected && <BottomBar />}
        </NavigationTitle>
      </UnstyledLink>
    );
  };

export default NavigationItem;
