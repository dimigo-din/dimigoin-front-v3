import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import css from "@emotion/css";
import Chip from "../basic/Chip";
import Card from "../basic/Card";
import { BriefStudent, Doc } from "../../constants/types";
import useInput, { EventFunction } from "../../hooks/useInput";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg"
import { fetchAllStudents, getMyData } from "../../api/user";
import useConsole from "../../hooks/useConsole";
import { toast } from "react-toastify";
import { useMyData } from "../../hooks/api";
import { isStudent } from "../../utils/isStudent";

interface OutgoApplierProps {
  onChange: EventFunction<Doc<BriefStudent>[]>;
  value?: Doc<BriefStudent>[];
}

const InputChip: React.FC<{
  onSubmit(student: BriefStudent): any;
  studentsList?: BriefStudent[]
}> = ({ studentsList, onSubmit }) => {
  const [typing, setTypingState] = useState(false)
  const [focusedIndex, setFocusIndex] = useState(-1)
  const [queriedStudents, setQueriedStudents] = useState<BriefStudent[]>()
  const userInput = useInput()
  useEffect(() => {
    setQueriedStudents(() =>
      studentsList?.filter(student =>
        student.name
          .includes(userInput.value!!) ||
        student.studentId
          .startsWith(userInput.value!!)
      ).slice(0, 5)
    )
  }, [userInput.value, studentsList])
  useEffect(() => setFocusIndex(-1), [userInput.value])
  return <FixedHeightContainer>
    <InputChipWrapper isTyping={Boolean(typing || userInput.value)}>
      {((typing || userInput.value) && studentsList) ? <>
        <UserNameInput autoFocus {...userInput} onBlur={() => setTypingState(false)} onKeyDown={e => {
          if (e.key === 'ArrowDown') return setFocusIndex(_index => _index + 1)
          if (e.key === 'ArrowUp') return setFocusIndex(_index => _index - 1)
          if (e.key === 'Enter') queriedStudents && onSubmit(queriedStudents[focusedIndex])
          if (e.key === 'Escape') return setTypingState(false)
        }} />
        {
          queriedStudents ? queriedStudents
            .map((student, index) => <SearchListItem
              focus={index === focusedIndex}
              onMouseEnter={() => setFocusIndex(() => index)}
              onClick={() => onSubmit(student)}
            >
              {student.studentId} {student.name}
            </SearchListItem>) : <SearchListItem>
              학번 혹은 이름을 입력해주세요
        </SearchListItem>
        }
      </> : <AddNewWrapper onClick={() => setTypingState(true)}>
          <AddNewIcon />
        </AddNewWrapper>}
    </InputChipWrapper>
  </FixedHeightContainer>
}

interface OutgoProcessingUser extends Doc<BriefStudent> {
  grade: number
}

export const OutgoApplier: React.FC<OutgoApplierProps> = ({ onChange, value }) => {
  const [studentsList, setStudentsList] = useState<Doc<BriefStudent>[]>()
  const [appliers, setAppliers] = useState<Doc<BriefStudent>[] | null>(value ?? null);

  const myData = useMyData()

  const addApplier = (d: Doc<BriefStudent>) => {
    if(appliers?.some(applier => applier._id === d._id)) {
      toast.info("이미 선택된 학생입니다")
      return
    }
    setAppliers(_appliers => [...(_appliers || []), d])
  }
  const removeApplier = (index: number) => {
    appliers && setAppliers(_appliers => [...appliers!!.slice(0, index), ..._appliers!!.slice(index + 1)])
  }
  useConsole('ADF', value);
  useEffect(() => {
    (async () => {
      if(!(myData && isStudent(myData))) return
      const students = await fetchAllStudents()
      // 학번이 없는(졸업생, 자퇴생) 학생을 필터링합니다
      // 메모리 할당을 줄이기 위해 불필요한 프로퍼티를 제거한 인터페이스로 재구조화합니다
      const filterNoSerialConvertBrief = students.filter(e => e.serial).map<OutgoProcessingUser>(e => ({
        name: e.name,
        studentId: e.serial + "",
        userId: e.idx + "",
        grade: e.grade,
        _id: e._id,
        createdAt: e.createdAt,
        updatedAt: e.updatedAt
      }))

      // 같은 학년 학생을 우선순위로 표시하기 위해 정렬합니다
      // 2차원배열의 0번 인덱스에는 나와 같은 학년의 학생들이,
      // 1번 인덱스에는 나머지 학생들을 대입합니다.
      // 혹시 더 나은 로직이 있다면 수정 부탁드립니다 :)
      // 배열의 원본을 수정하는 mutable method(push 등..)은 사용하지 마세요!
      // *현재는 O(n)
      // setAppliers(() => [{
      //   name: myData.name,
      //   studentId: String(myData.serial),
      //   userId: String(myData.idx)
      // }])
      const myGrade = myData.grade
      const sortedByGrade = filterNoSerialConvertBrief.reduce((acc, current) => {
        if (current.grade === myGrade) return [[...acc[0], current], acc[1]]
        return [acc[0], [...acc[1], current]]
      }, [[], []] as OutgoProcessingUser[][])

      // 2차원배열을 1차원으로 펼쳐서 학생리스트로 지정합니다
      setStudentsList(() => sortedByGrade.flat())
    })()
  }, [])
  useEffect(() => {
    if (onChange && appliers) onChange({ target: { value: appliers } })
  }, [appliers, onChange])
  return (
    <Wrapper leftBorder>
      {appliers &&
        appliers.map((applier, index) => (
          <Chip css={css`margin: 6px;`} key={applier.studentId} onClick={() => removeApplier(index)}>
            {applier.studentId} {applier.name}
          </Chip>
        ))}
      <InputChip studentsList={studentsList} onSubmit={addApplier} />
    </Wrapper>
  );
};

const Wrapper = styled(Card)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: -6px;
`

const FixedHeightContainer = styled.div`
  height: 32px;
  width: 138px;
  /* display: inline-block; */
  margin: 6px;
  position: relative;
  z-index: 2;
`

const InputChipWrapper = styled.div<{ isTyping: boolean }>`
  background-color: transparent;
  color: #E6E6E6;
  border-radius: 6px;
  box-sizing: border-box;
  margin: 0px;
  transition: 300ms cubic-bezier(0, 0.76, 0.12, 0.98);
  box-shadow: 0px 0px 0px 2px #E6E6E6;
  /*  */
  ${({ isTyping }) => isTyping && css`
    /* vertical-align: top; */
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.06);
    background-color: white;
  `}
`;

const UserNameInput = styled.input`
  border: none;
  height: 32px;
  width: 100%;
  outline: none;
  box-sizing: border-box;
  font-size: 16px;
  padding: 10px;
  background-color: transparent;
  color: var(--main-theme-accent);
  font-weight: 700;
  border-bottom: 1px solid #EFEFEF;
`

const AddNewWrapper = styled.div`
  display: grid;
  place-items: center;
  height: 32px;
`

const AddNewIcon = styled(PlusIcon)`
  
`

const SearchListItem = styled.div<{ focus?: boolean }>`
  padding: 10px;
  color: #999999;
  font-weight: 700;
  font-size: 16px;
  height: 36px;
  box-sizing: border-box;
  ${({ focus }) => focus && css`
    background-color: #F8F8F8;
  `}
`

export default OutgoApplier;
