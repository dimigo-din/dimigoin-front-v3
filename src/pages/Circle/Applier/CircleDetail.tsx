import css from "@emotion/css"
import React from "react"
import ReactMarkdown from 'react-markdown'
import styled from "@emotion/styled"

import { Card } from "../../../components"
import { Circle } from "../../../constants/types"
import remarkGfm from "remark-gfm"
import { ContentWrapper, TextButton as SubmitButton, wrapperStyle } from "./atomics"

const MDRenderer: React.FC = ({ children }) =>
    <div css={css`line-height: 24px; flex: 1; margin-top: 30px;`}>{children}</div>

const CodeRenderer: React.FC<{ value: string }> = ({ value }) =>
    <div css={css`
        max-width: 100%;
        padding: 12px;
        background-color: black;
        color: white;
        font-family: monospace;
        margin: 12px 0px;
    `}>{value}</div>

const TextRenderer: React.FC<{ value: string }> = ({ value }) =>
    <span css={css`font-size: 17px;`}>{value}</span>

const BoldRenderer: React.FC = ({ children }) =>
    <strong css={css`font-weight: 900;`}>{children}</strong>

const EmphasisRenderer: React.FC = ({ children }) =>
    <em css={css`font-style: italic;`}>{children}</em>

const ListItemRenderer: React.FC = ({ children }) =>
    <li css={css`
        list-style-type: initial;
    `}>{children}</li>

const ListRenderer: React.FC<{ ordered: boolean }> = ({ children, ordered }) =>
    ordered ? <ol css={css`
    padding: revert;
    `}>{children}</ol> : <ul css={css`
    padding: revert;
    `}>{children}</ul>

const Content: React.FC<Circle & {
    onGoApply(): void;
}> = ({ description, onGoApply }) => {
    return <ContentWrapper>
        <Markdown
            plugins={[remarkGfm]}
            renderers={{
                text: TextRenderer,
                strong: BoldRenderer,
                emphasis: EmphasisRenderer,
                code: CodeRenderer,
                root: MDRenderer,
                listItem: ListItemRenderer,
                list: ListRenderer
            }}>
            {description}
        </Markdown>
        <SubmitButton onClick={onGoApply}>지원하기</SubmitButton>
    </ContentWrapper>
}

const Markdown = styled(ReactMarkdown)`
`

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
