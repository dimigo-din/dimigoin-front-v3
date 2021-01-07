import React, { useEffect, useState } from "react";
import Chip from "./Chip";
import Card from "./dimiru/DimiCard";
import styled from "@emotion/styled";
import css from "@emotion/css";
import { showCardModal } from "./DimiCardModal";
import { Title } from "./CardGroupHeader";
import { ReactComponent as CloseSvg } from '../assets/icons/close.svg'
import DimiDropdown, { IDropdownItem } from "./dimiru/DimiDropdown";
import { Horizontal } from "./Atomics";
import DimiButton from "./dimiru/DimiButton";
import useInput from "./hooks/useInput";
import useConsole from "../hooks/useConsole";
import { Student } from "../constants/types";

const getClassInfo = () => [...Array(3)].map((_, grade) => [...Array(6)].map((_, clas) => [grade + 1, clas + 1])).flat()
const getStudentIinfoByClass = (clas: string): Student[] => [...Array(10)].map(() => ({
  studentId: Math.floor(Math.random() * 2000) + 1000 + '',
  name: "테스트유저"
}))

const AddApplierModal: React.FC<{
  close: () => void;
  register: (applier: Student) => void;
}> = ({ close, register }) => {
  const classDropdown = useInput<IDropdownItem>();
  const studentDropdown = useInput<IDropdownItem>();
  const [studentList, setStudentList] = useState<Student[]>();
  useEffect(() => {
    console.log(classDropdown.value)
    if(classDropdown.value?.key) setStudentList(getStudentIinfoByClass(classDropdown.value.key))
  }, [classDropdown.value])
  useConsole('SELECTED_STUDENT', studentDropdown.value)
  return <>
  <FormModalWrapper>
    <Horizontal css={css`justify-content: space-between;`}>
    <Title>
      외출 인원 추가
    </Title>
    <CloseSvg onClick={close} />
    </Horizontal>
    <FormItem>
      <InputLabel>학급</InputLabel>
      <Dropdown placeholder="학급 선택" items={getClassInfo().map(clas => ({
        name: `${clas[0]}학년 ${clas[1]}반`
      }))} {...classDropdown} />
    </FormItem>
    <FormItem>
      <InputLabel>학급</InputLabel>
      <Dropdown placeholder="반을 먼저 선택해주세요" items={studentList?.map(e => ({
        name: e.name,
        key: e.studentId
      }))} {...studentDropdown} />
    </FormItem>
  </FormModalWrapper>
  <FormModalButton onClick={() => studentDropdown.value?.key && studentDropdown.value?.name && register({
    name: studentDropdown.value.name,
    studentId: studentDropdown.value.key
  })}>완료</FormModalButton>
  </>
 
}

const OutgoApplier: React.FC = () => {
  const [appliers, setAppliers] = useState<Student[]>([]);
  const addApplier = () => {
    showCardModal((close) => <AddApplierModal register={(applier) => {
      setAppliers((beforeAppliers) => [...beforeAppliers, applier])
      close()
    }} close={close} />, undefined, {
      cardProps: {
        css: css`
          width: 720px;
          padding: 0px;
        `
      }})
  }
  return (
    <Card css={css`padding: -6px;`} leftBorder>
      {appliers &&
        appliers.map((applier) => (
          <Chip css={css`margin: 6px;`} key={applier.studentId}>
            {applier.studentId} {applier.name}
          </Chip>
        ))}
      <InputChip onClick={addApplier}>
        +
      </InputChip>
    </Card>
  );
};

const InputChip = styled.div`
  margin: 6px;
  width: 138px;
  text-align: center;
  background-color: transparent;
  border: solid 2px var(--main-theme-accent);
  color: var(--main-theme-accent);
  border-radius: 36px;
  font-size: 24px;
  vertical-align: middle;
  outline: none;
  height: 36px;
  line-height: 36px;
  font-weight: 700;
  &::placeholder {
    color: var(--main-theme-accent);
  }
`;

const InputLabel = styled.p`
  font-size: 22px;
  flex-shrink: 0;
  margin-right: 32px;
`

const FormItem = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`

const Dropdown= styled(DimiDropdown)`
  flex: 1;
`

const FormModalWrapper = styled.div`
  padding: 32px 45px 32px;
`

const FormModalButton = styled(DimiButton)`
  width: 100%;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
`

export default OutgoApplier;
