import css from '@emotion/css'
import React, { useCallback, useEffect, useState } from 'react'
import { getRequestableMentoringList, applyMentoring as _applyMentoring } from '../../api/mentoring'
import {
    Button, Card, CardGroupHeader, Col, Data, Divider,
    HeadData, HeadRow, Horizontal, PageWrapper, Row, Table
} from '../../components'
import { Doc, Mentoring, MentoringApplication, MentoringSchedule } from '../../constants/types'
import makeAlert from '../../functions/makeAlert'

const Student: React.FC = () => {
    const [mentoringSchedules, setMentoringSchedules] = useState<Doc<MentoringSchedule>[] | null>();
    
    useEffect(() => {
        getRequestableMentoringList()
            .then(setMentoringSchedules)
            .catch(() =>
                setMentoringSchedules(null)
            )
    }, []);

    const applyMentoring = useCallback((mentoringSchedule: Doc<MentoringSchedule>) => {
        _applyMentoring(mentoringSchedule._id,mentoringSchedule.date)
    }, [])

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
                            {/* <HeadData>상태</HeadData> */}
                            <HeadData>선생님</HeadData>
                            <HeadData>과목</HeadData>
                            <HeadData>날짜</HeadData>
                            <HeadData>시간</HeadData>
                            {/* <HeadData>장소</HeadData> */}
                            <HeadData>신청</HeadData>
                        </HeadRow>
                        {mentoringSchedules?.map((mentoringSchedule: Doc<MentoringSchedule>) => <Row
                        // css={mentoringSchedule.state === "COMPLETE" && css`
                        //     & > td {
                        //         text-decoration: line-through;
                        //         color: #D1D1D1;
                        //     }
                        // `}
                        >
                            {/* <Data>{{
                                RECRUITING: "모집중",
                                COMPLETE: "마감됨"
                            }[mentoringSchedule.state]}</Data> */}
                            <Data>{mentoringSchedule.teacher.name}</Data>
                            <Data>{mentoringSchedule.subject}</Data>
                            <Data>{mentoringSchedule.date}</Data>
                            <Data>{mentoringSchedule.duration.start.hour}시 {mentoringSchedule.duration.start.minute}분 ~
                                {mentoringSchedule.duration.end.minute}시 {mentoringSchedule.duration.end.minute}분</Data>
                            {/* <Data>{mentoringSchedule.}</Data> */}
                            <Data>
                                <Button
                                    css={css`
                                        padding: 8px 12px;
                                        border-radius: 16px;
                                    `}
                                    onClick={() => applyMentoring(mentoringSchedule)}
                                >신청하기</Button>
                            </Data>
                        </Row>)}
                    </Table>
                </Col>
            </Horizontal>
        </PageWrapper>
    </>
}

/* ${mentoringSchedule.state === "COMPLETE" && css`
                                            text-decoration: none;
                                            background-color: #E6E6E6;
                                        `} */

export default Student