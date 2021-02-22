import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { getTimelineByStudent } from '../../api';
import { getPlaceById } from '../../api/place';
import { Card } from '../../components';
import { Student } from '../../constants/types';

interface TimelineRow {
    subject: JSX.Element;
    target?: string;
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
                const thisPlace = await getPlaceById(row.place)
                const parsedTime = new Date(row.createdAt)
                const formattedTime = `${parsedTime.getHours().toString().padStart(2, '0')}:${parsedTime.getMinutes().toString().padStart(2, '0')}`
                console.log(parsedTime)
                return ({
                    subject: <Accent>{row.updatedBy?.name}</Accent> || student.name,
                    to: thisPlace?.name || "알수없는장소",
                    time: formattedTime,
                    id: row._id,
                    remark: row.remark,
                })
            }))

            setTimelineData(() => [...parsedTimeline].reverse())
        })()
    }, [student, close])

    return <Wrapper>
        {timelineData?.map((timelineRow, index) => <Timerow key={timelineRow.id}>
            <Time>[ {timelineRow.time} ]</Time> &nbsp;
            {timelineRow.subject}님이&nbsp;
            {timelineRow.target ? timelineRow.target + "님" : "본인"}의 위치를&nbsp;
            <Accent>{timelineRow.to}</Accent>로 변경했습니다. {timelineRow.remark && <>(사유 : {timelineRow.remark})</>}
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