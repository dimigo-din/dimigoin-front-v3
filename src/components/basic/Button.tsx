import React from 'react';
import css from '@emotion/css';

export interface ButtonProps {
  gray?: boolean;
  active?: boolean;
  loading?: boolean;
  href?: string;
  small?: boolean;
  large?: boolean;
  text?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  children: React.ReactNode;
}

const style = {
  btn: css`
    display: inline-flex;
    background-color: var(--main-theme-accent);
    padding: 18px;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    font-size: 17px;
    font-weight: 600;
    text-decoration: none;
    justify-content: center;
    align-items: center;
    text-align: center;
    transition: 1s cubic-bezier(0, 0.76, 0.12, 0.98);
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

export const Button: React.FC<ButtonProps> = ({
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
    (!active || disabled) && style.disable,
    large && style.large,
    small && style.small,
  ].filter(Boolean);
  return (
    <div
      css={buttonStyle}
      onClick={(e) => active && onClick && onClick(e)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Button;
