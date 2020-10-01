import React from "react";
import styled from "@emotion/styled";
import css from "@emotion/css";
import { Link } from "react-router-dom";
import { ResponsiveWrapper, Divider } from "./grids/Cols";
import { UnstyledLink } from "./Atomics";

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
      <ResponsiveWrapper>
        <Title withBubble={withBubble}>{children}</Title>
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
      </ResponsiveWrapper>
    </Wrapper>
  );
};

export const Title = styled.h1<{ withBubble?: boolean }>`
  font-size: 27px;
  font-weight: 900;
  font-family: "NanumSquare", sans-serif;
  color: #333333;
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
  margin-left: 15px;
  align-self: flex-end;
  font-weight: 800;
  color: #E83C77;
`;

const Wrapper = styled.section`
  margin-bottom: 14px;
`;

export default CardGroupHeader;
