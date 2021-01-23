import React from 'react';
import styled from '@emotion/styled';
import css from '@emotion/css';

interface InputProps {
  errorMessage?: string;
  error?: boolean;
}

export const Input: React.FC<
  InputProps &
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
> = ({ errorMessage = '', error, ...props }) => (
  <Wrapper>
    <LogicalInput error={error} {...props} />
    {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
  </Wrapper>
);

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

interface LogicalInputProps {
  error?: boolean;
}

const LogicalInput = styled.input<LogicalInputProps>`
  width: 100%;
  box-sizing: border-box;
  padding: 20px 24px;
  border: none;
  border-radius: 6px;
  /*
    Animating Frame 이슈때문에 border가 아니라
    box-shadow로 테두리 색을 처리했습니다.
  */
  box-shadow: inset 0px 0px 0px 1px #EEEEEE;
  appearance: none;
  background-color: #ffffff;
  font-family: 'NanumSquare', sans-serif;
  font-size: 17px;
  transition: 300ms;

  &:hover {
    box-shadow: inset 0px 0px 0px 2px #D1D1D1;
  }

  &:focus {
    box-shadow: inset 0px 0px 0px 2px var(--main-theme-accent);
  }

  &::placeholder {
    color: #EEEEEE;
  }

  ${({ error = false }) => error
    && css`
      background-color: lighten(#e83c3d, 35%);
    `};

  outline: 0;
`;

const ErrorMessage = styled.p`
  position: absolute;
  padding-left: 1em;
  margin-top: 0.375em;
  color: #e83c3d;
  font-size: 12px;
`;

export default Input;
