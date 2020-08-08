import React from 'react';
import styled from '@emotion/styled';
import css from '@emotion/css';

interface IProps {
  title: string;
  withBubble: boolean;
  subButton: {
    text: string;
    route?: string;
    action?: () => any;
  }
}

const CardGroup: React.FC<IProps> = ({
  title,
  subButton,
  withBubble,
}) => {
  return (
    <article>
      <Header>
        <Title withBubble={withBubble}>{title}</Title>
        {subButton ?
          subButton.route ?
            <SubButton>
              더보기
            </SubButton>
            :
            <SubButton>
              더보기
            </SubButton>
          : null}
      </Header>
    </article>
  )
}

const Title = styled.h1<{withBubble: boolean}>`
  font-size: 27px;
  font-weight: 900;
  font-family: 'NanumSquare', sans-serif;
  ${({ withBubble }) => withBubble && css`
    &::after {
      display: inline-block;
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 4px;
      background-color: #ff6359;
      content: ' ';
      margin-left: 4px;
      margin-top: 3px;
    }
  `}
`

const Header = styled.div`
  display: flex;

`
const SubButton = styled.p`
  align-self: flex-end;
  margin-left: 15px;
  font-weight: 800;
  color: #8a8a8a;
`

export default CardGroup