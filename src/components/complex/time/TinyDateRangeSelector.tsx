import css from '@emotion/css';
import styled from '@emotion/styled';
import React, { useCallback, useEffect, useState } from 'react';
import { MonthCalendar } from './MonthCalendar';

interface Position {
  position: number | undefined;
  type: 'top' | 'bottom';
}

export const useTinyDateRangeSelector = (
  initDate?: Date[],
): {
  element: JSX.Element;
  dates?: Date[];
} => {
  const [yPosition, setYPosition] = useState<Position>();
  const [dates, setDates] = useState<Date[] | undefined>(initDate);

  useEffect(() => setYPosition(() => undefined), [dates]);

  const toggleOpened = useCallback(
    (e: { target: EventTarget }) => {
      if (yPosition) {
        setYPosition(() => undefined);
        return;
      }
      if (!(e.target instanceof HTMLElement)) return;
      const target = e.target;
      const renderedRect = target.getBoundingClientRect();

      if (renderedRect.bottom < window.innerHeight - 400)
        setYPosition({
          position: renderedRect.bottom,
          type: 'top',
        });
      else
        setYPosition({
          position: window.innerHeight - renderedRect.top + 15,
          type: 'bottom',
        });
    },
    [setYPosition, yPosition],
  );

  const applyChangedDate = useCallback(
    (selectedDates) => {
      setDates(() => selectedDates);
    },
    [setDates],
  );

  const openA18yInput = useCallback(
    (e: { target: EventTarget; key: string }) => {
      if (['Enter', 'Space'].includes(e.key)) {
        toggleOpened(e);
      }
    },
    [toggleOpened],
  );

  return {
    dates,
    element: (
      <span>
        <InputForAccessability
          onKeyPress={openA18yInput}
          aria-label="게시일을 선택해주세요"
        />
        <Wrapper onClick={toggleOpened}>
          {dates ? (
            <>
              {dates[0].toLocaleDateString()} ~ {dates[1].toLocaleDateString()}
            </>
          ) : (
            '날짜를 선택해주세요'
          )}
        </Wrapper>
        {yPosition && (
          <Calendar
            minDate={new Date()}
            y={yPosition}
            selectRange
            value={dates}
            onChange={applyChangedDate}
          />
        )}
      </span>
    ),
  };
};

const InputForAccessability = styled.input`
  opacity: 0;
  width: 0px;
  &:focus + span {
    color: var(--main-theme-accent);
    font-weight: 700;
  }
`;

const Wrapper = styled.span`
  font-size: 20px;
  color: #8a8a8a;
  text-decoration: underline;
  cursor: pointer;
`;

const Calendar = styled(MonthCalendar)<{ y?: Position }>`
  position: absolute;
  background-color: #fff;
  ${({ y }) =>
    y &&
    css`
      ${y.type}: ${y.position}px;
    `}
`;
