import styled from '@emotion/styled';
import css from '@emotion/css';

export const Col = styled.div<{ width?: number }>`
  ${({ width }) =>
    width &&
    css`
      flex: ${width / 10};
    `}
`;
export const Divider = styled.div<{ visible?: boolean; small?: boolean }>`
  margin: 0px 30px;
  ${({ small }) =>
    small &&
    css`
      margin: 0px 7.5px;
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
    & > [class*="Divider"] {
      margin: 30px 0px;
    }
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  @media screen and (max-width: 760px) {
    flex-direction: column;
    & > [class*="Divider"] {
      margin: 30px 0px;
    }
  }
`;
