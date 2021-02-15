import React, { useCallback, useEffect } from "react";
import css from "@emotion/css";
import styled from "@emotion/styled";
import {
  CardExplainContent, OutgoApplyInput, WeekCalendar, LargeTimeSelector,
  SelectingTime, NavigationBar, PageWrapper, ResponsiveWrapper, Col,
  CardGroupHeader, OutgoApplyForm, Divider, OutgoApplier, Card, Checkbox, Button, TextCardGroup
} from "../components";
import useInput, { EventFunction, useCheckbox } from "../hooks/useInput";
import { BriefStudent, Doc } from "../constants/types";
import makeAlert from "../functions/makeAlert";
import { OutgoRequestForm } from "../api";
import { requestOutgo } from "../api/outgo";
import { getMyData } from "../api/user";
import { toast } from "react-toastify";

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
    if (!onChange || !dayInput.value) return
    const [_from, _to] = dayInput.value;
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
  const { setValue: setAppliers, ...applierInput } = useInput<Doc<BriefStudent>[]>()
  const dateSelectorInput = useInput<[Date, Date]>()

  const applierValue = applierInput.value
  const applyFormValue = applyFormInput.value
  const dateSelectorValue = dateSelectorInput.value

  const isTimeSelected = Boolean(dateSelectorValue?.[0] && +dateSelectorValue[0])
  const isDateRange = dateSelectorValue?.[0].getDate() !== dateSelectorValue?.[1].getDate()

  const applyMe = useCallback(() => {
    getMyData().then(myData => setAppliers(() => [{
      name: myData.name,
      studentId: myData.serial.toString(),
      userId: myData.idx.toString(),
      _id: myData._id,
      createdAt: myData.createdAt,
      updatedAt: myData.updatedAt
    }]))
  }, [ setAppliers ])
  
  useEffect(() => {
    if(applyFormValue?.outgoType === 'alone') applyMe()
  }, [ applyMe, applyFormValue ])

  useEffect(() => {
    applyMe()
  }, [ applyMe ])

  const submitHandler = useCallback(() => {
    const alerts = [
      (!applierValue || applierValue?.length === 0) && "신청자 목록",
      (!applyFormValue?.approver && "승인교사"),
      (!applyFormValue?.detailReason && "상세 사유"),
      (!applyFormValue?.outgoReason && "외출 사유"),
      ((!dateSelectorValue?.[0] || !+dateSelectorValue[0]) && "외출 시간"),
      ((!dateSelectorValue?.[1] || !+dateSelectorValue[1]) && "귀가 시간"),
      (isTimeSelected && (+(dateSelectorValue?.[0] || 0) >= +(dateSelectorValue?.[1] || 0))) && "시간 범위"
    ].filter<string>((e): e is string => !!e)
    
    console.log(isTimeSelected, +(dateSelectorValue?.[0] || 0), +(dateSelectorValue?.[1] || 0))

    if (alerts.length) {
      makeAlert.error(alerts.join(', ').을를 + " 다시 확인해주세요")
      return
    }

    const outgoRequestForm: OutgoRequestForm =  {
      applier: applierValue!!.map(e => e._id),
      approver: applyFormValue!!.approver!!,
      reason: applyFormValue!!.outgoReason!!,
      detailReason: applyFormValue!!.detailReason,
      duration: {
        start: dateSelectorValue!![0],
        end: dateSelectorValue!![1]
      }
    }

    requestOutgo(outgoRequestForm).then(() => toast.success("외출 신청을 완료했습니다!"))
  }, [applierValue, applyFormValue, dateSelectorValue, isTimeSelected]);

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
            {applyFormValue?.outgoType === 'group' ? <OutgoApplier {...applierInput} /> : <TextCardGroup content={[{
              text: <>
                <p>현재 외출 유형이 개인 외출로 지정되어있습니다.</p>
                <p>신청자를 추가하려면 유형을 단체 외출로 변경해주세요.</p>
              </>
            }]} /> }
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
                  {isTimeSelected ? <Info>
                    {
                      isDateRange ? <>
                        <DateHighlight>{dateSelectorValue!![0].getMonth() + 1}월 {dateSelectorValue!![0].getDate()}일 </DateHighlight>
                        {dateSelectorValue!![0].getHours()}시 {dateSelectorValue!![0].getMinutes()}분 부터{" "}
                        <br />
                        <DateHighlight>{dateSelectorValue!![1].getMonth() + 1}월 {dateSelectorValue!![1].getDate()}일 </DateHighlight>
                        {dateSelectorValue!![1].getHours()}시 {dateSelectorValue!![1].getMinutes()}분 까지{" "}
                      </> : <>
                        {dateSelectorValue!![0].getMonth() + 1}월 {dateSelectorValue!![0].getDate()}일,
                        <br />
                        <DateHighlight>{dateSelectorValue!![0].getHours()}시 {dateSelectorValue!![0].getMinutes()}분</DateHighlight> 부터{" "}
                        <DateHighlight>{dateSelectorValue!![1].getHours()}시 {dateSelectorValue!![1].getMinutes()}분</DateHighlight> 까지
                      </>
                    }
                    <br /> 외출을 신청합니다
                  </Info> : null}
                  <CardExplainContent css={isTimeSelected && css`margin-top: 36px;`}>
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
