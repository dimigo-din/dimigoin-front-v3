import css from '@emotion/css';
import styled from '@emotion/styled';
import { getAdverbalSuffix1 } from 'josa-complete';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getTimelineByClass, getTimelineByStudent } from '../../api';
import { Card, CardGroupHeader } from '../../components';
import { AttendanceLog, Doc, Student } from '../../constants/types';

interface TimelineRow {
  subject?: string;
  target: string;
  from?: string;
  to: string;
  time: string;
  id: string;
  remark?: string;
}

export const Timeline: React.FC<{
  title: string;
  timelineData?: TimelineRow[];
}> = ({ title, timelineData }) => {
  return (
    <Wrapper>
      <CardGroupHeader
        css={css`
          margin-bottom: 24px;
        `}
      >
        {title}
      </CardGroupHeader>
      {timelineData?.map((timelineRow) => (
        <Timerow key={timelineRow.id}>
          <Time>[ {timelineRow.time} ]</Time> &nbsp;
          {timelineRow.subject ? (
            <>
              자습도우미({timelineRow.subject})가&nbsp;
              {timelineRow.target}님의 위치를
            </>
          ) : (
            <>{timelineRow.target}님이 본인의 위치를</>
          )}
          &nbsp;
          <Accent>{timelineRow.to}</Accent>
          {getAdverbalSuffix1(timelineRow.to)} 변경했습니다
          {timelineRow.remark && <>(사유 : {timelineRow.remark})</>}
        </Timerow>
      ))}
    </Wrapper>
  );
};

const processAttendanceLogs = (
  timelineRowData: Doc<
    AttendanceLog & {
      place: string;
      student: string;
    }
  >[],
) =>
  timelineRowData.map((row) => {
    const parsedTime = new Date(row.createdAt);

    const formattedTime = `${parsedTime
      .getHours()
      .toString()
      .padStart(2, '0')}:${parsedTime
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
    return {
      subject: row.updatedBy?.name,
      to: row.place.name,
      time: formattedTime,
      id: row._id,
      remark: row.remark,
      target: row.student.name,
    };
  });

export const TimelineByStudent: React.FC<{
  student: Student;
  close(): void;
}> = ({ student, close }) => {
  const [timelineData, setTimelineData] = useState<TimelineRow[]>();

  useEffect(() => {
    (async () => {
      const fetchedTimelineData = await getTimelineByStudent(student._id);
      if (fetchedTimelineData.length === 0) {
        toast.info('위치 이동 기록이 없습니다');
        close();
        return;
      }
      const parsedTimeline = processAttendanceLogs(fetchedTimelineData);

      setTimelineData(() => parsedTimeline);
    })();
  }, [student, close]);

  return (
    <Timeline
      title={`${student.name}님의 히스토리`}
      timelineData={timelineData}
    />
  );
};

export const TimelineByClass: React.FC<{
  grade: number;
  clas: number;
  close(): void;
}> = ({ grade, clas, close }) => {
  const [timelineData, setTimelineData] = useState<TimelineRow[]>();

  useEffect(() => {
    (async () => {
      const fetchedTimelineData = await getTimelineByClass(grade, clas);
      if (fetchedTimelineData.length === 0) {
        toast.info('위치 이동 기록이 없습니다');
        close();
        return;
      }
      const parsedTimeline = processAttendanceLogs(fetchedTimelineData);

      setTimelineData(() => parsedTimeline);
    })();
  }, [grade, clas, close]);

  return (
    <Timeline
      title={`${grade}학년 ${clas}반의 히스토리`}
      timelineData={timelineData}
    />
  );
};

const Timerow = styled.p`
  font-size: 22px;
  color: #9a9a9a;
  line-height: 32px;
  & + & {
    margin-top: 24px;
  }
`;

const Time = styled.time`
  color: #e6e6e6;
`;

const Accent = styled.span`
  color: var(--main-theme-accent);
  font-weight: 900;
`;

const Wrapper = styled(Card)`
  height: 50vh;
  overflow-y: scroll;
`;
