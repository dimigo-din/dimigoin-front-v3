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
  padding: 19px 23px;
  border: solid 1px #d8d8d8;
  appearance: none;
  background-color: #ffffff;
  font-family: 'NanumSquareRound', sans-serif;
  font-size: 17px;
  transition: all 0.2s ease-in-out;

  &:focus {
    box-shadow: inset 1px 1px 16px #dadeeb,
      inset -2px -2px 3px #fff;
  }

  &::placeholder {
    color: #d8d8d8;
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
