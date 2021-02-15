import React from "react";
import css from "@emotion/css";
import styled from '@emotion/styled'
import CardGroupHeader from "../basic/CardGroupHeader";
import Card from "../basic/Card";
import Button from "../basic/Button";
import Skeleton from "react-loading-skeleton";
import { NightSelfStudyTime } from "../../constants/types";

interface IngangsilStatusProps {
  currentApplied?: number;
  max?: number;
  time?: string;
  isApplied?: boolean;
  name: string;
  onSubmit(): void;
}

const nullableSkeletonText = (value?: any) => {
  return value === undefined ? <Skeleton /> : value;
}

export const IngansilStatus: React.FC<IngangsilStatusProps> = ({
  currentApplied,
  time,
  max,
  isApplied,
  name,
  onSubmit
}) => {
  const isRequestable =
    ((max !== undefined) && (currentApplied !== undefined)) ? (//1. 신청 했고, 자리가 없을 때
      currentApplied < max ||
      //2. 자리가 남았을때
      Boolean(isApplied && currentApplied >= max)) : null;
  return (
    <>
      <CardGroupHeader
        subButton={{
          text: time,
        }}
      >
        {name}
      </CardGroupHeader>
      <Card>
        <NumberWrapper>
          <div css={isRequestable ? active : disabled}>
            <NumberName>현원</NumberName>
            <NumberDisplay>{nullableSkeletonText(currentApplied)}</NumberDisplay>
          </div>
          <div>
            <NumberName>총원</NumberName>
            <NumberDisplay>{nullableSkeletonText(max)}</NumberDisplay>
          </div>
        </NumberWrapper>
      </Card>
      <ApplyButton
        disabled={!isRequestable}
        onClick={() => onSubmit()}
        css={max === undefined && css`color: transparent;`}
      >
        {/* 신청했는지 판별하는 변수를 넣어주세요  */}
        {isApplied ? "취소하기" : "신청하기"}
      </ApplyButton>
    </>
  );
};

const NumberCommonStyle = css`
  font-weight: 900;
  text-align: center;
`.styles;

const NumberName = styled.h2`
  font-size: 30px;
  ${NumberCommonStyle}
`;

const NumberDisplay = styled.h1`
  font-size: 50px;
  margin-top: 9px;
  ${NumberCommonStyle}
`;

const active = css`
  & > * {
    color: var(--main-theme-accent);
  }
`;

const disabled = css`
  & > * {
    color: #8a8a8a;
  }
`;

const ApplyButton = styled(Button)`
  display: block;
  text-align: center;
  margin-top: 10px;
`

const NumberWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-shrink: 3;
  padding: 3vw 0px 2vw;
`