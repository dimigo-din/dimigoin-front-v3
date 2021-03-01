import styled from '@emotion/styled';
import css from '@emotion/css';
import { SMALL_SCREEN_THRESHOLD } from '../../constants';

export const Col = styled.div<{ width?: number }>`
  display: flex;
  flex-direction: column;
  ${({ width }) =>
    width &&
    css`
      flex: ${width / 10};
    `}
`;

interface DividerProps {
  visible?: boolean;
  small?: boolean;
  size?: number;
  horizontal?: boolean;
  smaller?: boolean;
}

export const Divider = styled.div<DividerProps>`
  --divider-width: 30px;
  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    --divider-width: 20px;
  }
  ${({ small }) =>
    small &&
    css`
      --divider-width: 15px;
      @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
        --divider-width: 10px;
      }
    `}
  ${({ size }) =>
    size &&
    css`
      --divider-width: ${size}px;
    `}
  ${({ smaller }) =>
    smaller &&
    css`
      --divider-width: 5px;
      @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
        --divider-width: 3px;
      }
    `}
  margin: 0px var(--divider-width);
  ${({ horizontal }) =>
    horizontal &&
    css`
      margin: var(--divider-width) 0px;
    `}
  ${({ visible }) =>
    visible &&
    css`
      border: 1px solid #eeeeee;
    `}
`;

export const ResponsiveScreenWrapper = styled.div`
  display: flex;

  @media screen and (max-width: 760px) {
    flex-direction: column;

    & > [data-divider] {
      margin: var(--divider-width) 0px;
    }
  }
`;

export const ResponsiveWrapper = styled.div<{
  threshold?: number;
  mobileReverse?: boolean;
}>`
  display: flex;
  @media screen and (max-width: ${({ threshold }) =>
      threshold || SMALL_SCREEN_THRESHOLD}px) {
    flex-direction: column
      ${({ mobileReverse: mobildReverse }) => mobildReverse && '-reverse'};
    & > [data-divider] {
      margin: var(--divider-width, 15px) 0px;
    }
  }
`;
