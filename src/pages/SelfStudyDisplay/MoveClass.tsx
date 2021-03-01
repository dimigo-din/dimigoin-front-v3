import css from '@emotion/css';
import styled from '@emotion/styled';
import React from 'react';

const MoveClass: React.FC = () => {
  return (
    <Wrapper>
      <ClassRow>
        <ClassLabel>1반</ClassLabel>
        <StudentList>
          <StudentName>01 강예원</StudentName>
          <StudentName>01 강예원</StudentName>
          <StudentName>01 강예원</StudentName>
          <StudentName>01 강예원</StudentName>
          <StudentName>01 강예원</StudentName>
          <StudentName>01 강예원</StudentName>
          <StudentName>01 강예원</StudentName>
          <StudentName>01 강예원</StudentName>
          <StudentName>01 강예원</StudentName>
        </StudentList>
      </ClassRow>
      <ClassRow
        css={css`
          margin-top: 20px;
        `}
      >
        <ClassLabel>2반</ClassLabel>
        <StudentList>
          <StudentName>01 강예원</StudentName>
          <StudentName>01 강예원</StudentName>
          <StudentName>01 강예원</StudentName>
          <StudentName>01 강예원</StudentName>
          <StudentName>01 강예원</StudentName>
          <StudentName>01 강예원</StudentName>
          <StudentName>01 강예원</StudentName>
          <StudentName>01 강예원</StudentName>
          <StudentName>01 강예원</StudentName>
          <StudentName>01 강예원</StudentName>
          <StudentName>01 강예원</StudentName>
          <StudentName>01 강예원</StudentName>
          <StudentName>01 강예원</StudentName>
          <StudentName>01 강예원</StudentName>
          <StudentName>01 강예원</StudentName>
          <StudentName>01 강예원</StudentName>
        </StudentList>
      </ClassRow>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 50vh;
  flex-direction: column;
  font-weight: 700;
`;

const ClassRow = styled.div`
  flex: 1;
  display: flex;
  align-items: stretch;
`;

const ClassLabel = styled.div`
  background-color: var(--main-theme-accent);
  color: white;
  font-size: 18px;
  display: grid;
  place-items: center;
  padding: 16px;
  border-radius: 6px;
`;

const StudentList = styled.div`
  border: 1px solid #d1d1d1;
  border-radius: 6px;
  flex: 1;
  margin-left: 20px;
  padding: 8px 0px;
`;

const StudentName = styled.div`
  color: var(--main-theme-accent);
  font-size: 20px;
  padding: 12px 20px;
  display: inline-block;
`;

export default MoveClass;
