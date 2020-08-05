import React from 'react';
import css from '@emotion/css';

interface IDimiButton {
  gray?: boolean;
  active?: boolean;
  loading?: boolean;
  href?: string;
  small?: boolean;
  large?: boolean;
  text?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  children: React.ReactNode;
}

const style = {
  btn: css`
    cursor: pointer;

    &:hover {}
  `,
  gray: css`
    &:hover {}
  `,
  text: css`
  `,
  disableCurser: css`
    cursor: not-allowed;
  `,
  large: css`
  `,
  small: css`
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
  onClick,
  children,
  ...props
}) => {
  const buttonStyle = [
    style.btn,
    gray && style.gray,
    text && style.text,
    (loading || !active) && style.disableCurser,
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
