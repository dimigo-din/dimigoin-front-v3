import css from '@emotion/css'
import React, { useCallback, useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { toast } from 'react-toastify'
import { getRequestableMentoringList, applyMentoring as _applyMentoring, unApplyMentoring as _unApplyMentoring, getAppliedMentoring } from '../../api/mentoring'
import {
    Button, CardGroupHeader, Data, HeadData, HeadRow, NoData, PageWrapper, Row, Table
} from '../../components'
import { Doc, MentoringApplication, MentoringSchedule } from '../../constants/types'

const Student: React.FC = () => {
    const [mentoringSchedules, setMentoringSchedules] = useState<Doc<MentoringSchedule>[] | null>();
    const [appliedMentoring, setAppliedMentoring] = useState<Doc<MentoringApplication>[] | null>()

    const fetchData = useCallback(() => {
        getRequestableMentoringList()
            .then(setMentoringSchedules)
            .catch(() =>
                setMentoringSchedules(null)
            )
        getAppliedMentoring()
            .then(setAppliedMentoring)
            .catch(() => setAppliedMentoring(null))
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData]);

    const applyMentoring = useCallback((mentoringSchedule: Doc<MentoringSchedule>) => {
        _applyMentoring(mentoringSchedule._id, mentoringSchedule.date)
            .then(() => {
                toast.success(`${mentoringSchedule.name} 멘토링을 신청했어요`)
                fetchData()
            })
            .catch(() => toast.error("멘토링을 신청하지 못했어요"))
    }, [ fetchData ])

    const unapplyMentoring = useCallback((mentoringSchedule: Doc<MentoringSchedule>) => {
        _unApplyMentoring(mentoringSchedule._id, mentoringSchedule.date)
            .then(() => {
                toast.success(`멘토링 신청을 취소했어요`)
                fetchData()
            })
            .catch(() => toast.error("멘토링 신청을 취소하지 못했어요"))
    }, [ fetchData ])

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
                {mentoringSchedules ? mentoringSchedules.length ?
                    mentoringSchedules.map(mentoringSchedule => ({
                        ...mentoringSchedule,
                        application: appliedMentoring ? appliedMentoring.find(application =>
                            application.mentoring._id === mentoringSchedule._id
                            && application.date === mentoringSchedule.date
                        ) : undefined
                    }))
                        .map((mentoringSchedule: Doc<MentoringSchedule> & { application?: Doc<MentoringApplication> }) => <Row
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
                                    active={
                                        // 1. 다른사람이 신청했고
                                        (mentoringSchedule.applied &&
                                            // 2. 그게 나일때
                                            !!mentoringSchedule.application) ||
                                        //  1. 아무도 신청 안했을때
                                        (!mentoringSchedule.applied)
                                    }
                                    cancel={mentoringSchedule.applied && !!mentoringSchedule.application}
                                    css={css`
                                        padding: 8px 12px;
                                        border-radius: 16px;
                                    `}
                                    onClick={() => !!mentoringSchedule.application ?
                                        unapplyMentoring(mentoringSchedule)
                                        : applyMentoring(mentoringSchedule)}
                                >{mentoringSchedule.application ? "취소하기" : "신청하기"}</Button>
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