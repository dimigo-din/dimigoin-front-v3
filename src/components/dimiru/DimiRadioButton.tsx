import React, { FormEvent } from "react";
import styled from "@emotion/styled";

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
  & + & {
    margin-left: 30px;
  }
`;

export const RadioButton: React.FC<
  RadioButtonProps & React.HTMLAttributes<HTMLDivElement>
> = ({ disabled, children, ...props }) => {
  if (disabled)
    return (
      <Wrapper>
        <ButtonWrapper>
          <BlockedIcon></BlockedIcon>
        </ButtonWrapper>
        {children}
      </Wrapper>
    );
  return (
    <Wrapper>
      <LogicalButton {...props} type="radio" />
      <ButtonWrapper>
        <CenterCircle />
      </ButtonWrapper>
      {children}
    </Wrapper>
  );
};

interface Item {
  name: string;
  key?: string;
}

interface IProps {
  items: Item[];
  name: string;
  onChange?: (e: { target: { value: string | number } }) => any;
}

const RadioButtonGroup: React.FC<IProps> = ({ items, name, onChange }) => {
  return (
    <>
      {items.map((item) => (
        <RadioButton
          name={name}
          key={item.key}
          onClick={() =>
            onChange && item.key && onChange({ target: { value: item.key } })
          }
        >
          {item.name}
        </RadioButton>
      ))}
    </>
  );
};

export default RadioButtonGroup;
