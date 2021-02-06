import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import NavigationBar from "../components/complex/NavigationBar";
import css from "@emotion/css";
import {
  PageWrapper, ResponsiveWrapper, Col, CardGroupHeader, Card,
  CardTitle, Divider, IngansilStatus, TextCardGroup
} from "../components";
import { ReactComponent as CircleSvg } from "../assets/icons/circle.svg";
import ingangsil from "../api/ingangsil";
import { APIResource } from "../api";
import { IngangsilTicket, NightSelfStudyTime } from "../constants/types";
import { useMyData } from "../hooks/api/useMyData";

export default () => {
  const [myStatus, setFetchedMyStatus] = useState<APIResource["myIngangsilApplyStatus"]["res"]>()
  const myData = useMyData()
  const groupedByTime = myStatus?.applicationsInClass.reduce((acc, current) => {
    acc[current.time] = [...(acc[current.time] || []), current]
    return acc
  }, {
    [NightSelfStudyTime.NSS1]: [],
    [NightSelfStudyTime.NSS2]: []
  } as Record<NightSelfStudyTime, IngangsilTicket[]>)

  const loadStatus = useCallback(() => {
    ingangsil.getMyStatus().then(setFetchedMyStatus)
  }, [setFetchedMyStatus])
  
  useEffect(() => {
    const timer = setInterval(() => loadStatus(), 1000)
    return () => {
      clearInterval(timer)
    }
  }, [loadStatus]);

  return (
    <>
      <NavigationBar />
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
                    1학년 신청 시간
                  </CardTitle>
                  <Row>
                    <Time />
                    <Desc>07:00 ~ 08:15</Desc>
                  </Row>
                  <Row>
                    <People />
                    <Desc>
                      한 학급당 최대 <b>7명</b>
                    </Desc>
                  </Row>
                  <Row>
                    <DateIcon />
                    <Desc>
                      일주일 최대 <b>{myStatus?.weeklyTicketCount}회</b>
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
                    <Ticket />
                    <Desc>
                      남은 티켓 <b>{myStatus?.weeklyRemainTicket}/{myStatus?.weeklyTicketCount}</b>
                    </Desc>
                  </Row>
                  <Row>
                    <Info>
                      <p>티켓을 모두 소진하면 신청할 수 없습니다.</p>
                      <p>
                        인강실 사용이 꼭 <b>필요할 때만 신청</b>하시기 바랍니다.{" "}
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
            <CardGroupHeader withBubble>우리반 신청자</CardGroupHeader>
            {groupedByTime && [...Array(2)].map((_, index) =>
              <Card leftBorder>
                <ResponsiveWrapper>
                  <IngangTime>{index + 1}타임</IngangTime>
                  <Divider small data-divider />
                  <IngangerWrapper>
                    {groupedByTime[NightSelfStudyTime[index === 0 ? "NSS1" : "NSS2"]].map(({ applier: { name, number } }) => (
                      <Inganger key={number}>{number} {name}</Inganger>
                    ))}
                  </IngangerWrapper>
                </ResponsiveWrapper>
              </Card>)}
          </Col>
          <Divider data-divider />
          <Col width={5.5}>
            {[...Array(2)].map((_, index) => {
              const selfStudyId = NightSelfStudyTime[index === 0 ? "NSS1" : "NSS2"]
              const currentTimeAppliers = groupedByTime?.[selfStudyId]
              const applied = myData && currentTimeAppliers?.map(e => e.applier._id).includes(myData?._id)
              return (<>
                {index !== 0 && <Divider horizontal small data-divider />}
                <IngansilStatus
                  key={`ingangsil${index}`}
                  onSubmit={async () => {
                    if(applied) await ingangsil.unapply(selfStudyId)
                    else await ingangsil.apply(selfStudyId)
                    loadStatus()
                  }}
                  name={`야간 자율학습 ${index + 1}타임`}
                  currentApplied={currentTimeAppliers?.length}
                  max={myStatus?.ingangMaxApplier}
                  isApplied={applied}
                  time={["19:50 - 21:10", "21:10 - 22:30"][index]}
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
  &{
    
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