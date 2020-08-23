import React, { useEffect } from "react";
import CardGroupHeader from "../components/CardGroupHeader";
import Card from "../components/dimiru/DimiCard";
import { FormHeader } from "../components/Form";
import RadioButton from "../components/dimiru/DimiRadioButton";
import DimiDropdown from "../components/dimiru/DimiDropdown";
import Textarea from "../components/dimiru/DimiTextarea";
import useInput from "./hooks/useInput";

const OutgoApply = () => {
  const outgoType = useInput();
  const applyType = useInput();
  const outgoReason = useInput();
  const detailReason = useInput();
  const approver = useInput();

  useEffect(() => {
    console.log({
      outgoType: outgoType.value,
      applyType: applyType.value,
      outgoReason: outgoReason.value,
      detailReason: outgoType.value,
      approver: approver.value,
    });
  }, [outgoType, applyType, approver, outgoReason]);
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
              name: "대충 어떤 사유",
              key: "daechung",
            },
            {
              name: "직접 입력",
              key: "self_input",
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

export default OutgoApply;
