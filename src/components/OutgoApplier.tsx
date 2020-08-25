import React, { useState } from "react";
import Chip from "./Chip";
import Card from "./dimiru/DimiCard";
import styled from "@emotion/styled";

interface Applier {
  name: string;
  studentId: string;
}

const OutgoApplier: React.FC = () => {
  const [appliers, setAppliers] = useState<Applier[]>([]);
  const addPerson = (el: HTMLInputElement) => {
    const text = el.value;
    if (appliers) {
      console.log(appliers);
      setAppliers((beforeAppliers) => [
        ...beforeAppliers!,
        {
          name: text,
          studentId: text,
        },
      ]);
      el.value = "";
    }
  };
  return (
    <Card leftBorder>
      {appliers &&
        appliers.map((applier) => (
          <Chip key={applier.studentId}>
            {applier.studentId} {applier.name}
          </Chip>
        ))}
      <InputChip
        placeholder="+"
        onKeyDown={(e) =>
          // @ts-ignore
          e.key === "Enter" ? addPerson(e.target) : console.log(e.key)
        }
      />
    </Card>
  );
};

const InputChip = styled.input`
  margin-left: 12px;
  width: 86px;
  text-align: center;
  background-color: transparent;
  border: solid 2px #3c70e8;
  color: #3c70e8;
  border-radius: 36px;
  font-size: 16px;
  padding: 0px 24px;
  vertical-align: middle;
  outline: none;
  height: 36px;
  line-height: 48px;
  font-weight: 700;
  &::placeholder {
    color: #3c70e8;
  }
`;

export default OutgoApplier;
