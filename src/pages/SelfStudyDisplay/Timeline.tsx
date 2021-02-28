import css from '@emotion/css';
import styled from '@emotion/styled';
import { getAdverbalSuffix1 } from 'josa-complete';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { getTimelineByStudent } from '../../api';
import { Card, CardGroupHeader } from '../../components';
import { Student } from '../../constants/types';

interface TimelineRow {
    subject?: string;
    target: string;
    from?: string;
    to: string;
    time: string;
    id: string;
    remark?: string;
}

export const Timeline: React.FC<{ student: Student; close(): void }> = ({ student, close }) => {
    const [timelineData, setTimelineData] = useState<TimelineRow[]>();

    useEffect(() => {
        (async () => {
            const fetchedTimelineData = await getTimelineByStudent(student._id)
            if (fetchedTimelineData.length === 0) {
                toast.info("위치 이동 기록이 없습니다")
                close()
                return
            }
            const parsedTimeline = await Promise.all(fetchedTimelineData.map(async row => {
                const parsedTime = new Date(row.createdAt)

                const formattedTime = `${parsedTime.getHours().toString().padStart(2, '0')}:${parsedTime.getMinutes().toString().padStart(2, '0')}`
                return ({
                    subject: row.updatedBy?.name,
                    to: row.place.name,
                    time: formattedTime,
                    id: row._id,
                    remark: row.remark,
                    target: student.name
                })
            }))

            setTimelineData(() => [...parsedTimeline].reverse())
        })()
    }, [student, close])

    return <Wrapper>
        <CardGroupHeader css={css`margin-bottom: 24px;`}>
            {student.name}님의 히스토리
        </CardGroupHeader>
        {timelineData?.map((timelineRow) => <Timerow key={timelineRow.id}>
            <Time>[ {timelineRow.time} ]</Time> &nbsp;
            {
                timelineRow.subject ? <>
                    <Accent>{timelineRow.subject}</Accent>님이&nbsp;
                    {timelineRow.target}님의 위치를
                    
                </> : <>
                    본인의 위치를
                </>
            }&nbsp;
            <Accent>{timelineRow.to}</Accent>{getAdverbalSuffix1(timelineRow.to)} 변경했습니다.
            {timelineRow.remark && <>(사유 : {timelineRow.remark})</>} 
            {/* {timelineRow.subject}님이&nbsp;
            {timelineRow.target ? timelineRow.target + "님" : "본인"}의 위치를&nbsp;
            <Accent>{timelineRow.to}</Accent>로 변경했습니다. {timelineRow.remark && <>(사유 : {timelineRow.remark})</>} */}
        </Timerow>)}
    </Wrapper>
}

const Timerow = styled.p`
    font-size: 22px;
    color: #9A9A9A;
    line-height: 32px;
    &+& {
        margin-top: 24px;
    }
`

const Time = styled.time`
    color: #E6E6E6;
`

const Accent = styled.span`
    color: var(--main-theme-accent);
    font-weight: 900;
`

const Wrapper = styled(Card)`
    height: 50vh;
    overflow-y: scroll;
`