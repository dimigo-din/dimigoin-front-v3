import React, { useEffect } from "react";
import css from "@emotion/css";
import styled from "@emotion/styled";
import NavigationBar from "../components/complex/NavigationBar";
import { ResponsiveWrapper, Col, Divider } from "../components/layout/Cols";
import OutgoApply, { OutgoApplyInput } from "../components/complex/OutgoApply";
import CardGroupHeader from "../components/basic/CardGroupHeader";
import OutgoApplier from "../components/complex/OutgoApplier";
import WeekCalendar from "../components/complex/WeekCalendar";
import Card from "../components/basic/Card";
import LargeTimeSelector, {
  ITime,
} from "../components/complex/LargeTimeSelector";
import Checkbox from "../components/basic/Checkbox";
import Button from "../components/basic/Button";
import useInput from "../hooks/useInput";
import PageWrapper from "../components/layout/PageWrapper";
import { CardExplainContent } from "../components/basic/Atomics";

const DateSelector: React.FC = () => {
  const dayInput = useInput<Date>();
  const timeInput = useInput<ITime[]>();
  useEffect(() => {
    const from = dayInput.value;
    const to = dayInput.value;
    if (!(from && to && timeInput.value)) return;
    from.setHours(timeInput.value[0]?.hour);
    to.setHours(timeInput.value[1]?.hour);

    console.log(from, to);
  }, [dayInput.value, timeInput.value]);
  return (
    <>
      <WeekCalendar {...dayInput} />
      <LargeTimeSelector
        {...timeInput}
        css={css`
          margin-top: 24px;
        `}
      />
    </>
  );
};

const Outgo: React.FC = () => {
  const applyData = useInput<OutgoApplyInput>();

  const submitHandler = () => {
    console.log(applyData.value)
  };
  useEffect(() => {
    // console.log(applyData.value);
  }, [applyData.value]);
  return (
    <>
      <NavigationBar />
      <PageWrapper>
        <ResponsiveWrapper threshold={1200}>
          <Col width={3.5}>
            <CardGroupHeader
              subButton={{
                text: "평일(월~금) 15:00까지 신청 가능",
              }}
            >
              신청하기
            </CardGroupHeader>
            <OutgoApply
              css={css`
                flex: 1;
                display: flex;
                flex-direction: column;
              `}
              {...applyData}
            />
          </Col>
          <Divider data-divider />
          <Col width={6.5}>
            <CardGroupHeader>신청자</CardGroupHeader>
            <OutgoApplier />
            <Divider data-divider small horizontal />
            <ResponsiveWrapper threshold={1400}>
              <Col width={4}>
                <CardGroupHeader>외출시간</CardGroupHeader>
                <Card leftBorder>
                  <DateSelector />
                </Card>
              </Col>
              <Divider data-divider small />
              <Col width={6}>
                <CardGroupHeader>주의사항</CardGroupHeader>
                <Card
                  css={css`
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                  `}
                >
                  <Info>
                    7월 4일,
                    <br />
                    <DateHighlight>10시 30분</DateHighlight> 부터{" "}
                    <DateHighlight>13시 30분</DateHighlight> 까지
                    <br /> 외출을 신청합니다
                  </Info>
                  <CardExplainContent css={css`margin-top: 36px;`}>
                    <h2>이용방법</h2>
                    <p>외출시, 정문 외출 인식기에 외출시간을 입력합니다.</p>
                    <p>귀교시, 정문 외출 인식기에 귀교시간을 입력합니다.</p>
                    
                    <h2>주의사항</h2>
                    <p>신청 전, 모든 내용이 올바르게 기재되었는지 확인해주세요.</p>
                    <p>허위 기재된 내용이 있다면 불이익을 받을 수 있습니다.</p>
                  </CardExplainContent>
                  <Checkbox
                    css={css`
                      margin-top: 12px;
                    `}
                    text="모든 내용을 확인하였으며, 위와 같이 신청합니다."
                  />
                </Card>
                <Button
                  onClick={submitHandler}
                  css={css`
                    margin-top: 12px;
                  `}
                >
                  신청하기
                </Button>
              </Col>
            </ResponsiveWrapper>
          </Col>
        </ResponsiveWrapper>
      </PageWrapper>
    </>
  );
};
export default Outgo;

const DateHighlight = styled.span`
  font-weight: 900;
  color: var(--main-theme-accent);
`;

export const Info = styled.div`
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
`;
