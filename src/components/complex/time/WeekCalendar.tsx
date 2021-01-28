import React, { useCallback, useEffect, useState } from "react";
import css from "@emotion/css";
import styled from "@emotion/styled";
import { EventFunction } from "../../../hooks/useInput";
import { getThisWeek } from "../../../utils";
import { ReactComponent as ArrowLeft } from "../../../assets/icons/arrow-left.svg"  
import { ReactComponent as ArrowRight } from "../../../assets/icons/arrow-right.svg"

interface WeekCalendarProps {
  date?: Date;
  onChange?: EventFunction<Date[]>;
  rangeSelect?: boolean;
}

export const WeekCalendar: React.FC<WeekCalendarProps> = ({ date, onChange, rangeSelect }) => {
  const [ pivotDate, setPivotDate ] = useState(date || new Date());
  const [ selectedPosition, setSelectingPosition ] = useState(0);
  const [ days ] = useState(new Array(7)
    .fill(0)
    .map((e, index) => +pivotDate + 86400000 * (index - pivotDate.getDay()))
    .map((e) => e - (e % 1000000)));
  
  const [selectedDates, setSelectDates] = useState<number[]>([+pivotDate - (+pivotDate % 1000000)]);
  const selectDate = (timestamp: number) => {
    if(!rangeSelect) {
      setSelectDates(() => [timestamp])
      return
    }
    if(selectedPosition === 0) setSelectDates(dates => [timestamp])
    else setSelectDates(dates => [dates[0], timestamp].sort())
  
    setSelectingPosition(position => position === 0 ? 1 : 0)
  }
  useEffect(() => {
    if (!onChange) return;
    const date = selectedDates.map(t => {
      const date = new Date(t)
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
      return date
    });
    onChange({
      target: {
        value: date,
      },
    });
  }, [ selectedDates, onChange ]);
  
  const showPrevWeek = useCallback(() => setPivotDate(date => new Date(+date - 604800000)), [])
  const showNextWeek = useCallback(() => setPivotDate(date => new Date(+date + 604800000)), [])
  return (
    <Wrapper>
      <HeaderWrapper>
        <ArrowLeft onClick={showPrevWeek} />
        <Header>{pivotDate.getMonth() + 1}월 {getThisWeek(pivotDate)}주</Header>
        <ArrowRight onClick={showNextWeek} />
      </HeaderWrapper>
      <BorderWrapper>
        <DayHeaderWrapper>
          <DayHeader
            css={css`
              color: #ff4a4a;
            `}
          >
            일
          </DayHeader>
          <DayHeader>월</DayHeader>
          <DayHeader>화</DayHeader>
          <DayHeader>수</DayHeader>
          <DayHeader>목</DayHeader>
          <DayHeader>금</DayHeader>
          <DayHeader
            css={css`
              color: var(--main-theme-accent);
            `}
          >
            토
          </DayHeader>
        </DayHeaderWrapper>
      </BorderWrapper>
      <WeekWrapper>
        {days.map((timestamp) => {
          const date = new Date(timestamp);
          const isBetween = selectedDates[0] < timestamp && timestamp < selectedDates[1]
          return (
            <DayWrapper
              isEnd={Boolean(selectedDates[0] && (selectedDates[1] === timestamp))}
              isStart={Boolean(selectedDates[1] && (selectedDates[0] === timestamp))}
              isBetween={isBetween}
            >
              <Day
                key={timestamp}
                selected={selectedDates.includes(timestamp)}
                rangeBetweed={isBetween}
                onClick={() => selectDate(timestamp)}
              >
                {date.getDate()}
              </Day>
            </DayWrapper>
          );
        })}
      </WeekWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-radius: 5px;
  border: solid 1px #e6e6e6;
  padding-top: 24px;
  background-color: white;
`;

const HeaderWrapper = styled.div`
  max-width: 150px;
  margin: 0px auto;
  padding-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Header = styled.div`
  font-size: 20px;
  color: #111111;
  font-weight: 900;
  text-align: center;
`;

const DayHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0px auto;
  padding: 12px;
`;

const DayHeader = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #8a8a8a;
  opacity: 0.55;
`;

const BorderWrapper = styled.div`
  border-top: solid 1px #e6e6e6;
  border-bottom: solid 1px #e6e6e6;
`;

const WeekWrapper = styled(DayHeaderWrapper)`
  margin: 0px auto;
`;

const Day = styled.div<{ selected: boolean; rangeBetweed: boolean; }>`
  font-size: 20px;
  font-weight: 700;
  color: #8a8a8a;
  width: 24px;
  height: 24px;
  text-align: center;
  padding: 12px;
  line-height: 24px;
  /* background-color: white; */
  transition: 300ms cubic-bezier(0, 0.75, 0.21, 1);
  border-radius: 15px;
  
  ${({ selected }) =>
    selected &&
    css`
      background-color: var(--main-theme-accent);
      color: white;
      border-radius: 24px;
    `}

    @media screen and (max-width: 500px) {
      padding: 3px;
      font-size: 16px;
    }
`;

const DayWrapper = styled.div<{isStart?: boolean; isEnd?: boolean; isBetween: boolean}>`
  transition: 300ms cubic-bezier(0, 0.75, 0.21, 1);
  ${({isBetween, isStart, isEnd}) => (isBetween || isStart || isEnd) && css`
    background-color: rgba(var(--main-theme-accent-rgb), 0.1);
  `}
  ${({isStart}) => isStart && css`
    border-top-left-radius: 24px;
    border-bottom-left-radius: 24px;
  `}
  ${({isEnd}) => isEnd && css`
    border-top-right-radius: 24px;
    border-bottom-right-radius: 24px;
  `}
`