import css from '@emotion/css'
import React, { useCallback, useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { getRequestableMentoringList, applyMentoring as _applyMentoring } from '../../api/mentoring'
import {
    Button, Card, CardGroupHeader, Col, Data, Divider,
    HeadData, HeadRow, Horizontal, NoData, PageWrapper, ResponsiveWrapper, Row, Table
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
        _applyMentoring(mentoringSchedule._id, mentoringSchedule.date)
    }, [])

    return <>
        <PageWrapper>
            <CardGroupHeader>
                신청하기
            </CardGroupHeader>
            <Table css={css`width: 100%;`}>
                <HeadRow>
                    {/* <HeadData>상태</HeadData> */}
                    <HeadData>선생님</HeadData>
                    <HeadData>과목</HeadData>
                    <HeadData>날짜</HeadData>
                    <HeadData>시간</HeadData>
                    {/* <HeadData>장소</HeadData> */}
                    <HeadData>신청</HeadData>
                </HeadRow>
                {mentoringSchedules ? mentoringSchedules.length ? mentoringSchedules.map((mentoringSchedule: Doc<MentoringSchedule>) => <Row
                >
                    <Data>{mentoringSchedule.teacher.name}</Data>
                    <Data>{mentoringSchedule.subject}</Data>
                    <Data>{mentoringSchedule.date}</Data>
                    <Data>
                        {mentoringSchedule.duration.start.hour}시 {mentoringSchedule.duration.start.minute}분 ~
                        {mentoringSchedule.duration.end.minute}시 {mentoringSchedule.duration.end.minute}분
                    </Data>
                    <Data>
                        <Button
                            css={css`
                                        padding: 8px 12px;
                                        border-radius: 16px;
                                    `}
                            onClick={() => applyMentoring(mentoringSchedule)}
                        >신청하기</Button>
                    </Data>
                </Row>) : <Row>
                        <Data colSpan={5}>
                            <NoData> 개설된 강의가 없습니다 </NoData>
                        </Data>
                    </Row> : <>
                        <Row>
                            <Data><Skeleton width={30} /></Data>
                            <Data><Skeleton width={30} /></Data>
                            <Data><Skeleton width={30} /></Data>
                            <Data><Skeleton width={30} /></Data>
                            <Data><Skeleton width={30} /></Data>
                        </Row>
                        <Row>
                            <Data><Skeleton width={30} /></Data>
                            <Data><Skeleton width={30} /></Data>
                            <Data><Skeleton width={30} /></Data>
                            <Data><Skeleton width={30} /></Data>
                            <Data><Skeleton width={30} /></Data>
                        </Row>
                        <Row>
                            <Data><Skeleton width={30} /></Data>
                            <Data><Skeleton width={30} /></Data>
                            <Data><Skeleton width={30} /></Data>
                            <Data><Skeleton width={30} /></Data>
                            <Data><Skeleton width={30} /></Data>
                        </Row>
                        <Row>
                            <Data><Skeleton width={30} /></Data>
                            <Data><Skeleton width={30} /></Data>
                            <Data><Skeleton width={30} /></Data>
                            <Data><Skeleton width={30} /></Data>
                            <Data><Skeleton width={30} /></Data>
                        </Row>
                    </>}
            </Table>
        </PageWrapper>
    </>
}

export default Student