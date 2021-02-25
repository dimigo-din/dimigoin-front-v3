import css from "@emotion/css"
import React, { useCallback, useEffect, useState } from "react"
import { Card, CardGroupHeader, FormHeader, HeaderWrapper, Textarea } from "../../../components"
import { Circle, CircleApplyQuestionItem, Doc } from "../../../constants/types"
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg'
import { ContentWrapper, TextButton, wrapperStyle } from "./atomics"
import { getApplyQuestion } from "../../../api/circle"
import Skeleton from "react-loading-skeleton"
import styled from "@emotion/styled"
import { toast } from "react-toastify"

const Content: React.FC<Circle> = () => {
    const [questions, setQuestions] = useState<Doc<CircleApplyQuestionItem>[] | null>()
    const [answers, setAnswers] = useState<Record<string, string | null>>()

    const submit = useCallback(() => {
        if (!answers) {
            toast.info("문항을 다시 확인해주세요")
            return
        }
        const checks = Object.values(answers).map((answer, index) => !answer && index + 1).filter(isWrong => typeof isWrong !== 'boolean')
        if (checks.length) {
            toast.info(`${checks.join(', ')}번 문항을 다시 확인해주세요`)
            return
        }
        console.log(answers)
    }, [answers])

    useEffect(() => {
        getApplyQuestion()
            .then(fetchedQuestions => {
                setQuestions(() => fetchedQuestions)
                setAnswers(() => fetchedQuestions.reduce((matched, current) => ({
                    ...matched,
                    [current._id]: null
                }), {} as Record<string, null>))
            })
            .catch(() => setQuestions(() => null))
    }, [])

    return <ContentWrapper>
        <FormWrapper>
            {questions && questions.map(({ question, maxLength, _id }, index) => <>
                <FormHeader>
                    {`${question} (최대 ${maxLength}자)`
                        || <Skeleton width={100} />}
                </FormHeader>
                <Textarea
                    maxLength={maxLength}
                    onChange={({ target: { value } }) =>
                        setAnswers(beforeState => ({
                            ...beforeState,
                            [_id]: value
                        }))}
                />
                <LengthCounter>{answers?.[index]?.length || 0} / {maxLength}</LengthCounter>
            </>)}
        </FormWrapper>
        <TextButton text onClick={submit}>제출</TextButton>
    </ContentWrapper>
}

const FormWrapper = styled.div`
    flex: 1;
`

const LengthCounter = styled.p`
    color: #9A9A9A;
`

export const NewApply: React.FC<Circle & {
    close(): void;
    isModal?: boolean;
}> = ({ close, isModal, ...circle }) => {
    if (isModal)
        return <Card css={wrapperStyle}>
            <HeaderWrapper>
                <CardGroupHeader css={css`flex: 1; margin: 0px 0px 24px 0px;`}>
                    {circle.name}
                </CardGroupHeader>
                <CloseIcon onClick={close} />
            </HeaderWrapper>
            <Content {...circle} />
        </Card>
    else return (
        <div css={wrapperStyle}>
            <HeaderWrapper css={css`margin-top: 0px;`}>
                <CardGroupHeader css={css`flex: 1;`}>{circle.name}</CardGroupHeader>
                <CloseIcon onClick={close} />
            </HeaderWrapper>
            <Card>
                <Content {...circle} />
            </Card>
        </div>
    )
}