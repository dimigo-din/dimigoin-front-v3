import React, { useEffect } from "react";
import css from "@emotion/css";
import styled from "@emotion/styled";
import { CardExplainContent, OutgoApplyInput, WeekCalendar, LargeTimeSelector,
        SelectingTime, NavigationBar, PageWrapper, ResponsiveWrapper, Col,
        CardGroupHeader, OutgoApplyForm, Divider, OutgoApplier, Card, Checkbox, Button } from "../components";
import useInput, { EventFunction, useCheckbox } from "../hooks/useInput";
import { Student } from "../constants/types";

interface DateSelectorProps {
  onChange: EventFunction<[Date, Date]>
}

const DateSelector: React.FC<DateSelectorProps> = ({ onChange }) => {
  const dayInput = useInput<[Date, Date]>();
  const timeInput = useInput<SelectingTime[]>([{
    hour: 19,
    minute: 0
  }, {
    hour: 17,
    minute: 45
  }]);
  const isNotDailyCheckbox = useCheckbox();

  useEffect(() => onChange({
    target: {
      value: dayInput.value!!
    }
  }), [])
  
  useEffect(() => {
    if(!onChange || !dayInput.value) return
    const [ _from, _to ] = dayInput.value;
    if (!(_from && _to && timeInput.value)) return;
    
    const from = new Date(+_from), to = new Date(+_to)
    
    from.setHours(timeInput.value[0]?.hour);
    from.setMinutes(timeInput.value[0]?.minute);
    to.setHours(timeInput.value[1]?.hour);
    to.setMinutes(timeInput.value[1]?.minute);

    onChange({
      target: {
        value: [from, to]
      }
    })
  }, [dayInput.value, timeInput.value, onChange]);
  return (
    <>
    <Checkbox
      text="당일외출이 아님"
      css={css`margin-bottom: 12px;`}
      {...isNotDailyCheckbox}
    />
      <WeekCalendar {...dayInput} rangeSelect={isNotDailyCheckbox.checked} />
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
  const applyFormInput = useInput<OutgoApplyInput>();
  const applierInput = useInput<Student[]>()
  const dateSelectorInput = useInput<[Date, Date]>()

  const submitHandler = () => {
    console.log(dateSelectorInput.value)
  };

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
            <OutgoApplyForm
              css={css`
                flex: 1;
                display: flex;
                flex-direction: column;
              `}
              {...applyFormInput}
            />
          </Col>
          <Divider data-divider />
          <Col width={6.5}>
            <CardGroupHeader>신청자</CardGroupHeader>
            <OutgoApplier {...applierInput} />
            <Divider data-divider small horizontal />
            <ResponsiveWrapper threshold={1400}>
              <Col width={4}>
                <CardGroupHeader>외출시간</CardGroupHeader>
                <Card leftBorder>
                  <DateSelector {...dateSelectorInput} />
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
