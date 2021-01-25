import styled from "@emotion/styled";
import css from "@emotion/css";

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
}

export const Divider = styled.div<DividerProps>`
  --divider-width: 30px;
  ${({ small }) => small && css`
    --divider-width: 15px;
  `}
  ${({ size }) => size && css`
    --divider-width: ${size}px;
  `}
  margin: 0px var(--divider-width);
  ${({ horizontal }) => horizontal &&
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

export const MOBILD_DEFAULT_THRESHOLD = 720

export const ResponsiveWrapper = styled.div<{ threshold?: number }>`
  display: flex;
  @media screen and (max-width: ${({ threshold }) => threshold || MOBILD_DEFAULT_THRESHOLD}px) {
    flex-direction: column;
    & > [data-divider] {
      margin: 15px 0px;
    }
  }
`;
