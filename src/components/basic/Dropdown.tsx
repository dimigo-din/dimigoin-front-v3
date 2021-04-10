import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import css from '@emotion/css';
import { EventFunction } from '../../hooks/useInput';
import { SMALL_SCREEN_THRESHOLD } from '../../constants';

export interface DropdownItem {
  name: string;
  key?: string;
}

interface DropdownProps {
  items?: DropdownItem[];
  placeholder: string;
  requireMessage?: string;
  onChange?: EventFunction<DropdownItem>;
  initIndex?: number;
}

export const Dropdown = ({
  items,
  placeholder,
  onChange,
  requireMessage,
  initIndex,
  ...props
}: DropdownProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [opened, setOpened] = useState(false);

  useEffect(
    () =>
      setSelectedIndex(() => (typeof initIndex === 'number' ? initIndex : -1)),
    [initIndex],
  );

  useEffect(() => {
    const outClickEvent = () => {
      opened && setOpened(() => false);
    };
    window.addEventListener('click', outClickEvent);
    return () => {
      window.removeEventListener('click', outClickEvent);
    };
  }, [opened]);

  const clickHandler = ({
    key,
    name,
    index,
  }: DropdownItem & { index: number }) => {
    setSelectedIndex(index - 1);
    onChange && onChange({ target: { value: { key, name } } });
  };
  return (
    <FixedHeightWrapper opened={opened} {...props}>
      <Wrapper
        highlighted={opened}
        opened={opened}
        onClick={() => items && setOpened((b) => !b)}
        disabled={!!items}
      >
        {items ? (
          [
            {
              name: placeholder,
              key: 'SELECTONE',
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
          ))
        ) : (
          <Item highlighted={false} visible>
            {placeholder}
          </Item>
        )}
      </Wrapper>
    </FixedHeightWrapper>
  );
};

const FixedHeightWrapper = styled.div<{ opened?: boolean }>`
  height: 56px;
  width: 10px; // 이거 왜되는지 모르겠습니다만 이거 넣으니까 정상적으로 잘 작동됩니다 왜 되는지 알려주세요 후배님
  ${({ opened }) =>
    opened &&
    css`
      position: relative;
      z-index: 10;
    `}
`;

const highlightedBorder = css`
  box-shadow: 0 0 6px 0 #f8c5d7;
  border-color: var(--main-theme-accent);
`;

const Wrapper = styled.div<{
  highlighted?: boolean;
  opened?: boolean;
  disabled?: boolean;
}>`
  border-radius: 6px;
  border: solid 1px #eeeeee;
  transition: 300ms cubic-bezier(0, 0.76, 0.12, 0.98);
  background-color: white;
  max-height: 400px;

  ${({ disabled }) =>
    disabled &&
    css`
      &:hover {
        ${highlightedBorder}
      }
    `}
  ${({ highlighted }) =>
    highlighted &&
    css`
      box-shadow: 0 0 6px 0 #f8c5d7;
    `}
  ${({ opened }) =>
    opened &&
    css`
      border-color: var(--main-theme-accent);
      overflow-y: auto;
    `}
`;

const Item = styled.div<{ highlighted?: boolean; visible?: boolean }>`
  color: #d1d1d1;
  padding: 20px 24px;
  font-size: 18px;
  text-overflow: ellipsis;
  overflow-x: hidden;
  white-space: nowrap;

  ${({ highlighted }) =>
    highlighted &&
    css`
      color: var(--main-theme-accent);
    `}

  /* Belows are property for animating */
  height: unset;
  visibility: visible;
  transition: padding 300ms cubic-bezier(0, 0.76, 0.12, 0.98),
    height 300ms cubic-bezier(0, 0.76, 0.12, 0.98);
  ${({ visible }) =>
    visible ||
    css`
      visibility: hidden;
      padding: 0px 24px;
      height: 0px;
    `}

  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    font-size: 14px;
  }
`;
