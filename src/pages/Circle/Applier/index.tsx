import css from "@emotion/css"
import React, { useCallback, useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import styled from "styled-components"
import { getAllCircles, getAppliedCircles, finalSelect as _finalSelect } from "../../../api/circle"
import { showModal, Card, PageWrapper, ResponsiveWrapper, Col, CardGroupHeader, Divider, NoData, TextCard } from "../../../components"
import { CircleApplicationStatusValues, SMALL_SCREEN_THRESHOLD } from "../../../constants"
import { CirclePeriod, Circle, Doc, CircleApplication } from "../../../constants/types"
import { swal } from "../../../functions/swal"
import { useConfig } from "../../../hooks/api"
import DangerIcon from "../../../assets/icons/danger.svg"
import { CircleCard, DummyCircleCard } from "./CircleCard"
import { CircleDetail } from "./CircleDetail"
import { MyApplication } from "./MyApplication"
import { NewApply } from "./NewApply"
import { toast } from "react-toastify"

const getSubheaderText = (currentPeriod: CirclePeriod, maxApplyAmount: number) => ({
    [CirclePeriod.application]: `동아리 지원은 3월 10일 ~ 3월 20일까지, 최대 ${maxApplyAmount}개까지 가능합니다.`,
    [CirclePeriod.interview]: "면접은 3월 25일부터 4월 7일까지 진행됩니다.",
    [CirclePeriod.final]: "최종 선택은 되돌릴 수 없으니 신중하게 생각해주세요."
})[currentPeriod]

export interface CircleWithApplication extends Circle {
    status?: typeof CircleApplicationStatusValues[number] | null;
    form?: Record<string, string> | null;
    applicationId?: string | null;
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
            name={`${circle.name} 지원서류`}
            form={circle.form ? circle.form : undefined}
            close={close}
            isModal={isModal}
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
        if(!config) return
        const fetchedCircles = await getAllCircles()
        const fetchedAppliedCircles = (await getAppliedCircles()).applications.reduce((matched, current) => {
            return {
                ...matched,
                [current.circle._id]: current
            }
        }, {} as {
            [key: string]: Doc<CircleApplication> | undefined
        })
        const circlesListWithAppliedStatus = (fetchedCircles.reduce<Doc<CircleWithApplication>[]>((matched, current, index) => [
            ...matched.slice(0, index),
            {
                ...current,
                status: fetchedAppliedCircles[current._id]?.status || null,
                form: fetchedAppliedCircles[current._id]?.form || null,
                applicationId: fetchedAppliedCircles[current._id]?._id || null
            },
            ...matched.slice(index + 1),
        ], fetchedCircles))
        if (config.CIRCLE_PERIOD === CirclePeriod.application)
            setCircles(() => circlesListWithAppliedStatus)
        else
            setCircles(() => circlesListWithAppliedStatus.filter(circle => circle.applied))
    }, [config])

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
    }, [circles, fetchData])

    const finalSelect = useCallback(async (index: number) => {
        const selected = circles?.[index]
        if (!selected) return
        if (!selected.applicationId) {
            toast.error("해당 동아리에 지원한 이력이 없어요")
            return
        }
        const { isConfirmed } = await swal({
            title: `${selected.name}을 선택하시겠어요?`,
            html: <>
                <p>"{selected.name}"를 최종 동아리로 선택해요.</p>
                <p>이 작업은 취소할 수 없어요.</p>
            </>,
            imageUrl: DangerIcon,
            showCancelButton: true,
            focusCancel: true
        })
        if (!isConfirmed) return
        await _finalSelect(selected.applicationId)
        await fetchData()
    }, [circles, fetchData])

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

                    {circles ? circles.length ? <GridWrapper>{circles.map((circle, index) =>
                        <CircleCard
                            key={circle._id}
                            {...circle}
                            finalSelect={() => finalSelect(index)}
                            openSideDetail={() => openDetail(index)}
                        />)}
                    </GridWrapper> : <TextCard>
                            <NoData>
                                {config?.CIRCLE_PERIOD === CirclePeriod.application ? "신청" : "상태 변경"} 가능한 동아리가 없어요 {circles.length}
                            </NoData>
                        </TextCard> : <>
                            <GridWrapper>
                                {[...Array(20)].map((_, index) =>
                                    <DummyCircleCard
                                        key={`dummy${index}`} />)}
                            </GridWrapper>
                        </>}

                </Col>
                {sideDetail && circles && <>
                    <Divider data-divider />
                    <Col width={5}>
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
                    </Col></>}
            </ResponsiveWrapper>
        </PageWrapper>
    )
}

const GridWrapper = styled.div`
    margin: -40px;
    /* padding-top: 14px; */
    display: flex;
    flex-wrap: wrap;
    @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
        flex-direction: column;
        margin: 0px;
    }
`

export default Applier
