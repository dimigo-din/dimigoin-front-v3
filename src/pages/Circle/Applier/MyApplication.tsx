import css from "@emotion/css"
import styled from "@emotion/styled"
import React, { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import { getApplyQuestion } from "../../../api/circle"
import { Card, CardGroupHeader, FormHeader, FormHeader as _FormHeader, HeaderWrapper, Textarea } from "../../../components"
import { CircleApplyQuestionItem, Doc } from "../../../constants/types"
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg'
import { ContentWrapper, wrapperStyle } from "./atomics"

const Content: React.FC<{
    form: Record<string, string>;
    questions?: Record<string, Doc<CircleApplyQuestionItem>>
}> = ({ form, questions }) => <ContentWrapper>
    {Object.entries(form).map(([question, answer]) => <>
        <FormHeader>
            {`${questions?.[question].question} (최대 ${questions?.[question].maxLength}자)`
                || <Skeleton width={100} />}
        </FormHeader>
        <Textarea disabled value={answer} />
    </>)}
</ContentWrapper>

export const MyApplication: React.FC<{
    form?: Record<string, string>;
    name: string;
    close(): void;
    isModal?: boolean;
}> = ({ form, name, close, isModal }) => {
    const [questions, setQuestions] = useState<{
        [key: string]: Doc<CircleApplyQuestionItem>
    }>()

    useEffect(() => {
        getApplyQuestion().then(form =>
            setQuestions(() =>
                form.reduce((grouped, current) => ({
                    ...grouped,
                    [current._id]: current
                }), {})
            )
        )
    }, [])

    if (!form) {
        close()
        return <></>
    }

    if (isModal)
        return <Card css={wrapperStyle}>
            <HeaderWrapper>
                <CardGroupHeader css={css`flex: 1; margin: 0px;`}>
                    {name} 지원서류
                </CardGroupHeader>
                <CloseIcon onClick={close} />
            </HeaderWrapper>
            <Content
                form={form}
                questions={questions}
            />
        </Card>
    else return (
        <div css={wrapperStyle}>
            <HeaderWrapper css={css`margin-top: 0px;`}>
                <CardGroupHeader css={css`flex: 1;`}>
                    {name} 지원서류
                </CardGroupHeader>
                <CloseIcon onClick={close} />
            </HeaderWrapper>
            <Card>
                <Content
                    form={form}
                    questions={questions}
                />
            </Card>
        </div>)
}
