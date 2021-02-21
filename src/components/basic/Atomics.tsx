import css from "@emotion/css";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import Button from "./Button";

export const UnstyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

export const Outlink = styled.a`
  color: var(--main-theme-accent);
  font-weight: 700;
`

export const Horizontal = styled.div`
  display: flex;
`;

export const MyTodayDetail = styled.div`
  margin-left: 12px;
`;

export const DescriptionText = styled.p`
  font-size: 16px;
  color: #B8B8B8;
  font-weight: 700;
  line-height: 24px;
`

export const HeaderIconWrapper = styled.div`
  flex: 1;
  text-align: right;
  color: #8a8a8a;
`;

export const noBreak = css`
  white-space: nowrap;

`
export const CardExplainContent = styled.div`
  color: #8a8a8a;
  font-size: 18px;
  line-height: 30px;
  & h2+p{
    margin-top: 12px;
  }
  & h2 {
    font-weight: 900;
    font-size: 20px;
    color: black;
  }
  & *+h2 {
    margin-top: 12px;
  }
`;

export const NoData = styled.p`
  flex: 1;
  font-size: 18px;
  font-weight: bold;
  color: #d1d1d1;

  align-items: center;
  justify-content: center;
  display: flex;
  padding: 24px 36px;
`

export const CompactButton = styled(Button)`
  padding: 12px 30px;
`

export const MoreCompactButton = styled(Button)`
  padding: 6px 18px;
  
`

export const cardModalTopBorder = css`border-top: 10px solid var(--main-theme-accent);`
