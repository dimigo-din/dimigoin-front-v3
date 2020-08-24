import React from "react";
import Chip from "./Chip";
import Card from "./dimiru/DimiCard";
import css from "@emotion/css";

interface IProps {
  appliers: {
    name: string;
    studentId: string;
  }[];
}

const OutgoApplier: React.FC<IProps> = ({ appliers }) => {
  return (
    <Card leftBorder>
      {appliers.map((applier) => (
        <Chip key={applier.studentId}>
          {applier.studentId} {applier.name}
        </Chip>
      ))}
      <Chip
        css={css`
          margin-left: 12px;
          width: 86px;
          text-align: center;
          background-color: transparent;
          border: solid 2px #3c70e8;
          color: #3c70e8;
          font-size: 24px;
          padding: 3px 24px;
          vertical-align: middle;
        `}
      >
        +
      </Chip>
    </Card>
  );
};

export default OutgoApplier;
