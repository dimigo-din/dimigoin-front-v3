import React from 'react';
import styled from '@emotion/styled';
import css from '@emotion/css';
import { ReactComponent as CheckIcon } from '../../assets/icons/check.svg';
import { SMALL_SCREEN_THRESHOLD } from '../../constants';

interface CheckboxProps {
  text?: string;
  checked?: boolean;
  onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
  defaultChecked?: boolean;
  disabled?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  text,
  onChange,
  checked,
  defaultChecked,
  disabled,
  ...props
}) => {
  return (
    <Wrapper {...props}>
      <InvisibleCheck
        disabled={disabled}
        checked={checked === undefined ? defaultChecked : checked}
        onChange={onChange}
      />
      <LabelWrapper>
        <CheckWrapper checked={!!checked} disabled={!!disabled}>
          <Check visible={!!checked} />
        </CheckWrapper>
        {text && <Label>{text}</Label>}
      </LabelWrapper>
    </Wrapper>
  );
};

const LabelWrapper = styled.div`
  align-items: center;
  display: flex;
`;

const Wrapper = styled.label`
  font-weight: 700;
  font-size: 16px;
  display: block;
  color: #8a8a8a;
  flex-shrink: 0;
  & + & {
    margin-left: 12px;
  }
  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    font-size: 14px;
  }
`;

const InvisibleCheck = styled.input`
  /* display: none; */
  position: absolute;
  opacity: 0;
  width: 0px;
  height: 0px;
  margin: 0px;
  &:focus + div > div {
    box-shadow: inset 0px 0px 0px 1px var(--main-theme-accent);
  }
`;

const CheckWrapper = styled.div<{ checked: boolean; disabled: boolean }>`
  width: 18px;
  height: 18px;
  display: inline-grid;
  border-radius: 2px;
  border: solid 1.5px;
  color: var(--main-theme-accent);
  place-items: center;
  transition: 300ms cubic-bezier(0, 0.75, 0.21, 1);
  border-color: #8a8a8a;
  margin-right: 10px;
  vertical-align: middle;
  ${({ checked }) =>
    checked &&
    css`
      border-color: var(--main-theme-accent);
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      border-color: #d1d1d1;
    `}

  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    width: 12px;
    height: 12px;
  }
`;
InvisibleCheck.defaultProps = { type: 'checkbox' };

const Check = styled(CheckIcon)<{ visible: boolean }>`
  width: 13px;
  transition: 300ms cubic-bezier(0, 0.75, 0.21, 1);
  opacity: 0;
  transform: scale(0.8);
  ${({ visible }) =>
    visible &&
    css`
      opacity: 1;
      transform: scale(1);
    `}
  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    width: 10px;
  }
`;

const Label = styled.p`
  vertical-align: middle;
  line-height: 22px;
`;

export default Checkbox;
