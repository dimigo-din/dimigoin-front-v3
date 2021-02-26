import css from "@emotion/css"
import styled from "@emotion/styled"
import React from "react"
import { Card } from "../../../components"
import { circleApplicationStatusKorMapper, CircleApplicationStatusValues, SMALL_SCREEN_THRESHOLD } from "../../../constants"
import { Circle, CirclePeriod } from "../../../constants/types"
import { CircleWithApplication } from "."
import Skeleton from "react-loading-skeleton"

const statusLabelMap = {
    applied: "결과 대기중",
    "document-fail": "수고하셨습니다",
    "document-pass": "자세히 보기",
    "interview-fail": "수고하셨습니다",
    "interview-pass": "최종 선택",
    "final": "수고하셨습니다"
}

export const DummyCircleCard: React.FC = (props) => <Wrapper {...props} disableSpace>
    <PaddingWrapper>
        <Skeleton width={70} height={70} />
        <ContentWrapper>
            <Category><Skeleton width={100} /></Category>
            <Name><Skeleton width={50} /></Name>
            <Content>
                <Status>
                    <Skeleton width={100} />
                </Status>
            </Content>
        </ContentWrapper>
    </PaddingWrapper>

</Wrapper>

export const CircleCard: React.FC<CircleWithApplication & {
    openSideDetail(): void;
    finalSelect(): void;
}> = ({
    imageUrl,
    name,
    category,
    status,
    openSideDetail,
    finalSelect,
    description,
    ...props
}) => {
        return <Wrapper {...props} onClick={status ? undefined : openSideDetail} disableSpace>
            <PaddingWrapper>
                <Logo src={imageUrl} />
                <ContentWrapper>
                    <Category>{category}</Category>
                    <Name>{name}</Name>
                    <Content>
                        {status ? <Status status={status}>
                            {circleApplicationStatusKorMapper[status]}
                        </Status> :
                            <Description>
                                {description.slice(0, 36)}
                            </Description>}
                    </Content>
                </ContentWrapper>
            </PaddingWrapper>
            <ApplyButton status={status} onClick={status ? {
                applied: openSideDetail,
                "document-fail": undefined,
                "document-pass": undefined,
                "interview-fail": undefined,
                "interview-pass": finalSelect,
                final: undefined,
            }[status] : openSideDetail}>
                {status ? statusLabelMap[status] : "자세히보기"}
            </ApplyButton>
        </Wrapper>
    }

const Description = styled.p`
    font-size: 15px;
    font-weight: 700;
    color: #9A9A9A;
    line-height: 18px;
`

const statusColorMap = {
    applied: "#B8B8B8",
    "document-fail": "#B8B8B8",
    "document-pass": "#2888DD",
    "interview-fail": "#B8B8B8",
    "interview-pass": "#57B894",
    "final": "#E83C77"
}
const ApplyButton = styled.div<{ status?: typeof CircleApplicationStatusValues[number] | null }>`
    background-color: ${({ status }) => status ? (statusColorMap)[status] : "#E83C77"};
    padding: 16px 0px;
    text-align: center;
    color: white;
    font-size: 17px;
    font-weight: 700;
`

const Content = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 12px 0px;
    @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
        margin-bottom: 0px;
    }
`

const PaddingWrapper = styled.div`
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    padding: 0px;
    flex-direction: row;
    margin-bottom: 16px;
}
`

const Wrapper = styled(Card)`
    display: inline-flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 210px;
    height: 320px;
    padding: 0px;
    border-radius: 5px;
    overflow: hidden;
    margin: 40px;
    @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
        flex: 1;
        width: inherit;
        height: inherit;
        margin: 0px;
        margin-top: 12px;
    }
`

const Logo = styled.img`
    width: 70px;
    height: 70px;
    object-fit: cover;
`

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;

    @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
        align-items: flex-start;
        margin-left: 12px;
    }
`

const Category = styled.p`
    font-weight: 800;
    font-size: 11px;
    color: #8A8A8A;
    margin-top: 20px;
    @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
        margin-top: 0px;
    }
`

const Name = styled.p`
    font-size: 20px;
    font-weight: 800;
    margin-top: 12px;

    @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
        font-size: 16px;
    }
`

const Status = styled.p<{ status?: typeof CircleApplicationStatusValues[number] | null }>`
    font-size: 20px;
    font-weight: 700;
    color: ${({ status }) => status ? (statusColorMap)[status] : "#E83C77"};
    @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
        font-size: 16px;
    }
`
