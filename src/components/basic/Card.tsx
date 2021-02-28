import React from 'react';
import styled from '@emotion/styled';
import css from '@emotion/css';
import { SMALL_SCREEN_THRESHOLD } from '../../constants';

type MouseEventHandler = (event: React.MouseEvent<HTMLDivElement>) => void;
type FocusEventHandler = (event: React.FocusEvent<HTMLDivElement>) => void;

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  button?: React.ReactNode;
  hover?: boolean;
  clickable?: boolean;
  cardRef?:
  | string
  | ((instance: HTMLDivElement | null) => void)
  | React.RefObject<HTMLDivElement>
  | null;
  onClick?: MouseEventHandler;
  onMouseOver?: MouseEventHandler;
  onFocus?: FocusEventHandler;
  onMouseOut?: MouseEventHandler;
  onBlur?: FocusEventHandler;
  leftBorder?: boolean;
  borderColor?: string;
  disableSpace?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  button,
  hover,
  clickable,
  cardRef,
  className = "",
  onClick,
  onMouseOver,
  onFocus,
  onMouseOut,
  onBlur,
  leftBorder,
  borderColor,
  ...props
}) => (
    <Container
      className={className}
      hover={hover}
      clickable={clickable}
      button={!!button}
      ref={cardRef}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onFocus={onFocus}
      onMouseOut={onMouseOut}
      onBlur={onBlur}
      leftBorder={leftBorder}
      borderColor={borderColor}
      {...props}
    >
      {button ? <Content>{children}</Content> : children}
      {button && (
        <>
          <Button>{button}</Button>
        </>
      )}
    </Container>
  );

export default Card;

interface CardContainerProps {
  button?: boolean;
  hover?: boolean;
  clickable?: boolean;
  leftBorder?: boolean;
  disableSpace?: boolean;
  borderColor?: string;
}

const Container = styled.div<CardContainerProps>`
  padding: 25px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.03);
  transition: box-shadow 1s cubic-bezier(0, 0.46, 0.12, 0.98),
              opacity 1s cubic-bezier(0, 0.46, 0.12, 0.98),
              transform 1s cubic-bezier(0, 0.46, 0.12, 0.98),
              border-color 300ms cubic-bezier(0, 0.46, 0.12, 0.98);
  /* transition: border-left none; */

  /* @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    padding: 24px 18px;
  } */
  ${({ disableSpace }) => !disableSpace && css`
    & + & {
      margin-top: 10px;
    }
  `}

  ${({ leftBorder }) =>
    leftBorder &&
    css`
      border-left: 5px solid var(--main-theme-accent);
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
    `}

  ${({ button = false }) =>
    button &&
    css`
      display: flex;
      flex-direction: column;
      padding-bottom: 0;
    `};

  ${({ hover = true }) =>
    hover &&
    css`
      &:hover {
        z-index: 1;
        box-shadow: 0px 0px 36px rgba(0, 0, 0, 0.05);
      }
    `};

  ${({ clickable = false }) =>
    clickable &&
    css`
      &:active {
        opacity: 0.7;
        transform: scale(0.99);
      }
    `};

    ${({ borderColor }) => borderColor && css`
      border-color: ${borderColor}
    `}
`;

const Content = styled.div`
  padding: 0.5rem;
`;

const Button = styled.div`
  display: flex;
  align-items: stretch;
  padding: 1.25rem;
  margin-top: auto;
  cursor: pointer;

  & > span {
    flex: 1;
    margin-top: 20px;
    font-weight: 600;
    text-align: center;
  }
`;

export const CardTitle = styled.h1`
  font-size: 20px;
  font-weight: 900;
  margin-bottom: 12px;
  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    font-size: 15px;
  }
`;
