import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

import NavigationBar from "../components/NavigationBar";
import CardGroupHeader from "../components/CardGroupHeader";
import TextCardGroup from "../components/TextCardGroup";
import TimeTable from "../components/dimiru/DimiTimeTable";
import { ResponsiveWrapper, Col, Divider } from "../components/grids/Cols";
import MyTodayCard, { IMyToday } from "../components/MyTodayCard";
import TodayMeal, { IMeal } from "../components/TodayMeal";
import css from "@emotion/css";
import SelfStudyStatus from "../components/SelfStudyStatus";

const Main: React.FC = () => {
  const [notice, setNotice] = useState<string[]>();
  const [myTodays, setMyTodays] = useState<IMyToday[]>();
  const [meals, setMeals] = useState<IMeal[]>();
  useEffect(() => {
    setNotice([
      "방과 후 수강신청 중 너무 많은 동시 접속자로 인해 잠시 서버가 다운되는 문제가 있었으나 방금 전 복구되었습니다. 스포츠를 제외한 방과 후 신청은 새로 일정을 공지해드릴 예정입니다.",
      "디미고의 첫 온라인 입학설명회가 곧 시작합니다.",
    ]);
    setMyTodays([
      {
        location: "와동체육관",
        name: "스포츠",
        time: "2타임 ~ 3타임 배드민턴",
      },
    ]);
    setMeals([
      {
        menu: "집가고싶을때하는밥",
        name: "간식",
        selected: true,
      },
    ]);
  }, []);
  return (
    <>
      <NavigationBar />
      <Container>
        <ResponsiveWrapper>
          <Col width={5}>
            <CardGroupHeader
              withBubble
              subButton={{
                text: "더보기",
              }}
            >
              공지사항
            </CardGroupHeader>
            {notice ? (
              <TextCardGroup
                content={notice.map((e) => ({ text: e, leftBorder: true }))}
                spaceBetweenCards
              />
            ) : (
              <TextCardGroup
                content={[{ text: "등록된 공지사항이 없습니다" }]}
              />
            )}
          </Col>
          <Divider />
          <Col width={5}>
            <CardGroupHeader>자습 현황</CardGroupHeader>
            <SelfStudyStatus />
          </Col>
        </ResponsiveWrapper>
        <Divider horizontal />
        <ResponsiveWrapper threshold={1200}>
          <Col width={3} css={fullHeight}>
            <CardGroupHeader>시간표</CardGroupHeader>
            <TimeTable />
          </Col>
          <Divider />
          <Col width={3}>
            <CardGroupHeader>나의 신청현황</CardGroupHeader>
            {myTodays ? (
              myTodays.map((myToday) => (
                <MyTodayCard key={myToday.name} {...myToday} />
              ))
            ) : (
              <TextCardGroup content={[{ text: "신청 현황이 없습니다" }]} />
            )}
          </Col>
          <Divider />
          <Col width={4} css={fullHeight}>
            <CardGroupHeader
              subButton={{
                text: "더보기",
              }}
            >
              오늘의 급식
            </CardGroupHeader>
            {meals ? (
              <TodayMeal meals={meals} />
            ) : (
              <TextCardGroup content={[{ text: "급식 정보가 없습니다" }]} />
            )}
          </Col>
        </ResponsiveWrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  max-width: 1560px;
  margin: 0 auto;
  width: 90%;
  padding-top: 70px;
`;

const fullHeight = css`
  display: flex;
  flex-direction: column;
`;

export default Main;

// const Container = styled(NaiveContainer)``;
