import css from "@emotion/css"
import styled from "@emotion/styled"
import React from "react"
import { Card } from "../../../components"
import { circleApplicationStatusKorMapper, CircleApplicationStatusValues } from "../../../constants"
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

export const DummyCircleCard: React.FC = (props) => <Wrapper {...props}>
    <PaddingWrapper>
        <Skeleton width={70} height={70} />
        <Category><Skeleton width={100} /></Category>
        <Name><Skeleton width={50} /></Name>
        <Content>
            <Status>
                <Skeleton width={100} />
            </Status>
        </Content>
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
        return <Wrapper {...props} onClick={status ? undefined : openSideDetail}>
            <PaddingWrapper>
                <Logo src={imageUrl} />
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
`

const PaddingWrapper = styled.div`
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
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
`

const Logo = styled.img`
    width: 70px;
    height: 70px;
    object-fit: cover;
`

const Category = styled.p`
    font-weight: 800;
    font-size: 11px;
    color: #8A8A8A;
    margin-top: 20px;
`

const Name = styled.p`
    font-size: 20px;
    font-weight: 800;
    margin-top: 12px;
`

const Status = styled.p<{ status?: typeof CircleApplicationStatusValues[number] | null }>`
    font-size: 20px;
    font-weight: 700;
    color: ${({ status }) => status ? (statusColorMap)[status] : "#E83C77"};
`
