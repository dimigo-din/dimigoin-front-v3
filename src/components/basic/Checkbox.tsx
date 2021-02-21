import React from "react";
import styled from "@emotion/styled";
import css from "@emotion/css";
import Dimigoincon from "./Dimigoincon";

interface CheckboxProps {
  text?: string;
  checked?: boolean;
  onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
  defaultChecked?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> =({
  text, onChange, checked, defaultChecked, ...props
}) => {
  return (
    <Wrapper {...props}>
      <InvisibleCheck
        checked={checked === undefined ? defaultChecked : checked}
        onChange={onChange}
      />
      <CheckWrapper checked={!!checked}>
        <Check visible={!!checked} />
      </CheckWrapper>
      <span css={css`
  vertical-align: middle;`}>
        {text}
      </span>
    </Wrapper>
  );
};

const Wrapper = styled.label`
  font-weight: 700;
  font-size: 16px;
  display: block;
  color: #8a8a8a;
  flex-shrink: 0;
`;

const InvisibleCheck = styled.input`
  /* display: none; */
  opacity: 0;
  width: 0px;
  &:focus+div {
    box-shadow: inset 0px 0px 0px 2px var(--main-theme-accent);
  }
`;

const CheckWrapper = styled.div<{ checked: boolean }>`
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
`;
InvisibleCheck.defaultProps = { type: "checkbox" };

const Check = styled(Dimigoincon) <{ visible: boolean }>`
  font-size: 10px;
  transition: 300ms cubic-bezier(0, 0.75, 0.21, 1);
  opacity: 0;
  transform: scale(0.8);
  ${({ visible }) =>
    visible &&
    css`
      opacity: 1;
      transform: scale(1);
    `}
`;
Check.defaultProps = {
  icon: "ok",
};
export default Checkbox;
