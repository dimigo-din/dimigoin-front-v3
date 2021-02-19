import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { getTimelineByStudent } from '../../api';
import { getPlaceById } from '../../api/place';
import { Card } from '../../components';
import { BriefStudent, Student } from '../../constants/types';

async function getUserClass(): Promise<[number, number]> {
    return [1, 3]
}

interface TimelineRow {
    subject: string;
    target?: string;
    from?: string;
    to: string;
    time: string;
    id: string;
}

export const Timeline: React.FC<{ student: Student; close(): void }> = ({ student, close }) => {
    const [timelineData, setTimelineData] = useState<TimelineRow[]>();

    useEffect(() => {
        (async () => {
            const fetchedTimelineData = await getTimelineByStudent(student._id)
            if(fetchedTimelineData.length === 0) {
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
                    subject: student.name,
                    to: thisPlace?.name || "알수없는장소",
                    time: formattedTime,
                    id: row._id
                })
            }))

            setTimelineData(() => parsedTimeline)
        })()
    }, [ student, close ])

    return <Wrapper>
        {timelineData?.map(timelineRow => <Timerow key={timelineRow.id}>
            <Time>[ {timelineRow.time} ]</Time> &nbsp;
            {timelineRow.subject}님이&nbsp;
            {timelineRow.target ? timelineRow.target + "님" : "본인"}의 현황을&nbsp;
            {timelineRow.from ? <><Accent>{timelineRow.from}</Accent>에서 <Accent>{timelineRow.to}</Accent>로 옮겼습니다.</> : <><Accent>{timelineRow.to}</Accent>로 변경했습니다</>}
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