import React from "react";
import css from "@emotion/css";
import styled from '@emotion/styled'
import CardGroupHeader from "../basic/CardGroupHeader";
import Card from "../basic/Card";
import Button from "../basic/Button";

interface IngangsilStatusProps {
  currentApplied: number;
  max: number;
  time: string;
  isApplied: boolean;
  name: string;
}

export const IngansilStatus: React.FC<IngangsilStatusProps> = ({
  currentApplied,
  time,
  max,
  isApplied,
  name,
}) => {
  const isRequestable =
    //1. 신청 했고, 자리가 없을 때
    currentApplied < max ||
    //2. 자리가 남았을때
    (isApplied && currentApplied >= max);
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
        <div
          css={css`
            display: flex;
            justify-content: space-around;
            flex-shrink: 3;
            /* margin: 54px auto 24px; */
            padding: 3vw 0px 2vw;
          `}
        >
          <div css={currentApplied < max ? active : disabled}>
            <NumberName>현원</NumberName>
            <NumberDisplay>{currentApplied}</NumberDisplay>
          </div>
          <div>
            <NumberName>총원</NumberName>
            <NumberDisplay>{max}</NumberDisplay>
          </div>
        </div>
      </Card>
      <Button
        css={[
          css`
            display: block;
            text-align: center;
            margin-top: 10px;
          `,
        ]}
        disabled={!isRequestable}
      >
        {/* 신청했는지 판별하는 변수를 넣어주세요  */}
        {isApplied ? "취소하기" : "신청하기"}
      </Button>
    </>
  );
};

const NumberCommonStyle = css`
  color: #2d2d2d;
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
