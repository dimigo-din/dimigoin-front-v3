import css from '@emotion/css';
import styled from '@emotion/styled';
import React from 'react';
import { days, SMALL_SCREEN_THRESHOLD } from '../../constants';
import { EventFunction } from '../../hooks/useInput';

export const WeekDaySelector: React.FC<{
  onChange: EventFunction<number | null>;
  value?: number | null;
  customLabel?: string[];
}> = ({ value, onChange, ...props }) => {
  return (
    <Wrapper {...props}>
      <Segment
        selected={value === null}
        onClick={() =>
          onChange({
            target: {
              value: null,
            },
          })
        }
      >
        전체
      </Segment>
      {(props.customLabel || days).slice(0, -1).map((e, i) => (
        <Segment
          key={e}
          selected={i === value}
          onClick={() =>
            onChange({
              target: {
                value: i,
              },
            })
          }
        >
          {' '}
          {e}{' '}
        </Segment>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    flex-direction: row;
  }
`;

const Segment = styled.div<{ selected: boolean }>`
  width: 60px;
  box-sizing: border-box;
  flex: 1;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  color: #8b8b8b;
  font-weight: 700;
  transition: 300ms cubic-bezier(0, 0.76, 0.12, 0.98);
  background-color: #fff;
  box-shadow: outset 0 0 20px 0 rgba(0, 0, 0, 0.03);
  border-radius: 5px;
  text-align: center;
  div + & {
    margin-top: 15px;
  }
  ${({ selected }) =>
    selected &&
    css`
      box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.03),
        inset 0px 0px 0px 2px var(--main-theme-accent);
      color: var(--main-theme-accent);
      font-weight: 800;
    `}
  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    font-size: 14px;
    div + & {
      margin-top: 0px;
      margin-left: 15px;
    }
  }
`;
