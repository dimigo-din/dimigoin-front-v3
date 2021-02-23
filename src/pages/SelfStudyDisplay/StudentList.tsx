import css from "@emotion/css"
import styled from "@emotion/styled"
import React from "react"
import { useDrop } from "react-dnd"
import Skeleton from "react-loading-skeleton"
import { Horizontal } from "../../components"
import { AttendanceLogWithStudent, Student } from "../../constants/types"
import { DraggableStudent, StudentWrapper } from "./DraggableStudent"
import { LabelCard } from "./LabelCard"


export const StudentList: React.FC<{
    log?: AttendanceLogWithStudent[];
    hasLabel: boolean;
    moveStudent(student: Student): void;
    rowType: string;
    isDraggable?: boolean;
}> = ({
    log,
    hasLabel,
    moveStudent,
    rowType,
    isDraggable
}) => {
        const [, droppable] = useDrop<{ type: 'STUDENT', student: Student }, unknown, unknown>({
            accept: 'STUDENT',
            drop: isDraggable ? ({ student }) => moveStudent(student) : undefined
        })
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
                    {log ? log.map((student) => (
                        <DraggableStudent
                            isDraggable={isDraggable}
                            freeWidth={['ABSENT', 'ETC', 'CIRCLE',].includes(rowType) || !!student.log?.remark}
                            key={student.student._id}
                            student={student.student}
                            additionalInfo={`${student.log?.place.name || "장소를 등록하지 않았습니다"}${student.log?.remark ? `(${student.log?.remark})` : ''}`}
                        >
                            {student.student.number} {student.student.name}
                            {['ETC', 'CIRCLE'].includes(rowType) ? <EtcInfo>&nbsp;
                  {student.log?.place.name}, {student.log?.remark}
                            </EtcInfo> : student.log?.remark && <EtcInfo>&nbsp;
                    {student.log.remark}
                            </EtcInfo>}
                        </DraggableStudent>
                    )) : [...Array(Math.floor(Math.random() * 10) + 3)].map((_, index) => <StudentWrapper key={`index${index}`}>
                        <Skeleton width={80} />
                    </StudentWrapper>)}
                </Horizontal>
            </LabelCard>
        )
    }

const EtcInfo = styled.span`
      font-size: 18px;
      font-weight: 700;
    `