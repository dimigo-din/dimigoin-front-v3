import React from "react"
import Skeleton from "react-loading-skeleton"
import { CardGroupHeader, PageWrapper } from "../../components"
import { CirclePeriod } from "../../constants/types"
import { useConfig } from "../../hooks/api"

const getSubheaderText = (currentPeriod: CirclePeriod, maxApplyAmount: number) => ({
    [CirclePeriod.application]: `동아리 지원은 3월 10일 ~ 3월 20일까지, 최대 ${maxApplyAmount}개까지 가능합니다.`,
    [CirclePeriod.interview]: "면접은 3월 25일부터 4월 7일까지 진행됩니다.",
    [CirclePeriod.final]: "최종 선택은 되돌릴 수 없으니 신중하게 생각해주세요."
})[currentPeriod]

export const Applier: React.FC = () => {
    const config = useConfig()
    return (
        <PageWrapper>
            <CardGroupHeader subButton={config ? {
                text: getSubheaderText(
                    config.CIRCLE_PERIOD,
                    config.CIRCLE_MAX_APPLY
                ),
            } : {
                component: <Skeleton />
            }}>동아리 지원</CardGroupHeader>
            
        </PageWrapper>
    )
}

export default Applier
