import css from "@emotion/css";
import styled from "@emotion/styled";
import React from "react";
import { useDrag } from "react-dnd";
import { showModal } from "../../components";
import { Student } from "../../constants/types";
import { Timeline } from "./Timeline";

const openTimelineByStudent = (student: Student) => {
    showModal(close => <Timeline student={student} close={close} />, {
      wrapperProps: {
        css: css`max-width: min(1080px, 100vw); padding: 60px 20px 20px; width: 100%;`
      }
    })
  }

export const DraggableStudent: React.FC<{
    student: Student;
    additionalInfo: string;
    freeWidth: boolean;
    isDraggable?: boolean;
}> = ({ student, additionalInfo, children, freeWidth, isDraggable }) => {
    const [, draggable] = useDrag({
        item: {
            type: "STUDENT",
            student
        },
        collect: state => ({
            isDragging: state.isDragging()
        })
    })
    return (
        <StudentWrapper
            freeWidth={freeWidth}
            onClick={isDraggable ? () => openTimelineByStudent(student) : undefined}
        >
            <p ref={isDraggable ? draggable : undefined}>
                {children}
            </p>
            <Chip>{additionalInfo}</Chip>
        </StudentWrapper>
    )
};

export const StudentWrapper = styled.h3<{ freeWidth?: boolean }>`
  padding: 15px;
  color: var(--row-color);
  font-size: 23px;
  font-weight: 700;
  ${({ freeWidth }) => !freeWidth && css`width: 100px;`}
  &:hover {
    &>div {
      opacity: 1;
      margin-top: 0px;
      visibility: visible;
    }
  }
`;

const Chip = styled.div`
  display: block;
  visibility: hidden;
  content: attr("data-additional-info");
  padding: 12px;
  opacity: 0;
  position: absolute;
  background-color: white;
  color: black;
  box-shadow: 0px 0px 36px rgba(0, 0, 0, 0.2);
  font-size: 16px;
  max-width: 120px;
  line-height: 24px;
  border-radius: 8px;
  margin-top: -12px;
  transition: 300ms cubic-bezier(0, 0.46, 0.12, 0.98);
`
