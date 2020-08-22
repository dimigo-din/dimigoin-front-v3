import React from "react";
import styled from "@emotion/styled";

import NavigationBar from "../components/NavigationBar";
import CardGroupHeader from "../components/CardGroupHeader";
import TextCardGroup from "../components/TextCardGroup";
import TimeTable from "../components/dimiru/DimiTimeTable";
import { ResponsiveWrapper, Col, Divider } from "../components/grids/Cols";
import MyTodayCard from "../components/MyTodayCard";
import TodayMeal from "../components/TodayMeal";
import css from "@emotion/css";
import SelfStudyStatus from "../components/SelfStudyStatus";

const Main: React.FC = () => {
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
            <TextCardGroup
              content={[
                {
                  leftBorder: true,
                  text:
                    "방과 후 수강신청 중 너무 많은 동시 접속자로 인해 잠시 서버가 다운되는 문제가 있었으나 방금 전 복구되었습니다. 스포츠를 제외한 방과 후 신청은 새로 일정을 공지해드릴 예정입니다.",
                },
                {
                  leftBorder: true,
                  text: "디미고의 첫 온라인 입학설명회가 곧 시작합니다.",
                },
              ]}
              spaceBetweenCards
            />
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
            <MyTodayCard
              location="와동 체육관"
              time="1타임 ~ 2타임 배드민턴"
              name="방과후"
            />{" "}
            <MyTodayCard
              location="와동 체육관"
              time="1타임 ~ 2타임 배드민턴"
              name="방과후"
            />{" "}
            <MyTodayCard
              location="와동 체육관"
              time="1타임 ~ 2타임 배드민턴"
              name="방과후"
            />
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
            <TodayMeal
              meals={[
                {
                  menu:
                    "베이컨&소시지구이 | 치킨너겟 | 스트링치즈 | 잡곡밥 | 새우아욱국 | 모듬과일 | 포기김치 | 오이소박이 | 야채죽 | 시리얼 | 우유 또는 포도주스",
                  name: "아침",
                  selected: true,
                },
                {
                  menu:
                    "고추참치덮밥&계란후라이 | 우동장국 | 오지치즈후라이 | 숙주나물 | 총각김치 | 피크닉 | 석박지 | 콩나물무침 | 모듬과일 | 바이오거트",
                  name: "점심",
                },
                {
                  menu:
                    "알떡고기완자조림 | 쌀밥 | 닭개장 | 연두부&양념장 | 석박지 | 콩나물무침 | 모듬과일 | 바이오거트 | 미니크라상&딸기잼",
                  name: "저녁",
                },
              ]}
            />
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
