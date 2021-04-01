import css from '@emotion/css';
import styled from '@emotion/styled';
import React from 'react';
import { useDrag } from 'react-dnd';
import { showModal } from '../../components';
import { Student } from '../../constants/types';
import { TimelineByStudent } from './Timeline';

const openTimelineByStudent = (student: Student) => {
  showModal((close) => <TimelineByStudent student={student} close={close} />, {
    wrapperProps: {
      css: css`
        max-width: min(1080px, 100vw);
        padding: 60px 20px 20px;
        width: 100%;
      `,
    },
  });
};

export const DraggableStudent: React.FC<{
  student: Student;
  additionalInfo: string;
  freeWidth: boolean;
  isDraggable?: boolean;
  hasLogged?: boolean;
}> = ({ student, additionalInfo, children, isDraggable, ...props }) => {
  const [, draggable] = useDrag({
    item: {
      type: 'STUDENT',
      student,
    },
    collect: (state) => ({
      isDragging: state.isDragging(),
    }),
  });
  return (
    <>
      <StudentWrapper
        onClick={isDraggable ? () => openTimelineByStudent(student) : undefined}
        {...props}
      >
        <p ref={isDraggable ? draggable : undefined}>{children}</p>
      </StudentWrapper>
      <Chip>{additionalInfo}</Chip>
    </>
  );
};

export const StudentWrapper = styled.h3<{
  freeWidth?: boolean;
  hasLogged?: boolean;
}>`
  padding: 15px;
  color: var(--row-color);
  font-size: 23px;
  font-weight: 700;
  ${({ freeWidth }) =>
    !freeWidth &&
    css`
      width: 100px;
    `}
  ${({ hasLogged }) =>
    !hasLogged &&
    css`
      opacity: 0.5;
    `}
  &:hover {
    & + div {
      opacity: 1;
      margin-top: 0px;
      visibility: visible;
    }
  }
`;

const Chip = styled.div`
  display: block;
  visibility: hidden;
  padding: 18px;
  opacity: 0;
  position: absolute;
  background-color: white;
  color: black;
  box-shadow: 0px 0px 36px rgba(0, 0, 0, 0.1);
  font-size: 18px;
  /* max-width: 120px; */
  line-height: 24px;
  border-radius: 16px;
  margin-top: -18px;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  transition: 300ms cubic-bezier(0, 0.46, 0.12, 0.98);
`;
