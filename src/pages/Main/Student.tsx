import React, { useState, useEffect } from 'react';
import css from '@emotion/css';
import Skeleton from 'react-loading-skeleton';

import {
  CardGroupHeader,
  Col,
  Divider,
  PageWrapper,
  ResponsiveWrapper,
  TextCardGroup,
  TimeTable,
  NoData,
  TextCard,
} from '../../components';
import { useMyData } from '../../hooks/api/useMyData';
import { Doc, Notice } from '../../constants/types';
import { getCurrentNotices, getTimetable } from '../../api';
import { SelfStudyStatus } from './SelfStudyStatus';
import { isStudent as letUserStudent } from '../../utils/isStudent';
import { TodayMealCard } from './TodayMealCard';

const Main: React.FC = () => {
  const [notice, setNotice] = useState<Doc<Notice>[]>();
  const [timetableData, setTimeTableData] = useState<string[][] | null>();

  const myData = useMyData();

  useEffect(() => {
    if (myData && letUserStudent(myData)) {
      getCurrentNotices().then((notices) => setNotice(() => [...notices.filter(e => e.targetGrade.includes(myData.grade))].reverse()));
      getTimetable(myData.grade, myData.class)
        .then((table) =>
          setTimeTableData(() => table.map((day) => day.sequence)),
        )
        .catch(() => setTimeTableData(() => null));
    } else {
      getCurrentNotices().then((notices) => setNotice(() => [...notices].reverse()))
    }
  }, [myData]);

  return (
    <>
      <PageWrapper>
        <ResponsiveWrapper threshold={960}>
          <Col width={5}>
            <CardGroupHeader
              withBubble
              subButton={{
                text: '더보기',
                route: '/notices',
              }}
            >
              공지사항
            </CardGroupHeader>
            {notice && notice.length !== 0 ? (
              <TextCardGroup
                content={[
                  ...notice.slice(0, 2).map((e) => ({
                    text: e.title,
                    leftBorder: true,
                    clickable: true,
                    to: `/notices/${e.user_id}`,
                  })),
                  ...(notice.length > 2
                    ? [
                        {
                          text: `외 ${
                            notice.length - 2
                          }건의 공지사항이 있습니다`,
                          to: '/notices',
                          clickable: true,
                        },
                      ]
                    : []),
                ]}
                spaceBetweenCards
              />
            ) : notice === undefined ? (
              <TextCardGroup
                spaceBetweenCards
                content={[
                  {
                    text: <Skeleton count={3} />,
                    key: 'LOADER3',
                  },
                  {
                    text: <Skeleton count={2} />,
                    key: 'LOADER2',
                  },
                ]}
              />
            ) : (
              <TextCardGroup
                content={[{ text: <NoData>공지사항이 없습니다</NoData> }]}
              />
            )}
          </Col>
          <Divider data-divider />

          <Col width={5}>
            <CardGroupHeader
              subButton={{
                text: '우리반 현황',
                route: '/selfstudydisplay',
              }}
            >
              자습 현황
            </CardGroupHeader>
            <SelfStudyStatus />
          </Col>
        </ResponsiveWrapper>
        <>
          <Divider data-divider horizontal />
          <ResponsiveWrapper
            threshold={1200}
            css={css`
              flex: 1;
            `}
          >
            <Col width={3} css={fullHeight}>
              <CardGroupHeader>시간표</CardGroupHeader>
              {timetableData !== null ? (
                <TimeTable timetable={timetableData} />
              ) : (
                <TextCardGroup
                  content={[
                    { text: <NoData>시간표 데이터가 없습니다</NoData> },
                  ]}
                />
              )}
            </Col>
            <Divider data-divider />
            <Col width={3}>
              <CardGroupHeader>나의 신청현황</CardGroupHeader>
              {/*
              
              # 나의 신청현황 부분. 추후 관련 API가 구현되면 반영 해주세요!
              {appliments ? (
                appliments.map((myToday) => (
                  <ApplimentStatus key={myToday.name} {...myToday} />
                ))
              ) : (
                <TextCardGroup content={[{ text:  }]} />
              )

              */}
              <TextCard
                css={css`
                  flex: 1;
                  display: flex;
                  margin-top: 0px;
                `}
              >
                <NoData>신청 현황이 없습니다</NoData>
              </TextCard>
            </Col>
            <Divider data-divider />
            <Col width={4} css={fullHeight}>
              <TodayMealCard />
            </Col>
          </ResponsiveWrapper>
        </>
      </PageWrapper>
    </>
  );
};

const fullHeight = css`
  display: flex;
  flex-direction: column;
`;

export default Main;
