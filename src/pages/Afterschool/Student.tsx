import css from "@emotion/css"
import styled from "@emotion/styled"
import React, { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { applyAfterschoolClass, getAfterschoolClassList, getAppliedClasses, unapplyAfterschoolClass } from "../../api"
import { Card, CardGroupHeader, Col, Divider, NoData, PageWrapper, ResponsiveWrapper } from "../../components"
import { CardHeader, CardDetail, CardContent } from "../../components/basic/CardComponent"
import { dayEngKorMapper, engDays, SMALL_SCREEN_THRESHOLD } from "../../constants"
import { Doc, AfterschoolClass, AfterschoolClassApplication, EngDay } from "../../constants/types"
import useInput from "../../hooks/useInput"
import { selfStudyTimesToString } from "../../utils"
import { WeekDaySelector } from "./WeekDaySelector"

const AfterschoolApply: React.FC = () => {
    const [afterschoolClassList, setAfterschoolClassList] = useState<Doc<AfterschoolClass>[] | null>()
    const [appliedClasses, setAppliedClasses] = useState<Doc<AfterschoolClassApplication>[] | null>()
    const weekDaySelectorInput = useInput<number | null>(null)
    // const weekDaySelectorValue = weekDaySelectorInput.value

    const [ filteredClasses, setFilteredClasses ] = useState<Doc<AfterschoolClass>[] | null>()

    useEffect(() => {
        // console.log()
        if(weekDaySelectorInput.value === null) setFilteredClasses(() => afterschoolClassList)
        else setFilteredClasses(() => afterschoolClassList?.filter(afterschoolClass =>
            afterschoolClass.days.includes(engDays[weekDaySelectorInput.value!!] as EngDay
        )))
    }, [ weekDaySelectorInput.value, afterschoolClassList ])

    const fetchClassListData = useCallback(() => {
        getAfterschoolClassList()
            .then(setAfterschoolClassList)
            .catch(() => setAfterschoolClassList(null))
    }, [setAfterschoolClassList])

    const fetchAppliedClassData = useCallback(() => {
        getAppliedClasses()
            .then(setAppliedClasses)
            .catch(() => setAppliedClasses(null))
    }, [])

    const fetchData = useCallback(() => {
        fetchClassListData()
        fetchAppliedClassData()
    }, [fetchClassListData, fetchAppliedClassData])

    const applyClass = useCallback((classId: string, className: string) => {
        applyAfterschoolClass(classId)
            .then(() => toast.success(`"${className}" 강의를 신청했습니다`))
            .catch(() => toast.info(`"${className}" 강의를 신청하지 못했습니다`))
            .finally(() => fetchData())
    }, [fetchData])

    const unapplyClass = useCallback((classId: string, className: string) => {
        unapplyAfterschoolClass(classId)
            .then(() => toast.success(`"${className}" 강의 신청을 취소했습니다`))
            .catch(() => toast.info(`"${className}" 강의 신청을 취소하지 못했습니다`))
            .finally(() => fetchData())
    }, [fetchData])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return <PageWrapper>
        <RootWrapper mobileReverse threshold={780}>
            <Col width={7}>
                <CardGroupHeader
                    subButton={{
                        text: "신청한 강좌는 빨간 선으로 표시됩니다"
                    }}>
                    방과후
                </CardGroupHeader>
                <RegisterColumnWrapper>
                    <ResponsiveWeekDaySelector {...weekDaySelectorInput} />
                    <Divider small data-divider />
                    <CardGridWrapper>
                        {filteredClasses?.map(afterschoolClass => {
                            const applied = appliedClasses?.some(({ afterschool: registeredClass }) => registeredClass._id === afterschoolClass._id)
                            return (
                                <ClassCard
                                    key={afterschoolClass._id}
                                    onClick={() => (applied ? unapplyClass : applyClass)(afterschoolClass._id, afterschoolClass.name)}
                                    disableSpace
                                    leftBorder={applied}
                                >
                                    <CardHeaderWrapper>
                                        <CardHeader>{afterschoolClass.name}</CardHeader>
                                        <CountDisplay>{afterschoolClass.applierCount}/{afterschoolClass.capacity}명</CountDisplay>
                                    </CardHeaderWrapper>
                                    <CardDetailWrapper>
                                        <CardDetail>{afterschoolClass.teacher.name} 선생님,</CardDetail>
                                        <CardDetail>{afterschoolClass.days?.map(day => dayEngKorMapper[day]).join(' ')}요일,</CardDetail>
                                        <CardDetail>{selfStudyTimesToString(afterschoolClass.times)}타임</CardDetail>
                                    </CardDetailWrapper>
                                    <CardContent>
                                        {afterschoolClass.description}
                                    </CardContent>
                                    <ContentPopup>{afterschoolClass.description}</ContentPopup>
                                </ClassCard>)
                        }
                        )}
                    </CardGridWrapper>
                </RegisterColumnWrapper>
            </Col>
            <Divider small data-divider />
            <Col width={3}>
                <CardGroupHeader>
                    신청목록
                </CardGroupHeader>
                {appliedClasses?.length
                    ? appliedClasses?.map(({ afterschool: appliedClass }) =>
                        <Card onClick={() => unapplyClass(appliedClass._id, appliedClass.name)}>
                            <CardHeader>{appliedClass.name}</CardHeader>
                            <CardDetailWrapper>
                                <CardDetail>{appliedClass.teacher.name} 선생님,</CardDetail>
                                <CardDetail>{appliedClass.days?.map(day => dayEngKorMapper[day]).join(' ')}요일,</CardDetail>
                                <CardDetail>{selfStudyTimesToString(appliedClass.times)}타임</CardDetail>
                            </CardDetailWrapper>
                        </Card>)
                    : <Card><NoData>신청한 강좌가 없습니다</NoData></Card>}
            </Col>
        </RootWrapper>
    </PageWrapper>
}

export default AfterschoolApply

const ClassCard = styled(Card)`
    margin: 12px;
    width: 270px;
    height: 210px;
    box-sizing: border-box;
`

const RootWrapper = styled(ResponsiveWrapper)`
    /* flex-direction */
`

const RegisterColumnWrapper = styled(ResponsiveWrapper)`
    align-items: flex-start;
    @media screen and (max-width: 720px) {
        align-items: stretch;
    }
`

const CardGridWrapper = styled(ResponsiveWrapper)`
    flex-wrap: wrap;
    margin: -12px;
    @media screen and (max-width: 1100px) {
        flex: 1;
        flex-direction: column;
        &>* {
            width: unset !important;
            flex: 1;
        }
    }
`

const CardDetailWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 6px;
`

const CardHeaderWrapper = styled.div`
    display: flex;
`

const CountDisplay = styled(CardHeader)`
    color: var(--main-theme-accent);
    flex-shrink: 0;
    flex-grow: 0;
    white-space: nowrap;
`

const ContentPopup = styled.p`
    transition: 300ms cubic-bezier(0, 0.76, 0.12, 0.98);
    opacity: 0;
    position: absolute;
    width: 215px;
    font-size: 17px;
    background-color: #fff;
    line-height: 24px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.03);
    padding: 12px;
    box-sizing: border-box;
    @media screen and (min-width: ${SMALL_SCREEN_THRESHOLD}px) {
        &:hover {
            opacity: 1;
        }
    }
    @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
        font-size: 14px;
    }
`

const ResponsiveWeekDaySelector = styled(WeekDaySelector)`  
    @media screen and (max-width: 720px) {
        display: flex;
        flex: 1;
        &>div {
            width: unset;
            flex: 1;
        }
    }
`
