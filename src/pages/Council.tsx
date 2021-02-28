import css from '@emotion/css'
import React, { useEffect, useState } from 'react'
import { Card, CardExplainContent, CardGroupHeader, Col, Data,
        DescriptionText, Divider, HeadData, HeadRow, Horizontal,
        NavigationBar, Outlink, PageWrapper, RadioButton, Row, Table } from '../components'
import makeAlert from '../functions/makeAlert'

interface CouncilSchedule {
    date: [Date, Date];
    detail?: string;
}

const getCouncilSchedule = async (): Promise<CouncilSchedule[]> => [{
    date: [new Date('2021-01-01'), new Date('2021-01-01')],
    detail: '2교시 수업시간'
}, {
    date: [new Date('2021-01-02'), new Date('2021-01-02')],
    detail: '3교시 수업시간'
}, {
    date: [new Date('2021-01-03'), new Date('2021-01-03')],
    detail: '4교시 수업시간'
}, {
    date: [new Date('2021-01-04'), new Date('2021-01-04')],
    detail: '5교시 수업시간'
}, {
    date: [new Date('2021-01-05'), new Date('2021-01-05')],
    detail: '야자 2타임'
}]

const Council: React.FC = () => {
    const [councilSchedules, setCouncilSchedule] = useState<CouncilSchedule[] | null>()
    useEffect(() => {
        getCouncilSchedule()
            .then(setCouncilSchedule)
            .catch(() => {
                makeAlert.error("상담 일정 정보를 불러오는데 실패했습니다.")
                setCouncilSchedule(null)
            })
    }, [])
    return <>
        <PageWrapper>
        <Horizontal>
        <Col width={5}>
            <CardGroupHeader>Wee 클래스 상담</CardGroupHeader>
            <Card leftBorder>
                <CardExplainContent>
                    <h2>Wee 클래스 상담이란?</h2>
                    <p>
                        Wee 클래스 상담은 친구·가족·이성관계, 학교폭력, 진로,
                        성격문제, 인터넷·스마트폰과 같이
                        학교생활, 학업문제 전반에 걸친 폭넓은 고민거리를 주제로
                        상담사 김주은께서 진행하시는 상담입니다.
                    </p>
                    <h2>신청방법</h2>
                    <p>
                        Wee 클래스 상담실(본관 2층 남쪽 복도 끝)에 직접 방문하여
                        상담 신청서를 작성한 후 상담 시간을 예약하거나, 
                        이 페이지의 하단에서 받을 수 있는 상담 신청서를 작성하여
                        다음 이메일 주소로 전송한 이후 회신을 확인합니다.</p>
                    <Outlink>hotsoul486@naver.com &gt;</Outlink>
                    <h2>주의사항</h2>
                    <p>
                        수업시간에 상담을 진행할 경우 보호자의 동의가 필요하며,
                        이에 필요한 보호자 동의서는 상담 신청서와 함께
                        이 페이지의 하단에서 받을 수 있습니다.
                    </p>
                    <DescriptionText css={css`margin-top: 12px;`}>
                        ※ 상담 신청과 상담 내용을 비롯한 상담 관련 정보는 모두 비밀 엄수를 보장합니다
                    </DescriptionText>
                </CardExplainContent>
            </Card>
        </Col>
        <Divider />
        <Col width={5}>
            <CardGroupHeader>취업 상담</CardGroupHeader>
            <Card leftBorder>
                <CardExplainContent>
                    <h2>취업상담이란?</h2>
                    <p>
                        취업 상담은 이미순 취업지원관 선생님께서 진행하는 상담으로
                        매주 월요일, 화요일에 상담 신청자에 한하여
                        신관 IT부서에서 진행됩니다.
                    </p>
                    <h2>신청방법</h2>
                    <p>
                        아래의 항목에서 원하는 일시에 상담을 신청하고, 상담하고
                        싶은 주제 혹은 내용에 대해 아래 이메일 주소로 메일을 보냅니다.
                    </p>
                    <Outlink>
                        soon040821@naver.com &gt;
                    </Outlink>
                </CardExplainContent>
            </Card>
            <Table css={css`margin-top: 12px;`}>
                <HeadRow>
                    <HeadData>선택</HeadData>
                    <HeadData>요일</HeadData>
                    <HeadData>날짜</HeadData>
                    <HeadData>시간</HeadData>
                    <HeadData>비고</HeadData>
                </HeadRow>
                {councilSchedules?.map(councilSchedule => {
                    const buttonName = councilSchedule.date[0].getDate().toString()
                    return (
                        <Row key={councilSchedule.detail}>
                            <Data>
                                <RadioButton id={buttonName} name="councilradio" />
                            </Data>
                            <Data>
                                <label htmlFor={buttonName}>월요일</label>
                            </Data>
                            <Data>
                                <label htmlFor={buttonName}>6월 6일</label>
                            </Data>
                            <Data>
                                <label htmlFor={buttonName}>
                                    10시 0분 ~ 10시 50분
                                </label>
                            </Data>
                            <Data>
                                <label htmlFor={buttonName}>
                                    2교시 수업시간
                                </label>
                            </Data>
                        </Row>)
                })}
            </Table>
        </Col>
        </Horizontal>
        </PageWrapper>
    </>
}

export default Council