import React from 'react';
import css from '@emotion/css';

export interface IDimiButton {
  gray?: boolean;
  active?: boolean;
  loading?: boolean;
  href?: string;
  small?: boolean;
  large?: boolean;
  text?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  children: React.ReactNode;
}

const style = {
  btn: css`
    position: relative;
    display: inline-flex;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    padding: 18px;
    appearance: none;
    background-color: var(--main-theme-accent);
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    font-size: 17px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s ease-in-out, 0.5s background-color ease;
    user-select: none;
    white-space: nowrap;
    box-sizing: border-box;
  `,
  gray: css`
    background-color: #f3f3f3;
    box-shadow: 0 10px 24px 0 rgba(50, 50, 50, 0.11);
    color: #595858;
  `,
  text: css`
    background-color: transparent;
  `,
  disableCurser: css`
    cursor: not-allowed;
  `,
  disable: css`
    background-color: #8a8a8a;
  `,
  large: css`
    font-size: 24px;
  `,
  small: css`
    font-size: 12px;
  `,
};

const DimiButton: React.FC<IDimiButton> = ({
  gray = false,
  active = true,
  loading = false,
  href = undefined,
  small = false,
  large = false,
  text = false,
  disabled = false,
  onClick,
  children,
  ...props
}) => {
  const buttonStyle = [
    style.btn,
    gray && style.gray,
    text && style.text,
    (loading || !active) && style.disableCurser,
    disabled && style.disable,
    large && style.large,
    small && style.small,
  ].filter(Boolean);
  return (
    <a
      href={href}
      css={buttonStyle}
      onClick={(e) => active && onClick && onClick(e)}
      {...props}
    >
      {children}
    </a>
  );
};

export default DimiButton;