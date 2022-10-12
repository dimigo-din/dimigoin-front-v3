import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';

import {
  CardGroupHeader,
  Col,
  Divider,
  PageWrapper,
  ResponsiveWrapper,
  TextCardGroup,
  NoData,
} from '../../components';
import { useMyData } from '../../hooks/api/useMyData';
import { Doc, Notice } from '../../constants/types';
import { getCurrentNotices } from '../../api';
import { TodayMealCard } from './TodayMealCard';

const EducationlTeacherMain: React.FC = () => {
  const [notice, setNotice] = useState<Doc<Notice>[]>();

  const myData = useMyData();

  useEffect(() => {
    getCurrentNotices().then((notices) => setNotice(() => notices));
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
            <TodayMealCard />
          </Col>
        </ResponsiveWrapper>
      </PageWrapper>
    </>
  );
};

export default EducationlTeacherMain;
