import styled from "@emotion/styled";
import css from "@emotion/css";

export const Col = styled.div<{ width?: number }>`
  ${({ width }) =>
    width &&
    css`
      flex: ${width / 10};
    `}
`;

export const Divider = styled.div<{ visible?: boolean }>`
  margin: 0px 30px;
  ${({ visible }) =>
    visible &&
    css`
      border: 1px solid #eeeeee;
    `}
`;
