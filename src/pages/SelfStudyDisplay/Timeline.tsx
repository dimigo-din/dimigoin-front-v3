import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import { BriefStudent } from '../../constants/types';

async function getUserClass(): Promise<[number, number]> {
    return [1, 3]
}

interface TimelineRow {
    subject: BriefStudent;
    target?: BriefStudent;
    location: {
        from?: string;
        to: string;
    };
    date: Date;
    isNew: boolean;
}

async function getTimeline(classInfo: [number, number]): Promise<TimelineRow[]> {
    return [{
        subject: {
            name: "전형서",
            studentId: "2048"
        },
        location: {
            from: "화장실",
            to: "교실"
        },
        date: new Date(),
        isNew: false
    }, {
        subject: {
            name: "서주현",
            studentId: "2018"
        },
        target: {
            name: "현주서",
            studentId: "2021"
        },
        location: {
            to: "교실"
        },
        date: new Date('2021-01-08'),
        isNew: true
    }]
}

export const Timeline: React.FC = () => {
    const [timelineData, setTimelineData] = useState<TimelineRow[]>();

    useEffect(() => {
        (async () => {
            const fetchedTimelineData = await getTimeline(await getUserClass())
            setTimelineData(() => fetchedTimelineData)
        })()
    }, [])
    
    useEffect(() => console.log(timelineData), [ timelineData ])

    return <Wrapper>
        {timelineData?.map(timelineRow => <Timerow key={timelineRow.date.getMilliseconds().toString()}>
            <Time>[ {timelineRow.date.getHours().toString().padStart(2, '0')}:{timelineRow.date.getMinutes().toString().padStart(2, '0')} ]</Time> &nbsp;
            {timelineRow.subject.name}님({timelineRow.subject.studentId.slice(2)})이&nbsp;
            {timelineRow.target?.studentId ? <><Accent>{timelineRow.target.name}({timelineRow.target.studentId.slice(2)})</Accent>님</> : <Accent>본인</Accent>}의 현황을&nbsp;
            {timelineRow.location.from ? <><Accent>{timelineRow.location.from}</Accent>에서 <Accent>{timelineRow.location.to}</Accent>로 옮겼습니다.</> : <><Accent>{timelineRow.location.to}</Accent>로 등록했습니다</>}
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

const Wrapper = styled.div`
    height: 50vh;
    overflow-y: scroll;
`