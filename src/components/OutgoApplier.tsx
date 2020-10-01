import React, { useState } from "react";
import Chip from "./Chip";
import Card from "./dimiru/DimiCard";
import styled from "@emotion/styled";
import css from "@emotion/css";

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
    <Card css={css`padding: -6px;`} leftBorder>
      {appliers &&
        appliers.map((applier) => (
          <Chip css={css`margin: 6px;`} key={applier.studentId}>
            {applier.studentId} {applier.name}
          </Chip>
        ))}
      <InputChip
        placeholder="+"
        onKeyDown={(e) =>
          e.key === "Enter" ? addPerson(e.target as HTMLInputElement) : console.log(e.key)
        }
      />
    </Card>
  );
};

const InputChip = styled.input`
  margin: 6px;
  width: 86px;
  text-align: center;
  background-color: transparent;
  border: solid 2px var(--main-theme-accent);
  color: var(--main-theme-accent);
  border-radius: 36px;
  font-size: 16px;
  padding: 0px 24px;
  vertical-align: middle;
  outline: none;
  height: 36px;
  line-height: 48px;
  font-weight: 700;
  &::placeholder {
    color: var(--main-theme-accent);
  }
`;

export default OutgoApplier;
