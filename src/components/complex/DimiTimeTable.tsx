import React from "react";
import styled from "@emotion/styled";
import Card from "../basic/DimiCard";
import css from "@emotion/css";
import { days } from "../../constants";

const today = 2;

interface IProps {
  className?: string;
}

// 예시: 1-3
// 이야기해봐야 할것: 시간표 표시 형식
const TABLE = [
  ["미술", "진로", "플밍A", "플밍A", "미술"],
  ["미술", "과학", "컴시", "수학", "과학"],
  ["수학", "사회", "사회", "체육", "영어"],
  ["국어", "컴시", "플밍B", "영어", "국어"],
  ["플밍A", "체육", "플밍B", "과학", "수학"],
  ["플밍A", "동아리", "영어", "국어", "플밍B"],
  ["컴시", "동아리", " ", "HR", "사회"],
];

const TimeTable: React.FC<IProps> = ({ ...props }) => {
  return (
    <WrapperCard {...props}>
      <div
        css={css`
          padding: 0px 24px 0px;
          height: 100%;
          @media screen and (max-width: 450px) {
            padding: 0px 12px 0px;
          }
        `}
      >
        <table
          css={css`
            width: 100%;
            height: 100%;
          `}
        >
          <DaysHeader>
            <tr>
              {days.map((day, index) => (
                <Day key={day} colored={today === index}>
                  {day}
                </Day>
              ))}
            </tr>
          </DaysHeader>
          <ContentWrapper>

            {/* 서버에서 어떤 응답을 줄지 몰라서 일단은 이렇게 하드코딩으로 박아놓았습니다.
            추후에 수정해주세요! */}

            {TABLE.map((day) => (
              <Row key={day.join("")}>
                {day.map(
                  (item, index) =>
                    item && (
                      <Item key={`${index}${item}`} colored={today === index}>
                        {item}
                      </Item>
                    )
                )}
              </Row>
            ))}
          </ContentWrapper>
        </table>
      </div>
    </WrapperCard>
  );
};

const WrapperCard = styled(Card)`
  color: #d1d1d1;
  font-family: NanumSquare;
  padding: 0px;
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
