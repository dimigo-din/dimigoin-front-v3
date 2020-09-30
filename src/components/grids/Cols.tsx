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

interface IDividerProps {
  visible?: boolean;
  // small?: boolean;
  horizontal?: boolean;
}

export const Divider = styled.div<IDividerProps>`
  margin: 0px 30px;
  ${({ horizontal, small }) =>
    horizontal &&
    !small &&
    css`
      margin: 30px 0px;
    `}
  ${({ visible }) =>
    visible &&
    css`
      border: 1px solid #eeeeee;
    `}
`;

export const SmallDivider = styled.div`
  margin: 0px 7.5px;
`

export const ResponsiveScreenWrapper = styled.div`
  display: flex;

  @media screen and (max-width: 760px) {
    flex-direction: column;

    & > [class*="-Divider"] {
      margin: 30px 0px;
    }
  }
`;

export const ResponsiveWrapper = styled.div<{ threshold?: number }>`
  display: flex;
  @media screen and (max-width: ${({ threshold }) => threshold || 760}px) {
    flex-direction: column;

    & > [class*="-Divider"] {
      margin: 30px 0px;
    }
    & > [class*="SmallDivider"] {
      margin: 7.5px 0px;
    }
  }
`;
