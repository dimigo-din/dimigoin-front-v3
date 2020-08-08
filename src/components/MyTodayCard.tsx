import React from 'react';
import css from '@emotion/css';
import Card from './dimiru/DimiCard'
import styled from '@emotion/styled';

interface IProps {
  name: string;
  time: string;
  location: string;
  className?: string;
}

const MyTodayCard: React.FC<IProps> = ({
  name,
  location,
  time,
  className
}) => {
  return <Card leftBorder className={className}>
    <Title>오늘의 {name}</Title>
    {time && <Row>
      <Time />
      <Desc>{time}</Desc>
    </Row>}

    {location &&
      <Row>
        <Pin />
        <Desc>{location}</Desc>
      </Row>}
  </Card>
}

const Title = styled.h1`
  font-size: 20px;
  font-weight: 900;
  font-family: 'NanumSquare', sans-serif;
  margin-bottom: 12px;
`

const Time = styled.i`
  & {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(var(--ggs, 0.8));
    width: 18px;
    height: 18px;
    border-radius: 100%;
    border: 2px solid transparent;
    box-shadow: 0 0 0 2px currentColor;
  }
  &::after {
    content: '';
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 7px;
    height: 7px;
    border-left: 2px solid;
    border-bottom: 2px solid;
    top: 1px;
    left: 5px;
  }
`

const Pin = styled.i`
  & {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: rotate(45deg) scale(var(--ggs, 0.8));
    width: 18px;
    height: 18px;
    border-radius: 100% 100% 0 100%;
    border: 2px solid;
    margin-top: -1px;
  }
  &::before {
    content: '';
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 8px;
    height: 8px;
    border: 2px solid;
    top: 3px;
    left: 3px;
    border-radius: 40px;
  }
`

const Row = styled.div`
  display: flex;
  font-size: 16px;
  color: #8a8a8a;
  &+div{
    margin-top: 9px;
  }
`

const Desc = styled.div`
  margin-left: 12px;
`

export default MyTodayCard