import styled from '@emotion/styled';
import css from '@emotion/css';
import { SMALL_SCREEN_THRESHOLD } from '../../../constants';

export const NavigationContainer = styled.div`
  cursor: pointer;
`;

export const NavigationTitle = styled.span<{ selected?: boolean }>`
  font-size: 22px;
  line-height: 1.18;
  color: #d1d1d1;
  position: relative;
  height: 100%;
  & + & {
    margin-left: 32px;
  }
  ${({ selected }) =>
    selected &&
    css`
      color: var(--main-theme-accent);
      font-weight: 700;
    `}
  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    font-size: 15px;
    --bottom-margin: -21px;
  }
`;

export const NavigationImage = styled.img`
  width: 32px;
  height: 37px;
  object-fit: contain;
`;

export const BottomBar = styled.div<{ selected?: boolean; bottom?: number }>`
  position: absolute;
  bottom: var(--bottom-margin, ${({ bottom }) => bottom}px);
  left: 0;
  right: 0;
  background-color: #e83c77;
  height: 5px;
  border-radius: 10px;
  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    height: 3px;
  }
`;
