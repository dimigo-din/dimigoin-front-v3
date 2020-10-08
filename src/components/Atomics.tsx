import css from "@emotion/css";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const UnstyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

export const Horizontal = styled.div`
  display: flex;
`;

export const Description = styled.div`
  margin-left: 12px;
`;

export const HeaderIconWrapper = styled.div`
  flex: 1;
  text-align: right;
  color: #8a8a8a;
`;

export const noBreak = css`
  white-space: nowrap;
`;
