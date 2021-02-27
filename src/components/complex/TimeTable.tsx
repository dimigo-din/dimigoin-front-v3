import React, { useMemo } from "react";
import styled from "@emotion/styled";
import Card from "../basic/Card";
import css from "@emotion/css";
import { days } from "../../constants";
import Skeleton from "react-loading-skeleton";
import { NoData } from "..";

interface TimeTableProps {
  timetable?: string[][];
}

export const TimeTable: React.FC<TimeTableProps> = ({ timetable, ...props }) => {
  const today = useMemo(() => (new Date()).getDay() - 1, [])
  return (
    <WrapperCard {...props}>
      <table
        css={[css`width: 100%;`
          , timetable?.length && css`height: 100%;`]}
      >
        <DaysHeader>
          <tr>
            {days.slice(0, 5).map((day, index) => (
              <Day
                key={day}
                colored={!!timetable?.length && today === index}
                width="20%"
              >
                {day}
              </Day>
            ))}
          </tr>
        </DaysHeader>
        <ContentWrapper>
          {timetable ?
            timetable.length ? Array(7).fill([...Array(5)])
              .map((times, timeIndex) =>
                <Row>
                  {(times as undefined[]).map((_, dayIndex) => {
                    const subject = timetable[dayIndex]?.[timeIndex]
                    return <Item key={`${timeIndex}${dayIndex}`} colored={today === dayIndex}>
                      {subject && subject.length > 3 ? subject.slice(0, 2) + '...' : subject}
                    </Item>
                  })}
                </Row>
              ) : undefined
            : Array(7).fill(Array(5)).map(day => <Row>{day.fill((() => <Item><Skeleton /></Item>)())}</Row>)}
        </ContentWrapper>
      </table>
      {timetable?.length === 0 &&
        <NoData>시간표 정보가 없습니다</NoData>}
    </WrapperCard>
  );
};

const WrapperCard = styled(Card)`
  color: #d1d1d1;
  font-family: NanumSquare;
  /* padding: 0px; */
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0px 24px 0px;
  /* height: 100%; */
  @media screen and (max-width: 450px) {
    padding: 0px 12px 0px;
  }
`;

const DaysHeader = styled.thead`
  border-bottom: 1px solid #d1d1d1;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  padding: 0px 24px 0px;
  @media screen and (max-width: 450px) {
    font-size: 15px;
  }
`;

const Day = styled.td<{ colored?: boolean }>`
  padding: 24px 0px 18.5px;
  ${({ colored }) =>
    colored &&
    css`
      color: var(--main-theme-accent);
      background-color: var(--main-theme-accent-background);
      border-bottom: 3px solid var(--main-theme-accent);
      z-index: 10;
    `}
`;

const ContentWrapper = styled.tbody`
  width: 100%;
  & > tr:first-of-type td {
    padding-top: 19px;
  }
  & > tr:last-of-type td {
    padding-bottom: 26px;
  }
`;

const Row = styled.tr`
  text-align: center;
  font-size: 18px;
  flex: 1;

  @media screen and (max-width: 450px) {
    font-size: 15px;
  }
`;

const Item = styled.td<{ colored?: boolean }>`
  padding: 10px;
  word-break: keep-all;
  font-weight: 400;
  ${({ colored }) =>
    colored &&
    css`
      background-color: var(--main-theme-accent-background);
      color: black;
    `}

    @media screen and (max-width: 450px) {
      padding: 10px 6px;
    }
`;

export default TimeTable;
