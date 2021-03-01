import React from 'react';
import styled from '@emotion/styled';
import { EventFunction } from '../../hooks/useInput';
import { SMALL_SCREEN_THRESHOLD } from '../../constants';

interface RadioButtonProps {
  onChange?: (...p: any[]) => any;
  name?: string;
  disabled?: boolean;
}

export const RadioButton: React.FC<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > &
    RadioButtonProps
> = ({ disabled, children, checked, ...props }) => {
  return (
    <Wrapper>
      <LogicalButton
        type="radio"
        defaultChecked={checked}
        disabled={disabled}
        {...props}
      />
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

export const RadioButtonGroup: React.FC<RadioButtonsGroupProps> = ({
  items,
  name,
  onChange,
  value,
}) => {
  return (
    <RadioButtonGroupWrapper>
      {items.map((item) => (
        <RadioButtonGroupItemWrapper key={item.key}>
          <RadioButton
            name={name}
            disabled={item.disabled}
            checked={item.key === value?.key}
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
`;

const RadioButtonGroupItemWrapper = styled.div`
  flex: 1;
  margin: 6px;
`;

const Circle = styled.div<{ disabled?: boolean }>`
  width: 26px;
  height: 26px;
  border: 1px solid #8a8a8a;
  border-radius: 13px;
  box-sizing: border-box;
  transition: 300ms;
  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    width: 18px;
    height: 18px;
  }
`;
const LogicalButton = styled.input`
  /* position: absolute; */
  opacity: 0;
  width: 0px;
  cursor: pointer;
  &:checked + div {
    border-width: 6px;
    border-color: var(--main-theme-accent);
  }
  &:not(:checked):focus + div {
    box-shadow: inset 0px 0px 0px 2px var(--main-theme-accent);
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
  color: #8a8a8a;
  white-space: pre;
  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    font-size: 14px;
    margin-left: 6px;
  }
`;

export default RadioButtonGroup;
