import React, { useEffect, useState } from "react";
import css from "@emotion/css";
import styled from "@emotion/styled";
import { EventFunction } from "../../hooks/useInput";

interface IProps {
  date?: Date;
  onChange?: EventFunction<Date>;
}

const WeekCalendar: React.FC<IProps> = ({ date, onChange }) => {
  const now = date || new Date();
  const days = new Array(7)
    .fill(0)
    .map((e, index) => +now + 86400000 * (index - now.getDay()))
    .map((e) => e - (e % 1000000));
  const [selectedDate, selectDate] = useState(+now - (+now % 1000000));
  useEffect(() => {
    if (!onChange) return;
    const date = new Date(selectedDate);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    onChange({
      target: {
        value: date,
      },
    });
  }, [ selectedDate, onChange ]);
  return (
    <Wrapper>
      <HeaderWrapper>
        <Header>7월 1주</Header>
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
      <DayWrapper>
        {days.map((timestamp) => {
          const date = new Date(timestamp);

          return (
            <Day
              key={timestamp}
              selected={selectedDate === timestamp}
              onClick={() => selectDate(timestamp)}
            >
              {date.getDate()}
            </Day>
          );
        })}
      </DayWrapper>
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

const DayWrapper = styled(DayHeaderWrapper)`
  margin: 0px auto;
`;

const Day = styled.div<{ selected: boolean }>`
  font-size: 20px;
  font-weight: 700;
  color: #8a8a8a;
  width: 24px;
  height: 24px;
  text-align: center;
  padding: 12px;
  line-height: 24px;
  background-color: white;
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

export default WeekCalendar;
