import css from '@emotion/css';
import styled from '@emotion/styled';
import { SMALL_SCREEN_THRESHOLD } from '../../constants';

export const Textarea = styled.textarea`
  border-radius: 6px;
  border: solid 1px #d1d1d1;
  width: 100%;
  resize: none;
  box-sizing: border-box;
  outline: none;
  padding: 18px 16px;
  font-size: 18px;
  transition: 300ms cubic-bezier(0, 0.76, 0.12, 0.98);
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
  &::placeholder {
    color: #d1d1d1;
  }
  ${({ disabled }) =>
    !disabled &&
    css`
      &:hover {
        box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.14);
      }
    `}
  &:focus {
    border-color: var(--main-theme-accent);
    box-shadow: 0px 0px 6px rgba(var(--main-theme-accent-rgb), 0.3);
  }
  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    font-size: 14px;
  }
`;
