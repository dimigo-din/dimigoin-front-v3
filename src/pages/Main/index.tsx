import React, { useState, useEffect } from "react";
import css from "@emotion/css";
import Skeleton from "react-loading-skeleton";

import {
    CardGroupHeader, Col, Divider, MealList,
    PageWrapper, ResponsiveWrapper, showModal,
    TextCardGroup, TimeTable, TodayMeal, NoData
} from "../../components";
import { useMeal } from "../../hooks/api";
import { useMyData } from "../../hooks/api/useMyData";
import { Doc, Notice, UserType } from "../../constants/types";
import { getCurrentNotices, getTimetable } from "../../api";
import { SelfStudyStatus } from "./SelfStudyStatus";

const TodayMealCard: React.FC = () => {
    const meals = useMeal()
    return (
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
            <TodayMeal meals={meals} />
        </Col>
    )
}

const Main: React.FC = () => {
    const [notice, setNotice] = useState<Doc<Notice>[]>();
    const [timetableData, setTimeTableData] = useState<string[][] | null>();

    const myData = useMyData()


    const [isStudent, setIsStudent] = useState<boolean>(myData?.userType === UserType.S)

    useEffect(() => {
        getCurrentNotices().then(notices => setNotice(() => notices))
        if (myData) {
            getTimetable(myData.grade, myData.class)
                .then(table => setTimeTableData(() => table.map(day => day.sequence)))
                .catch(() => setTimeTableData(() => null))
        }
    }, [myData]);

    useEffect(() => {
        setIsStudent(() => myData?.userType === UserType.S)
    }, [myData])

    return (
        <>
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
                        {notice && notice.length !== 0 ? (
                            <TextCardGroup
                                content={[...notice.slice(0, 2).map((e) => ({
                                    text: e.content,
                                    leftBorder: true,
                                    clickable: true,
                                    to: `/notices/${e._id}`
                                })), ...(notice.length > 2 ? [{
                                    text: `외 ${notice.length - 2}건의 공지사항이 있습니다`,
                                    to: "/notices",
                                    clickable: true,
                                }] : [])]}
                                spaceBetweenCards
                            />
                        ) : notice === undefined ? (
                            <TextCardGroup
                                content={[{
                                    text: <Skeleton count={3} />,
                                    key: "LOADER3"
                                }, {
                                    text: <Skeleton count={2} />,
                                    key: "LOADER2"
                                }]}
                            />
                        ) : <TextCardGroup content={[{ text: <NoData>공지사항이 없습니다</NoData> }]} />}
                    </Col>
                    <Divider data-divider />
                    {
                        isStudent ?
                            <Col width={5}>
                                <CardGroupHeader subButton={{
                                    text: "우리반 현황 보기",
                                    route: "/selfstudydisplay"
                                }}>자습 현황</CardGroupHeader>
                                <SelfStudyStatus />
                            </Col>
                            : <TodayMealCard />
                    }
                </ResponsiveWrapper>
                {
                    isStudent && <>
                        <Divider data-divider horizontal />
                        <ResponsiveWrapper threshold={1200}>
                            <Col width={3} css={fullHeight}>
                                <CardGroupHeader>시간표</CardGroupHeader>
                                {timetableData !== null ? <TimeTable timetable={timetableData} /> : <TextCardGroup content={[{ text: <NoData>시간표 데이터가 없습니다</NoData> }]} />}
                            </Col>
                            <>
                                <Divider data-divider />
                                <Col width={3}>
                                    <CardGroupHeader>나의 신청현황</CardGroupHeader>
                                    {/* {appliments ? (
                                appliments.map((myToday) => (
                                    <ApplimentStatus key={myToday.name} {...myToday} />
                                ))
                            ) : ( */}
                                    <TextCardGroup content={[{ text: <NoData>신청 현황이 없습니다</NoData> }]} />
                                    {/* )} */}
                                </Col>
                            </>
                            <Divider data-divider />
                            <TodayMealCard />
                        </ResponsiveWrapper>

                    </>
                }
            </PageWrapper>
        </>
    );
};


const fullHeight = css`
  display: flex;
  flex-direction: column;
`;

export default Main;
