import React from "react"
import { Card, CardGroupHeader } from "../../../components"
import { Circle } from "../../../constants/types"

export const CircleDetail: React.FC<Circle> = ({ name }) => {
    return <Card>
        <CardGroupHeader>{name}</CardGroupHeader>
    </Card>
}