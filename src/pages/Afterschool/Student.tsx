import React from "react"
import { CardGroupHeader, PageWrapper } from "../../components"
import { WeekDaySelector } from "./WeekDaySelector"

const AfterschoolStudent: React.FC = () => {
    return <PageWrapper>
        <CardGroupHeader subButton={{
            text: "신청한 강좌는 빨간 선으로 표시됩니다"
        }}>방과후</CardGroupHeader>
        <WeekDaySelector />
    </PageWrapper>
}

export default AfterschoolStudent
