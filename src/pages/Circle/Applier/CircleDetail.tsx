import React from "react"
import styled from "@emotion/styled"

import { Card } from "../../../components"
import { Circle } from "../../../constants/types"
import { ContentWrapper, TextButton as SubmitButton, wrapperStyle } from "./atomics"
import { Markdown } from "../../../components/basic/Markdown"


const Content: React.FC<Circle & {
    onGoApply(): void;
}> = ({ description, onGoApply }) => {
    return <ContentWrapper>
        <Markdown>{description}</Markdown>
        <SubmitButton onClick={onGoApply}>지원하기</SubmitButton>
    </ContentWrapper>
}

export const CircleDetail: React.FC<Circle & {
    close(): void;
    goApply(): void;
    isModal?: boolean;
}> = ({ close, isModal, goApply, ...circle }) => {
    return <Card css={wrapperStyle}>
        <CircleLogo src={circle.imageUrl} />
        <Category>{circle.category}</Category>
        <Title>{circle.name}</Title>
        <Content onGoApply={goApply} {...circle} />
    </Card>
}

const Category = styled.h2`
    font-size: 16px;
    color: #707070;
    font-weight: 700;
    text-align: center;
    margin-top: 20px;
`

const Title = styled.h2`
    font-size: 27px;
    font-weight: 900;
    text-align: center;
    margin-top: 10px;
`

const CircleLogo = styled.img`
    width: 120px;
    height: 120px;
    object-fit: cover;
    align-self: center;
`
