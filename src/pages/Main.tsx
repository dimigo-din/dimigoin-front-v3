import React, { useState, useEffect } from "react";
import css from "@emotion/css";

import {  ApplimentStatus, CardGroupHeader, Col, Divider, Meal,
          MealList, NavigationBar, PageWrapper, ResponsiveWrapper,
          SelfStudyStatus, showModal, showCardModal, TextCardGroup, TimeTable,
          TodayMeal } from "../components";

const Main: React.FC = () => {
  const [notice, setNotice] = useState<string[]>();
  const [myTodays, setMyTodays] = useState<ApplimentStatus[]>();
  const [meals, setMeals] = useState<Meal[]>();
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
      <PageWrapper>
        <ResponsiveWrapper threshold={960}>
          <Col width={5}>
            <CardGroupHeader
              withBubble
              subButton={{
                text: "더보기",
                route: '/notices'
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
          <Divider data-divider />
          <Col width={5}>
            <CardGroupHeader>자습 현황</CardGroupHeader>
            <SelfStudyStatus onButtonPressed={(d) => {
              showCardModal(() => <h1>{d}</h1>)
            }} />
          </Col>
        </ResponsiveWrapper>
        <Divider data-divider horizontal />
        <ResponsiveWrapper threshold={1200}>
          <Col width={3} css={fullHeight}>
            <CardGroupHeader>시간표</CardGroupHeader>
            <TimeTable />
          </Col>
          <Divider data-divider />
          <Col width={3}>
            <CardGroupHeader>나의 신청현황</CardGroupHeader>
            {myTodays ? (
              myTodays.map((myToday) => (
                <ApplimentStatus key={myToday.name} {...myToday} />
              ))
            ) : (
                <TextCardGroup content={[{ text: "신청 현황이 없습니다" }]} />
              )}
          </Col>
          <Divider data-divider />
          <Col width={4} css={fullHeight}>
            <CardGroupHeader
              subButton={{
                text: "더보기",
                action: () => showModal((close) => <MealList goBack={close} />, {
                  wrapperProps: {
                    css: css`
                      max-width: 1600px;
                      padding: 60px 20px 20px;
                      @media screen and (max-width: 960px) {
                        padding-top: 40px;
                      }
                    `
                  }
                })
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
      </PageWrapper>
    </>
  );
};


const fullHeight = css`
  display: flex;
  flex-direction: column;
`;

export default Main;
