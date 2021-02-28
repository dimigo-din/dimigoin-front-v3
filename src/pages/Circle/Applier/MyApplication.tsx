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

    return <Card css={wrapperStyle}>
        <HeaderWrapper>
            <Title>
                <b>{name}</b> 지원서류
            </Title>
            <CloseIcon onClick={close} />
        </HeaderWrapper>
        <Content
            form={form}
            questions={questions}
        />
    </Card>
}

export const Title = styled.h2`
    flex: 1;
    font-size: 27px;
    font-weight: 400;
    & b {
        font-weight: 900;
    }
`
