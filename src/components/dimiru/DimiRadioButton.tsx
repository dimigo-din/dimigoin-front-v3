import React from "react";
import styled from "@emotion/styled";
import { EventFunction } from "../hooks/useInput";
import css from "@emotion/css";
import { ResponsiveWrapper, Divider } from "../grids/Cols";

interface RadioButtonProps {
  onChange?: (...p: any[]) => any;
  name?: string;
  disabled?: boolean;
  children: string;
}
const ButtonWrapper = styled.div`
  vertical-align: middle;
  border: solid 1.5px #8a8a8a;
  width: 26px;
  height: 26px;
  border-radius: 26px;
  display: inline-grid;
  transition: 200ms cubic-bezier(0, 0.59, 0.12, 0.98);
  margin-right: 16px;
  place-items: center;
`;
const CenterCircle = styled.div`
  opacity: 0;
  width: 12px;
  height: 12px;
  border-radius: 12px;
  transition: 200ms cubic-bezier(0, 0.59, 0.12, 0.98);
`;
const BlockedIcon = styled.div`
  width: 10px;
  height: 10px;
  transform: translate(50%, 50%);
  border: 1px solid red;
`;
const LogicalButton = styled.input`
  display: none;
  &:checked + div {
    border: solid 1.5px #3c70e8;
  }
  &:checked + div div {
    opacity: 1;
    background-color: #3c70e8;
  }
`;

const Wrapper = styled.label`
  font-size: 20px;
  color: #8a8a8a;
  &:not(& + &) {
    margin-right: 30px;
  }
`;

export const RadioButton: React.FC<
  React.HTMLAttributes<HTMLInputElement> & RadioButtonProps
> = ({ disabled, children, ...props }) => {
  if (disabled)
    return (
      <div>
        <Wrapper>
          <ButtonWrapper>
            <BlockedIcon></BlockedIcon>
          </ButtonWrapper>
          {children}
        </Wrapper>
      </div>
    );
  return (
    <Wrapper>
      <LogicalButton type="radio" {...props} />
      <ButtonWrapper>
        <CenterCircle />
      </ButtonWrapper>
      {children}
    </Wrapper>
  );
};

export interface RadioButtonItem {
  name: string;
  key?: string;
}

interface IProps {
  items: RadioButtonItem[];
  name: string;
  onChange: EventFunction<RadioButtonItem>;
}

const RadioButtonGroup: React.FC<IProps> = ({ items, name, onChange }) => {
  return (
    <ResponsiveWrapper
      css={css`
        flex-wrap: wrap;
        line-height: 36px;
      `}
    >
      {items.map((item) => (
        <>
          <RadioButton
            name={name}
            key={item.key}
            onClick={() =>
              onChange && item.key && onChange({ target: { value: item } })
            }
          >
            {item.name}
          </RadioButton>
          <Divider small />
        </>
      ))}
    </ResponsiveWrapper>
  );
};

export default RadioButtonGroup;