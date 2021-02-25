import css from "@emotion/css"
import React from "react"
import ReactMarkdown from 'react-markdown'
import styled from "@emotion/styled"

import { Button, Card, CardGroupHeader, HeaderWrapper } from "../../../components"
import { Circle } from "../../../constants/types"
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg'
import remarkGfm from "remark-gfm"
import { ContentWrapper, TextButton, wrapperStyle } from "./atomics"

const MDRenderer: React.FC = ({ children }) =>
    <div css={css`line-height: 24px; flex: 1;`}>{children}</div>

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
        <TextButton text onClick={onGoApply}>지원서류 작성하기</TextButton>
    </ContentWrapper>
}

const Markdown = styled(ReactMarkdown)`
`

export const CircleDetail: React.FC<Circle & {
    close(): void;
    goApply(): void;
    isModal?: boolean;
}> = ({ close, isModal, goApply, ...circle }) => {
    if (isModal)
        return <Card css={wrapperStyle}>
            <HeaderWrapper>
                <CardGroupHeader css={css`flex: 1; margin: 0px 0px 24px 0px;`}>
                    {circle.name}
                </CardGroupHeader>
                <CloseIcon onClick={close} />
            </HeaderWrapper>
            <Content onGoApply={goApply} {...circle} />
        </Card>
    else return (
        <div css={wrapperStyle}>
            <HeaderWrapper css={css`margin-top: 0px;`}>
                <CardGroupHeader css={css`flex: 1;`}>{circle.name}</CardGroupHeader>
                <CloseIcon onClick={close} />
            </HeaderWrapper>
            <Card>
                <Content onGoApply={goApply} {...circle} />
            </Card>
        </div>
    )
}