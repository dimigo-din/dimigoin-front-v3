import React from "react";
import styled from "@emotion/styled";
import css from "@emotion/css";
import { Link } from "react-router-dom";
import { ResponsiveWrapper, Divider } from "./grids/Cols";

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
        {subButton ? (
          subButton.route ? (
            <Link to={subButton.route}>
              <SubButton>{subButton.text}</SubButton>
            </Link>
          ) : subButton.action ? (
            <SubButton onClick={subButton.action}>{subButton.text}</SubButton>
          ) : (
            <SubButton>{subButton.text}</SubButton>
          )
        ) : null}
      </ResponsiveWrapper>
    </Wrapper>
  );
};

const Title = styled.h1<{ withBubble?: boolean }>`
  font-size: 27px;
  font-weight: 900;
  font-family: "NanumSquare", sans-serif;
  ${({ withBubble }) =>
    withBubble &&
    css`
      &::after {
        display: inline-block;
        position: absolute;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background-color: #ff6359;
        content: " ";
        margin-left: 4px;
        margin-top: 3px;
      }
    `}
`;

const SubButton = styled.p`
  margin-left: 15px;
  align-self: flex-end;
  font-weight: 800;
  color: #8a8a8a;
`;

const Wrapper = styled.section`
  margin-bottom: 14px;

  * + & {
    margin-top: 54px;
  }
`;

export default CardGroupHeader;