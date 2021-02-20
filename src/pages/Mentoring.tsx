import css from '@emotion/css'
import React, { useEffect, useState } from 'react'
import {
    Button, Card, CardGroupHeader, Col, Data, Divider,
    HeadData, HeadRow, Horizontal, PageWrapper, Row, Table
} from '../components'
import makeAlert from '../functions/makeAlert'

interface MentoringSchedule {
    state: |"RECRUITING"|"COMPLETE";
    teacher: string;
    subject: string;
    time: [Date, Date];
    location: string;
    _id: string;
}

const getMentoringSchedules = async (): Promise<MentoringSchedule[]> => [{
    state: "RECRUITING",
    teacher: "이효현 선생님",
    subject: "수학",
    time: [new Date(), new Date()],
    _id: "101011",
    location: "학봉관 2층"
}, {
    state: "COMPLETE",
    teacher: "삼효현 선생님",
    subject: "국사",
    time: [new Date(), new Date()],
    _id: "101012",
    location: "학봉관 3층"
}]

const Mentoring: React.FC = () => {
    const [mentoringSchedules, setMentoringSchedules] = useState<MentoringSchedule[] | null>();
    useEffect(() => {
        getMentoringSchedules().then(setMentoringSchedules).catch(() => {
            makeAlert.error("멘토링 일정 정보를 불러오는데 실패했습니다.")
            setMentoringSchedules(null)
        })
    }, []);
    return <>
            <PageWrapper>
                <Horizontal>
                    <Col width={3}>
                        <CardGroupHeader>
                            멘토링
                        </CardGroupHeader>
                        <Card leftBorder>
                            멘토링은 웅앵
                        </Card>
                    </Col>
                    <Divider />
                    <Col width={7}>
                        <CardGroupHeader>
                            신청하기
                        </CardGroupHeader>
                        <Table>
                            <HeadRow>
                                <HeadData>상태</HeadData>
                                <HeadData>선생님</HeadData>
                                <HeadData>과목</HeadData>
                                <HeadData>날짜</HeadData>
                                <HeadData>시간</HeadData>
                                <HeadData>장소</HeadData>
                                <HeadData>신청</HeadData>
                            </HeadRow>
                            {mentoringSchedules?.map((mentoringSchedule) => <Row css={mentoringSchedule.state === "COMPLETE"&& css`
                                & > td {
                                    text-decoration: line-through;
                                    color: #D1D1D1;
                                }
                            `}>
                                <Data>{{
                                    RECRUITING: "모집중",
                                    COMPLETE: "마감됨"
                                }[mentoringSchedule.state]}</Data>
                                <Data>{mentoringSchedule.teacher}</Data>
                                <Data>{mentoringSchedule.subject}</Data>
                                <Data>{(start => `${start.getMonth() + 1}월 ${start.getDate()}일`)(mentoringSchedule.time[0])}</Data>
                                <Data>{mentoringSchedule.time[0].getHours()}시 {mentoringSchedule.time[0].getMinutes()}분 ~
                                {mentoringSchedule.time[1].getHours()}시 {mentoringSchedule.time[1].getMinutes()}분</Data>
                                <Data>{mentoringSchedule.location}</Data>
                                <Data>
                                    <Button css={css`
                                        padding: 8px 12px;
                                        border-radius: 16px;
                                        ${mentoringSchedule.state === "COMPLETE" && css`
                                            text-decoration: none;
                                            background-color: #E6E6E6;
                                        `}
                                    `}>신청하기</Button>
                                </Data>
                            </Row>)}
                        </Table>
                    </Col>
                </Horizontal>
            </PageWrapper>
    </>
}

export default Mentoring