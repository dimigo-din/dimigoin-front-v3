import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import css from "@emotion/css";
import Skeleton from "react-loading-skeleton";
import {
  PageWrapper, ResponsiveWrapper, Col, CardGroupHeader, Card,
  CardTitle, Divider, IngansilStatus, TextCardGroup
} from "../../components";
import { ReactComponent as CircleSvg } from "../../assets/icons/circle.svg";
import { APIResource } from "../../api";
import {
  IngangApplyPeriod, IngangsilTicket,
  NightSelfStudyTimeKey, Permission, Student
} from "../../constants/types";
import { useMyData } from "../../hooks/api/useMyData";
import { applyIngangsil, getMyIngangsilStatus, unapplyIngangsil } from "../../api/ingangsil";
import { SMALL_SCREEN_THRESHOLD } from "../../constants";

const timeRangeToString = ({ start, end }: IngangApplyPeriod) => (
  `${start.hour.toString().padStart(2, '0')}:${start.minute.toString().padStart(2, '0')} ~ ` +
  `${end.hour.toString().padStart(2, '0')}:${end.minute.toString().padStart(2, '0')}`
);

const Ingangsil: React.FC = () => {
  const [myStatus, setFetchedMyStatus] = useState<APIResource["myIngangsilApplyStatus"]["res"]>()
  const [groupedByTime, setGroupedByTime] = useState<Record<NightSelfStudyTimeKey, IngangsilTicket[]>>()
  const myData = useMyData() as Student

  useEffect(() => {
    const _groupedByTime = myStatus?.applicationsInClass.reduce((acc, current) => {
      acc[current.time] = [...(acc[current.time] || []), current]
      return acc
    }, {
      [NightSelfStudyTimeKey.NSS1]: [],
      [NightSelfStudyTimeKey.NSS2]: []
    } as Record<NightSelfStudyTimeKey, IngangsilTicket[]>)
    setGroupedByTime(() => _groupedByTime)
  }, [ myStatus ])

  const loadStatus = useCallback(() => {
    return getMyIngangsilStatus().then(setFetchedMyStatus)
  }, [setFetchedMyStatus])
  useEffect(() => {
    const timer = setInterval(() => loadStatus(), 1000)
    return () => {
      clearInterval(timer)
    }
  }, [loadStatus]);

  return (
    <>
      <PageWrapper>
        <ResponsiveWrapper threshold={1100} css={css`
          @media screen and (max-width: 1100px) {
            flex-direction: column-reverse;
          }
        `}>
          <Col width={4.5}>
            <CardGroupHeader>신청안내</CardGroupHeader>
            <Card
              css={css`
                padding: 36px;
                @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
                  padding: 24px 18px;
                }
              `}
              leftBorder
            >
              <ResponsiveWrapper>
                <Col>
                  <CardTitle
                    css={css`
                      margin-bottom: 24px;
                    `}
                  >
                    {myData?.grade}학년 신청 시간
                  </CardTitle>
                  <Row>
                    <Time />
                    <Desc>
                      {myStatus ? timeRangeToString(myStatus.ingangApplyPeriod) : <Skeleton width={120} />}
                    </Desc>
                  </Row>
                  <Row>
                    <People />
                    <Desc>
                      {myStatus ? <>한 학급당 최대 <b>{myStatus.ingangMaxApplier}명</b></> : <Skeleton width={120} />}
                    </Desc>
                  </Row>
                  <Row>
                    <DateIcon />
                    <Desc>
                      {myStatus ? <>일주일 최대 <b>{myStatus.weeklyTicketCount}회</b></> : <Skeleton width={120} />}
                    </Desc>
                  </Row>
                </Col>
                <Divider data-divider visible />
                <Col width={10}>
                  <CardTitle
                    css={css`
                      margin-bottom: 24px;
                    `}
                  >
                    내 티켓
                  </CardTitle>
                  <Row
                    css={css`
                      color: var(--main-theme-accent);
                    `}
                  >
                    {myStatus ? (<>
                      <Ticket />
                      <Desc>
                        남은 티켓 <b>{myStatus?.weeklyRemainTicket}/{myStatus?.weeklyTicketCount}</b>
                      </Desc>
                    </>) : <Skeleton width={100} />}
                  </Row>
                  <Row>
                    <Info>
                      <p>
                        티켓을 모두 소진하면 신청할 수 없습니다. <br></br>
                        인강실 사용이 꼭 <b>필요할 때만 신청</b>하시기 바랍니다.
                        </p>
                    </Info>
                  </Row>
                </Col>
              </ResponsiveWrapper>
            </Card>
            <TextCardGroup
              css={css`
                margin-top: 10px;
              `}
              spaceBetweenCards
              content={[
                {
                  key: "notice1",
                  children: (
                    <Info>
                      <p>
                        인강실에서는 인터넷 강의, 교과 과제, 프로그래밍 등{" "}
                        <b>학습 관련 활동</b> 만 가능합니다.
                      </p>
                      <p>
                        관련 없는 이외 활동 적발시 블랙리스트에 등록되며 이후
                        인강실 이용이 불가합니다.
                      </p>
                    </Info>
                  ),
                  leftBorder: true,
                },
                {
                  key: "notice2",
                  children: (
                    <Info>
                      <p>
                        쾌적한 인터넷 환경을 위해 과제와 관련 없는{" "}
                        <b>기타 활동은 금지</b> 됩니다.
                      </p>
                      <p>와이파이는 모두가 공유하는 공공재입니다.</p>
                    </Info>
                  ),
                  leftBorder: true,
                },
              ]}
            />
            <Divider horizontal small data-divider />
            <CardGroupHeader subButton={myData?.permissions.includes(Permission["ingang-application"]) ? {
              text: "인원관리",
              route: '/ingangsil/manager'
            } : undefined}>우리반 신청자</CardGroupHeader>
            {[...Array(2)].map((_, index) => {
              const currentTimeAppliers = groupedByTime?.[NightSelfStudyTimeKey[index === 0 ? "NSS1" : "NSS2"]]
              return (<IngangsilApplierWrapper leftBorder>
                <ResponsiveWrapper>
                  <IngangTime>{index + 1}타임</IngangTime>
                  <Divider small data-divider />
                  <IngangerWrapper>
                    {currentTimeAppliers ? // 로드가 됐으면
                      currentTimeAppliers.length === 0 ? // 신청자가 없으면
                        <Inganger>신청자가 없습니다</Inganger> :
                        currentTimeAppliers.map(({ applier: { name, number } }) => ( // 신청자가 있으면
                          <Inganger key={number}>{number} {name}</Inganger>
                        )) : <>
                        <Inganger><Skeleton width={60} /></Inganger> {/* 로드가 안됐으면 */}
                        <Inganger><Skeleton width={60} /></Inganger>
                        <Inganger><Skeleton width={60} /></Inganger>
                      </>}
                  </IngangerWrapper>
                </ResponsiveWrapper>
              </IngangsilApplierWrapper>)
            })}
          </Col>
          <Divider data-divider />
          <Col width={5.5}>
            {[...Array(2)].map((_, index) => {
              const selfStudyId = NightSelfStudyTimeKey[index === 0 ? "NSS1" : "NSS2"]
              const currentTimeAppliers = groupedByTime?.[selfStudyId]
              const applied = myData && currentTimeAppliers?.map(e => e.applier._id).includes(myData?._id)
              return (<>
                {index !== 0 && <Divider horizontal small data-divider />}
                <IngansilStatus
                  key={`ingangsil${index}`}
                  onSubmit={async () => {
                    if (applied) await unapplyIngangsil(selfStudyId)
                    else await applyIngangsil(selfStudyId)
                    await loadStatus()
                  }}
                  name={`야간 자율학습 ${index + 1}타임`}
                  currentApplied={currentTimeAppliers?.length}
                  max={myStatus?.ingangMaxApplier}
                  isApplied={applied}
                  time={myStatus?.selfStudyTimes[selfStudyId]}
                /></>
              )
            })}
          </Col>
        </ResponsiveWrapper>
      </PageWrapper>
    </>
  );
};

