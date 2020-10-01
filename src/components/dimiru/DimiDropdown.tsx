import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import css from "@emotion/css";
import { EventFunction } from "../hooks/useInput";

export interface IDropdownItem {
  name: string;
  key?: string;
}
interface IProps {
  items: IDropdownItem[];
  placeholder: string;
  requireMessage?: string;
  onChange?: EventFunction<IDropdownItem>;
}

export default ({ items, placeholder, onChange, requireMessage }: IProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [opened, setOpened] = useState(false);
  const clickHandler = ({
    key,
    name,
    index,
  }: IDropdownItem & { index: number }) => {
    setSelectedIndex(index - 1);
    onChange && onChange({ target: { value: { key, name } } });
  };
  return (
    <FixedHeightWrapper opened={opened}>
      <Wrapper
        highlighted={opened}
        blueBorder={opened || selectedIndex !== -1}
        onClick={() => setOpened((b) => !b)}
      >
        {[
          {
            name: placeholder,
            key: "SELECTONE",
          },
          ...items,
        ].map(({ key, name }, index) => (
          <Item
            key={key}
            onClick={() => clickHandler({ key, name, index })}
            highlighted={selectedIndex !== -1 && selectedIndex === index - 1}
            visible={selectedIndex === index - 1 || opened}
          >
            {name}
          </Item>
        ))}
      </Wrapper>
    </FixedHeightWrapper>
  );
};

const FixedHeightWrapper = styled.div<{ opened?: boolean }>`
  height: 56px;
  ${({ opened }) =>
    opened &&
    css`
      position: relative;
      z-index: 10;
    `}
`;

const highlightedBorder = css`
  box-shadow: 0 0 3px 0 rgba(60, 112, 232, 0.45);
  border-color: var(--main-theme-accent);
`;

const Wrapper = styled.div<{ highlighted?: boolean; blueBorder?: boolean }>`
  /* padding: 18px 16px; */
  border-radius: 6px;
  border: solid 1px #8a8a8a;
  transition: 300ms cubic-bezier(0, 0.76, 0.12, 0.98);
  background-color: white;
  &:hover {
    ${highlightedBorder}
  }
  ${({ highlighted }) =>
    highlighted &&
    css`
      box-shadow: 0 0 3px 0 rgba(60, 112, 232, 0.45);
    `}
  ${({ blueBorder }) =>
    blueBorder &&
    css`
      border-color: var(--main-theme-accent);
    `}
`;

const Item = styled.div<{ highlighted?: boolean; visible?: boolean }>`
  color: #8a8a8a;
  padding: 18px 16px;
  font-size: 18px;

  ${({ highlighted }) =>
    highlighted &&
    css`
      color: var(--main-theme-accent);
    `}

  /* Belows are property for animating */
  height: unset;
  visibility: visible;
  transition: padding 300ms cubic-bezier(0, 0.76, 0.12, 0.98);
  ${({ visible }) =>
    visible ||
    css`
      visibility: hidden;
      padding: 0px 16px;
      height: 0px;
    `}
`;
