import React from "react";
import styled from "@emotion/styled";
import { EventFunction } from "../../hooks/useInput";
import css from "@emotion/css";
import { Horizontal } from "./Atomics";

interface RadioButtonProps {
  onChange?: (...p: any[]) => any;
  name?: string;
  disabled?: boolean;
}

export const RadioButton: React.FC<
React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & RadioButtonProps
> = ({ disabled, children, id, checked, ...props }) => {
  return (
    <Wrapper>
      <LogicalButton type="radio" {...props} disabled={disabled} id={id} />
      <Circle disabled={disabled} />
      {children && <Label>{children}</Label>} 
    </Wrapper>
  );
};

export interface RadioButtonItem {
  name: string;
  key?: string;
  disabled?: boolean;
}

interface RadioButtonsGroupProps {
  items: RadioButtonItem[];
  name: string;
  onChange: EventFunction<RadioButtonItem>;
  value?: RadioButtonItem;
}

export const RadioButtonGroup: React.FC<RadioButtonsGroupProps> = ({ items, name, onChange,  }) => {
  return (
    <RadioButtonGroupWrapper
    >
      {items.map((item) => (
        <RadioButtonGroupItemWrapper>
          <RadioButton
            name={name}
            key={item.key}
            disabled={item.disabled}
            onClick={() =>
              onChange && item.key && onChange({ target: { value: item } })
            }
          >
            {item.name}
          </RadioButton>
        </RadioButtonGroupItemWrapper>
      ))}
    </RadioButtonGroupWrapper>
  );
};

const RadioButtonGroupWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  line-height: 36px;
  margin: -6px;
`

const RadioButtonGroupItemWrapper = styled.div`
  flex: 1;
  margin: 6px;
`

const Circle = styled.div<{ disabled?: boolean }>`
  width: 26px;
  height: 26px;
  border: 1.5px solid #8A8A8A;
  border-radius: 13px;
  box-sizing: border-box;
  transition: 300ms cubic-bezier(0, 0.76, 0.12, 0.98);
`;
const LogicalButton = styled.input`
  /* position: absolute; */
  opacity: 0;
  cursor: pointer;
  &:checked+div {
    border-width: 7px;
    border-color: var(--main-theme-accent);
  }
`;

const Wrapper = styled.label`
  display: flex;
  align-items: center;
  user-select: none;

`;

const Label = styled.p`
  font-size: 20px;
  margin-left: 15px;
  color: #8A8A8A;
  white-space: pre;
`

export default RadioButtonGroup;
