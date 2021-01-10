import React, { useEffect } from "react";
import Card from "../basic/Card";
import { FormHeader } from "../basic/Form";
import RadioButton, {
  RadioButtonItem,
} from "../basic/RadioButton";
import DimiDropdown, { DropdownItem } from "../basic/Dropdown";
import Textarea from "../basic/Textarea";
import useInput, { EventFunction } from "../../hooks/useInput";

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

  useEffect(() => {
    onChange &&
      onChange({
        target: {
          value: {
            outgoType: outgoType?.value?.key,
            applyType: applyType?.value?.key,
            outgoReason: outgoReason?.value?.key,
            detailReason: detailReason?.value,
            approver: approver?.value?.key,
          },
        },
      });
  }, [
    applyType,
    detailReason,
    approver,
    onChange,
    outgoReason,
    outgoType
  ]);
  return (
    <>
      <Card leftBorder>
        <FormHeader>외출 유형</FormHeader>
        <RadioButton
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
        <RadioButton
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
        <DimiDropdown
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
        <DimiDropdown
          {...approver}
          items={[
            {
              name: "1 - 1 공정도 선생님",
              key: "JDK",
            },
            {
              name: "1 - 2 류명희 선생님",
              key: "ryu",
            },
          ]}
          placeholder="이 곳을 눌러 선택하세요"
        />
      </Card>
    </>
  );
};

export default OutgoApplyForm;
