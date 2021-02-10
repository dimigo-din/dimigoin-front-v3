import React, { useEffect, useState } from "react";
import useInput, { EventFunction } from "../../hooks/useInput";
import { getAllTeachers } from "../../api/user";
import {  Card, FormHeader, RadioButtonGroup, Textarea, Dropdown,
          RadioButtonItem, DropdownItem } from "../basic";

export interface OutgoApplyInput {
  outgoType?: string;
  applyType?: string;
  outgoReason?: string;
  detailReason?: string;
  approver?: string;
}

interface OutgoApplyProps {
  onChange?: EventFunction<OutgoApplyInput>;
}

export const OutgoApplyForm: React.FC<OutgoApplyProps> = ({ onChange, ...props }) => {
  const outgoType = useInput<RadioButtonItem>();
  const applyType = useInput<RadioButtonItem>();
  const outgoReason = useInput<DropdownItem>();
  const detailReason = useInput();
  const approver = useInput<DropdownItem>();
  const [ approversList, setApproversList ] = useState<DropdownItem[]>();

  useEffect(() => {
    getAllTeachers().then(teacherList => setApproversList(() => teacherList.map(teacher => ({
      name: teacher.name + ' 선생님',
      key: teacher._id
    }))))
  }, [ setApproversList ]);

  const applyTypeValue = applyType.value,
        detailReasonValue = detailReason.value,
        approverValue = approver.value,
        outgoReasonValue= outgoReason.value,
        outgoTypeValue = outgoType.value


  useEffect(() => {
    console.log('네?')
    onChange &&
      onChange({
        target: {
          value: {
            outgoType: outgoTypeValue?.key,
            applyType: applyTypeValue?.key,
            outgoReason: outgoReasonValue?.key,
            detailReason: detailReasonValue,
            approver: approverValue?.key,
          },
        },
      });
  }, [
    onChange,
    applyTypeValue,
    approverValue,
    detailReasonValue,
    outgoReasonValue,
    outgoTypeValue
  ]);
  return (
    <>
      <Card leftBorder>
        <FormHeader>외출 유형</FormHeader>
        <RadioButtonGroup
          {...outgoType}
          name="outgoType"
          items={[
            {
              name: "개인 외출",
              key: "alone",
            },
            {
              name: "단체 외출",
              key: "group",
            },
          ]}
        />
        <FormHeader>신청 유형</FormHeader>
        <RadioButtonGroup
          {...applyType}
          name="applyType"
          items={[
            {
              name: "일반 외출",
              key: "onetime",
            },
            {
              name: "정기 외출",
              key: "regulary",
            },
          ]}
        />
        <FormHeader>외출 사유</FormHeader>
        <Dropdown
          {...outgoReason}
          items={[
            {
              name: "사유1",
              key: "reason1",
            },
            {
              name: "사유2",
              key: "reason2",
            },
            {
              name: "사유3",
              key: "reason3",
            },
          ]}
          placeholder="선택 또는 직접 입력"
        />
        <FormHeader>상세 사유</FormHeader>
        <Textarea {...detailReason} placeholder="이 곳을 눌러 입력하세요" />
        <FormHeader>승인 교사</FormHeader>
        <Dropdown
          {...approver}
          items={approversList}
          placeholder="이 곳을 눌러 선택하세요"
        />
      </Card>
    </>
  );
};

export default OutgoApplyForm;
