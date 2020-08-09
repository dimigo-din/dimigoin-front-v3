import React from "react";
import styled from "@emotion/styled";
import css from "@emotion/css";
import { Link } from "react-router-dom";

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
  console.log(props);
  return (
    <Wrapper {...props}>
      <Header>
        <Title withBubble={withBubble}>{children}</Title>
        {subButton ? (
          subButton.route ? (
            <Link to={subButton.route}>
              <SubButton>{subButton.text}</SubButton>
            </Link>
          ) : (
            <SubButton>{subButton.text}</SubButton>
          )
        ) : null}
      </Header>
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

const Header = styled.div`
  display: flex;
`;
const SubButton = styled.p`
  align-self: flex-end;
  margin-left: 15px;
  font-weight: 800;
  color: #8a8a8a;
`;
const Wrapper = styled.section`
  margin-bottom: 14px;
`;

export default CardGroupHeader;
