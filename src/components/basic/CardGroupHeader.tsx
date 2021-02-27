import React from "react";
import styled from "@emotion/styled";
import css from "@emotion/css";
import { Horizontal, UnstyledLink } from "./Atomics";
import { Divider } from "../layout/Cols";
import Skeleton from "react-loading-skeleton";
import { SMALL_SCREEN_THRESHOLD } from "../../constants";

interface CardGroupheaderProps {
  withBubble?: boolean;
  subButton?: {
    text?: string;
    component?: JSX.Element;
    route?: string;
    action?: () => any;
  };
}

export const CardGroupHeader: React.FC<CardGroupheaderProps> = ({
  subButton,
  withBubble,
  children,
  ...props
}) => {
  return (
    <Wrapper {...props}>
      <Horizontal css={css`
        flex-wrap: wrap;
      `}>
        <Title withBubble={withBubble}>{children}</Title>
        <Divider smaller />
        {subButton && (subButton.component || (
          subButton.route ? (
            <SubButton>
              <UnstyledLink to={subButton.route}>
                {subButton.text || <Skeleton width={120} />}
              </UnstyledLink>
            </SubButton>
          ) : subButton.action ? (
            <SubButton onClick={subButton.action}>
              {subButton.text || <Skeleton width={120} />}
            </SubButton>
          ) : (
                <SubButton noAction>{subButton.text || <Skeleton width={120} />}</SubButton>
              )
        ))}
      </Horizontal>
    </Wrapper>
  );
};

export const Title = styled.h1<{ withBubble?: boolean }>`
  font-size: 27px;
  font-weight: 900;
  font-family: "NanumSquare", sans-serif;
  color: #333333;
  flex-basis: 1;
  flex-shrink: 0;
  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    font-size: 20px;
  }
  ${({ withBubble }) =>
    withBubble &&
    css`
      &::after {
        display: inline-block;
        position: absolute;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background-color: #E83C77;
        content: " ";
        margin-left: 4px;
        margin-top: -3px;
      }
    `}
`;

const SubButton = styled.p<{ noAction?: boolean }>`
  align-self: flex-end;
  font-weight: 800;
  color: #E83C77;
  margin-top: 12px;
  flex-basis: 1;
  flex-shrink: 0;
  font-size: 15px;

  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    font-size: 12px;
  }

  ${({ noAction }) => noAction && css`
    color: #9A9A9A;
    font-weight: 400;
  `}
`;

const Wrapper = styled.section`
  margin-bottom: 14px;
`;

export default CardGroupHeader;
