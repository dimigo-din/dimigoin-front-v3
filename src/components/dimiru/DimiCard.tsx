import React from 'react';
import styled from '@emotion/styled';
import css from '@emotion/css';

type MouseEventHandler = (event: React.MouseEvent<HTMLDivElement>) => void;
type FocusEventHandler = (event: React.FocusEvent<HTMLDivElement>) => void;

export interface IDimiCard {
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
}

const DimiCard: React.FC<IDimiCard> = ({
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
  >
    {button ? <Content>{children}</Content> : children}
    {button && (
      <>
        <Button>{button}</Button>
      </>
    )}
  </Container>
);

export default DimiCard;

interface ICardContainer {
  button?: boolean;
  hover?: boolean;
  clickable?: boolean;
  leftBorder?: boolean;
}

const Container = styled.div<ICardContainer>`
  position: relative;
  padding: 25px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 20px 0 rgba(146, 146, 146, 0.09);
  transition: 1s cubic-bezier(0, 0.46, 0.12, 0.98);
  & + & {
    margin-top: 10px;
  }
  ${({ leftBorder }) =>
    leftBorder &&
    css`
      border-left: 5px solid #3c70e8;
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

  ${({ hover = false }) =>
    hover &&
    css`
      &:hover {
        z-index: 1;
        box-shadow: 2px 16px 36px rgba(21, 19, 19, 0.15), -5px -5px 10px #fff;
      }
    `};

  ${({ clickable = false }) =>
    clickable &&
    css`
      &:active {
        box-shadow: inset 1px 1px 2px #dadeeb, inset -1px -1px 2px #fff;
      }
    `};
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
`;
