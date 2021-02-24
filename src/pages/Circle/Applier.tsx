import css from "@emotion/css"
import React, { useCallback, useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import styled from "styled-components"
import { getAllCircles, getAppliedCircles } from "../../api/circle"
import { CardGroupHeader, PageWrapper } from "../../components"
import { CircleApplicationStatusValues } from "../../constants"
import { Circle, CircleApplication, CirclePeriod } from "../../constants/types"
import { useConfig } from "../../hooks/api"
import { CircleCard } from "./CircleCard"

const getSubheaderText = (currentPeriod: CirclePeriod, maxApplyAmount: number) => ({
    [CirclePeriod.application]: `동아리 지원은 3월 10일 ~ 3월 20일까지, 최대 ${maxApplyAmount}개까지 가능합니다.`,
    [CirclePeriod.interview]: "면접은 3월 25일부터 4월 7일까지 진행됩니다.",
    [CirclePeriod.final]: "최종 선택은 되돌릴 수 없으니 신중하게 생각해주세요."
})[currentPeriod]

export interface CircleWithApplyStatus extends Circle {
    status?: typeof CircleApplicationStatusValues[number] | null
}

export const Applier: React.FC = () => {
    const config = useConfig()
    const [circles, setCircles] = useState<CircleWithApplyStatus[] | null>()

    const fetchData = useCallback(async () => {
        const fetchedCircles = await getAllCircles()
        const fetchedAppliedCircles = (await getAppliedCircles()).applications.reduce((matched, current) => {
            return {
                ...matched,
                [current.circle._id]: current
            }
        }, {} as {
            [key: string]: CircleApplication | undefined
        })
        const circlesListWithAppliedStatus = (fetchedCircles.reduce<CircleWithApplyStatus[]>((matched, current, index) => [
            ...matched.slice(0, index),
            {
                ...current,
                status: fetchedAppliedCircles[current._id]?.status || null
            },
            ...matched.slice(index + 1),
        ], fetchedCircles))
        setCircles(() => circlesListWithAppliedStatus)
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

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
            <GridWrapper>
                {circles?.map(circle =>
                    <CircleCard
                        css={css`margin: 40px;`}
                        {...circle}
                    />)}
            </GridWrapper>
        </PageWrapper>
    )
}

const GridWrapper = styled.div`
    margin: -40px;
    padding-top: 14px;
`

export default Applier
