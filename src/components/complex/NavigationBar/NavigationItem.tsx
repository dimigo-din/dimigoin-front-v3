import React from 'react';
import { NavigationTitle, BottomBar } from './NavigationItem.style';
import css from '@emotion/css';
import { UnstyledLink } from '../../basic/Atomics';
import { SMALL_SCREEN_THRESHOLD } from '../../../constants';

export interface NavigationItem {
  title?: string;
  image?: string;
  selected?: boolean;
  route: string;
}

const NavigationItem: React.FC<
  NavigationItem & {
    onLinkClicked(offset: number): void;
  }
> = ({ title, selected = false, route, onLinkClicked }) => {
  return (
    <UnstyledLink
      to={route}
      onClick={(e) => {
        const target = e.target as HTMLAnchorElement;
        onLinkClicked(target.offsetLeft - 89);
      }}
      css={css`
        display: inline-block;
        margin-left: 64px;
        line-height: 90px;
        height: 90px;
        overflow: hidden;
        flex-basis: 1;
        flex-shrink: 0;
        @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
          height: 60px;
          line-height: 60px;
          margin-left: 18px;
        }
      `}
    >
      <NavigationTitle selected={selected}>
        {title}
        {selected && <BottomBar bottom={-34} />}
      </NavigationTitle>
    </UnstyledLink>
  );
};

export default NavigationItem;
