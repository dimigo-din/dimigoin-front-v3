import css from "@emotion/css"
import React, { useCallback, useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import styled from "styled-components"
import { getAllCircles, getAppliedCircles } from "../../../api/circle"
import { showModal, Card, PageWrapper, ResponsiveWrapper, Col, CardGroupHeader } from "../../../components"
import { CircleApplicationStatusValues } from "../../../constants"
import { CirclePeriod, Circle, Doc, CircleApplication } from "../../../constants/types"
import { useConfig } from "../../../hooks/api"
import { CircleCard } from "./CircleCard"
import { CircleDetail } from "./CircleDetail"
import { MyApplication } from "./MyApplication"
import { NewApply } from "./NewApply"

const getSubheaderText = (currentPeriod: CirclePeriod, maxApplyAmount: number) => ({
    [CirclePeriod.application]: `동아리 지원은 3월 10일 ~ 3월 20일까지, 최대 ${maxApplyAmount}개까지 가능합니다.`,
    [CirclePeriod.interview]: "면접은 3월 25일부터 4월 7일까지 진행됩니다.",
    [CirclePeriod.final]: "최종 선택은 되돌릴 수 없으니 신중하게 생각해주세요."
})[currentPeriod]

export interface CircleWithApplication extends Circle {
    status?: typeof CircleApplicationStatusValues[number] | null
    form?: Record<string, string> | null
}

const CircleDetailBrancher: React.FC<{
    circle: Doc<CircleWithApplication>;
    type: | "DETAIL" | "NEW_APPLY" | "VIEW_APPLICATION";
    close(): void;
    isModal: boolean;
    goApply(): void;
}> = ({ circle, type, close, isModal, goApply }) => {
    return {
        DETAIL: <CircleDetail
            close={close}
            isModal={isModal}
            goApply={goApply}
            {...circle}
        />,
        NEW_APPLY: <NewApply
            close={close}
            isModal={isModal}
            {...circle}
        />,
        VIEW_APPLICATION: <MyApplication
            name={circle.name}
            form={circle.form ? circle.form : undefined}
            close={close}
        />
    }[type]
}

type SIDE_DETAIL_TYPE = | "DETAIL" | "NEW_APPLY" | "VIEW_APPLICATION"

export const Applier: React.FC = () => {
    const config = useConfig()

    const [circles, setCircles] = useState<Doc<CircleWithApplication>[] | null>()
    const [sideDetail, setSideDetail] = useState<{
        type: | "DETAIL" | "NEW_APPLY" | "VIEW_APPLICATION",
        selectedIndex: number,
        title?: string;
    } | null>(null)

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
        const circlesListWithAppliedStatus = (fetchedCircles.reduce<Doc<CircleWithApplication>[]>((matched, current, index) => [
            ...matched.slice(0, index),
            {
                ...current,
                status: fetchedAppliedCircles[current._id]?.status || null,
                form: fetchedAppliedCircles[current._id]?.form || null
            },
            ...matched.slice(index + 1),
        ], fetchedCircles))
        setCircles(() => circlesListWithAppliedStatus)
    }, [])

    const openDetail = useCallback((index: number, type: SIDE_DETAIL_TYPE = circles?.[index].applied ? "VIEW_APPLICATION" : "DETAIL") => {
        console.log(circles, index)
        if (!circles) return
        if (window.innerWidth < 1100) {
            showModal(close =>
                <CircleDetailBrancher
                    isModal
                    circle={circles[index]}
                    type={type}
                    goApply={() => {
                        close().then(() => openDetail(index, "NEW_APPLY"))
                        // setTimeout(() => )
                    }}
                    close={() => {
                        fetchData()
                        close()
                    }} />
                , {
                    wrapperProps: {
                        css: css`max-width: min(720px, 100vw); width: 100vw; height: 100vh; display: flex; padding: 60px 20px 20px;`
                    },
                    backdropProps: {
                        css: css`overflow-y: auto;`
                    }
                })
        }
        else setSideDetail(() => ({
            type,
            selectedIndex: index
        }))
    }, [circles])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return (
        <PageWrapper>
            <ResponsiveWrapper>
                <Col width={sideDetail ? 5 : 10}>
                    <CardGroupHeader subButton={config ? {
                        text: getSubheaderText(
                            config.CIRCLE_PERIOD,
                            config.CIRCLE_MAX_APPLY
                        ),
                    } : {
                            component: <Skeleton />
                        }}>동아리 지원</CardGroupHeader>
                    <GridWrapper>
                        {circles?.map((circle, index) =>
                            <CircleCard
                                key={circle._id}
                                css={css`margin: 40px;`}
                                {...circle}
                                openSideDetail={() => openDetail(index)}
                            />)}
                    </GridWrapper>
                </Col>
                {sideDetail && circles && <Col width={5}>
                    {/* <Card> */}
                    <CircleDetailBrancher
                        isModal={false}
                        goApply={() => {
                            setSideDetail(() => null)
                            openDetail(sideDetail.selectedIndex, "NEW_APPLY")
                        }}
                        circle={circles[sideDetail.selectedIndex]}
                        type={sideDetail.type}
                        close={() => {
                            fetchData()
                            setSideDetail(() => null)
                        }}
                    />
                    {/* </Card> */}
                </Col>}
            </ResponsiveWrapper>
        </PageWrapper>
    )
}

const GridWrapper = styled.div`
    margin: -40px;
    padding-top: 14px;
`

export default Applier
