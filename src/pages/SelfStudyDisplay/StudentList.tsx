import css from '@emotion/css';
import styled from '@emotion/styled';
import React, { useMemo } from 'react';
import { useDrop } from 'react-dnd';
import Skeleton from 'react-loading-skeleton';
import { Horizontal } from '../../components';
import { AttendanceLogWithStudent, Student } from '../../constants/types';
import { DraggableStudent, StudentWrapper } from './DraggableStudent';
import { LabelCard } from './LabelCard';

const sortByLogAnd = (log: AttendanceLogWithStudent[]) => {
  const [hasLog, noLog] = log
    .sort((a, b) => a.student.number - b.student.number)
    .reduce<AttendanceLogWithStudent[][]>(
      (grouped, current) => {
        if (current.log) return [[...grouped[0], current], grouped[1]];
        else return [grouped[0], [...grouped[1], current]];
      },
      [[], []],
    );
  return [...hasLog, ...noLog];
};

export const StudentList: React.FC<{
  log?: AttendanceLogWithStudent[];
  hasLabel: boolean;
  moveStudent(student: Student): void;
  rowType: string;
  isDraggable?: boolean;
}> = ({ log, hasLabel, moveStudent, rowType, isDraggable }) => {
  const [, droppable] = useDrop<
    { type: 'STUDENT'; student: Student },
    unknown,
    unknown
  >({
    accept: 'STUDENT',
    drop: isDraggable ? ({ student }) => moveStudent(student) : undefined,
  });
  const sorted = useMemo(() => log && sortByLogAnd(log), [log]);
  return (
    <LabelCard
      title="이름"
      hasLabel={hasLabel}
      css={css`
        flex: 1;
      `}
      contentCss={css`
        align-items: flex-start;
      `}
      ref={droppable}
    >
      <Horizontal
        css={css`
          margin: -10px;
          flex-wrap: wrap;
        `}
      >
        {sorted
          ? sorted.map((student) => (
              <DraggableStudent
                isDraggable={isDraggable}
                freeWidth={
                  ['ABSENT', 'ETC', 'CIRCLE'].includes(rowType) ||
                  !!student.log?.remark
                }
                key={student.student._id}
                student={student.student}
                additionalInfo={`${student.student.name} : ${
                  student.log?.place?.name || '장소를 등록하지 않았습니다'
                }${student.log?.remark ? `(${student.log?.remark})` : ''}`}
                hasLogged={!!student.log}
              >
                {student.student.number.toString().padStart(2, '0')}{' '}
                {student.student.name}
                {((content: string) => content && <EtcInfo>{content}</EtcInfo>)(
                  [
                    student.log?.place &&
                      ['CIRCLE', 'ETC', 'MOVING_CLASS'].includes(rowType) &&
                      student.log.place.name,
                    student.log?.remark &&
                      ['CIRCLE', 'ETC'].includes(rowType) &&
                      student.log.remark,
                  ]
                    .filter(Boolean)
                    .join(', '),
                )}
              </DraggableStudent>
            ))
          : [...Array(Math.floor(Math.random() * 10) + 3)].map((_, index) => (
              <StudentWrapper key={`index${index}`}>
                <Skeleton width={80} />
              </StudentWrapper>
            ))}
      </Horizontal>
    </LabelCard>
  );
};

const EtcInfo = styled.span`
  font-size: 18px;
  font-weight: 700;
  margin-left: 6px;
`;
