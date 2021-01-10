import React from "react";
import styled from "@emotion/styled";
import css from "@emotion/css";
import { Horizontal, UnstyledLink } from "./Atomics";
import { Divider } from "../layout/Cols";

interface IProps {
  withBubble?: boolean;
  subButton?: {
    text: string;
    route?: string;
    action?: () => any;
  };
}

const CardGroupHeader: React.FC<IProps> = ({
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
        <Divider small />
        {subButton && (
          subButton.route ? (
            <SubButton>
              <UnstyledLink to={subButton.route}>{subButton.text}
              </UnstyledLink>
            </SubButton>
          ) : subButton.action ? (
            <SubButton onClick={subButton.action}>{subButton.text}</SubButton>
          ) : (
                <SubButton>{subButton.text}</SubButton>
              )
        )}
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

const SubButton = styled.p`
  align-self: flex-end;
  font-weight: 800;
  color: #E83C77;
  margin-top: 12px;
  flex-basis: 1;
  flex-shrink: 0;
`;

const Wrapper = styled.section`
  margin-bottom: 14px;
`;

export default CardGroupHeader;
