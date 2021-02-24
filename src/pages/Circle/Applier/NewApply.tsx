import React from "react"
import { Card, CardGroupHeader } from "../../../components"
import { Circle } from "../../../constants/types"

export const NewApply: React.FC<Circle> = ({ name }) => {
    return <Card>
        <CardGroupHeader>서류지원 ({name})</CardGroupHeader>
    </Card>
}