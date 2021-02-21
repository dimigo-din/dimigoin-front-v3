import React, { useEffect } from "react"
import { CardGroupHeader, PageWrapper, ResponsiveWrapper } from "../../components"
import useInput from "../../hooks/useInput"
import { WeekDaySelector } from "./WeekDaySelector"

const AfterschoolApply: React.FC = () => {
    const weekDaySelectorInput = useInput<number>()
    const weekDaySelectorValue = weekDaySelectorInput.value

    // useEffect(() => console.log(weekDaySelectorValue), [weekDaySelectorValue])

    return <PageWrapper>
        <CardGroupHeader
            subButton={{
                text: "신청한 강좌는 빨간 선으로 표시됩니다"
            }}>
                방과후
            </CardGroupHeader>
        <ResponsiveWrapper>
            <WeekDaySelector {...weekDaySelectorInput} />
        </ResponsiveWrapper>
    </PageWrapper>
}

export default AfterschoolApply
