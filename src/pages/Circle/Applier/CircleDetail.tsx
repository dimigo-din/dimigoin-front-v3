import css from "@emotion/css"
import React from "react"
import ReactMarkdown from 'react-markdown'
import styled from "@emotion/styled"

import { Card, CardGroupHeader, HeaderWrapper } from "../../../components"
import { Circle } from "../../../constants/types"
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg'
import remarkGfm from "remark-gfm"

const MDRenderer: React.FC = ({ children }) => 
    <div css={css`line-height: 24px;`}>{children}</div>

const CodeRenderer: React.FC<{ value: string }> = ({ value }) =>
    <div css={css`
        max-width: 100%;
        padding: 12px;
        background-color: black;
        color: white;
        margin: 12px 0px;
    `}>{value}</div>

const TextRenderer: React.FC<{ value: string }> = ({ value }) =>
    <span css={css`font-size: 17px;`}>{value}</span>

const BoldRenderer: React.FC = ({ children }) =>
    <strong css={css`font-weight: 900;`}>{children}</strong>

const EmphasisRenderer: React.FC = ({ children }) =>
    <em css={css`font-style: italic;`}>{children}</em>

const Content: React.FC<Circle> = ({ description }) => {
    return <ReactMarkdown
        plugins={[remarkGfm]}
        renderers={{
            text: TextRenderer,
            strong: BoldRenderer,
            emphasis: EmphasisRenderer,
            code: CodeRenderer,
            root: MDRenderer
        }}>
        {description}
    </ReactMarkdown>
}

export const CircleDetail: React.FC<Circle & {
    close(): void;
    isModal?: boolean;
}> = ({ close, isModal, ...circle }) => {
    if (isModal)
        return <Card css={wrapperStyle}>
            <HeaderWrapper>
                <CardGroupHeader css={css`flex: 1; margin: 0px;`}>
                    {circle.name}
                </CardGroupHeader>
                <CloseIcon onClick={close} />
            </HeaderWrapper>
            <Content {...circle} />
        </Card>
    else return (
        <>
            <HeaderWrapper>
                <CardGroupHeader css={css`flex: 1;`}>{circle.name}</CardGroupHeader>
                <CloseIcon onClick={close} />
            </HeaderWrapper>
            <Card>
                <Content {...circle} />
            </Card>
        </>
    )
}

const wrapperStyle = css`
    flex: 1;
`
