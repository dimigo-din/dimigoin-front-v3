import React from "react";
import styled from "@emotion/styled";
import { EventFunction } from "../../hooks/useInput";
import css from "@emotion/css";
import { Horizontal } from "./Atomics";

interface RadioButtonProps {
  onChange?: (...p: any[]) => any;
  name?: string;
  disabled?: boolean;
  // children: string;
}
const Circle = styled.div<{ disabled?: boolean }>`
  width: 26px;
  height: 26px;
  border: 1.5px solid #8A8A8A;
  border-radius: 13px;
  box-sizing: border-box;
  transition: 300ms cubic-bezier(0, 0.76, 0.12, 0.98);
`;
const LogicalButton = styled.input`
  display: none;
  &:checked+div {
    border-width: 7px;
    border-color: var(--main-theme-accent);
  }
`;

const Wrapper = styled.label`
  display: flex;
  align-items: center;
`;

const Label = styled.p`
  font-size: 20px;
  margin-left: 15px;
  color: #8A8A8A;
  white-space: pre;
`

export const RadioButton: React.FC<
  React.HTMLAttributes<HTMLInputElement> & RadioButtonProps
> = ({ disabled, children, id, ...props }) => {
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
}

const RadioButtonGroup: React.FC<RadioButtonsGroupProps> = ({ items, name, onChange }) => {
  return (
    <Horizontal
      css={css`
        flex-wrap: wrap;
        line-height: 36px;
      `}
    >
      {items.map((item) => (
        <div css={css`flex: 1;`}>
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
        </div>
      ))}
    </Horizontal>
  );
};

export default RadioButtonGroup;