const Row = styled.div`
  display: flex;
  font-size: 16px;
  color: #8a8a8a;

  & + div {
    margin-top: 24px;
    @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
      margin-top: 12px;
    }
  }

  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    font-size: 14px;
  }
`;

const Desc = styled.div`
  margin-left: 12px;

  & b {
    font-weight: 800;
  }
`;

const Time = styled.i`
  & {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(var(--ggs, 0.7));
    margin-top: -2px;
    width: 18px;
    height: 18px;
    border-radius: 100%;
    border: 2px solid transparent;
    box-shadow: 0 0 0 2px currentColor;
  }

  &::after {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 7px;
    height: 7px;
    border-left: 2px solid;
    border-bottom: 2px solid;
    top: 1px;
    left: 5px;
  }
`;

const People = styled(CircleSvg)`
  width: 18px;
  height: 18px;
  vertical-align: middle;
`;

const DateIcon = styled.i`
  & {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(var(--ggs, 0.8));
    margin-top: -2px;
    width: 18px;
    height: 18px;
    border: 2px solid;
    border-radius: 3px;
  }

  &::after,
  &::before {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    border-radius: 3px;
    height: 2px;
    left: 2px;
  }

  &::before {
    background: currentColor;
    width: 2px;
    box-shadow: 4px 0 0, 8px 0 0, 0 4px 0, 4px 4px 0, 8px 4px 0;
    top: 6px;
  }

  &::after {
    width: 10px;
    top: -4px;
    box-shadow: 0 6px 0 0;
  }
`;

const Ticket = styled.i`
  & {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(var(--ggs, 0.8));
    margin-top: -2px;
    width: 24px;
    height: 18px;
    border: 2px solid;
    border-radius: 3px;
  }

  &::after,
  &::before {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    border-radius: 3px;
    width: 2px;
    height: 18px;
    right: 9px;
    top: -2px;
    background: currentColor;
  }

  &::after {
    width: 5px;
    height: 2px;
    box-shadow: 0 4px 0, 0 8px 0;
    top: 2px;
    right: 2px;
  }
`;

const Info = styled.div`
  color: #8a8a8a;
  line-height: 24px;
  & p + p {
    margin-top: 12px;
  }

  & b {
    font-weight: 900;
  }
`;

const Inganger = styled.div`
  color: #8a8a8a;
  margin: 8px;
  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    font-size: 14px;
  }
`;

const IngangTime = styled(CardTitle)`
  margin-bottom: 0px;
  flex-basis: 1;
  flex-shrink: 0;
`;

const IngangerWrapper = styled.div`
  margin: -8px;
  display: flex;
  flex-wrap: wrap;
`

const IngangsilApplierWrapper = styled(Card)`
  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    padding: 24px 18px;
  }
`

export default Ingangsil
