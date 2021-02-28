import React, { useCallback, useEffect, useState } from "react"
import { Card, FormHeader, HeaderWrapper, Textarea } from "../../../components"
import { Circle, CircleApplyQuestionItem, Doc } from "../../../constants/types"
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg'
import DangerIcon from "../../../assets/icons/danger.svg"
import { ContentWrapper, TextButton as SubmitButton, wrapperStyle } from "./atomics"
import { applyCircle, getApplyQuestion } from "../../../api/circle"
import Skeleton from "react-loading-skeleton"
import styled from "@emotion/styled"
import { toast } from "react-toastify"
import { swal } from "../../../functions/swal"
import { Title } from "./MyApplication"

const Content: React.FC<Doc<Circle> & { close(): void }> = ({ _id, name, close }) => {
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

        swal({
            title: "동아리에 지원하시겠어요?",
            html: <>
                <p>{name} 동아리에 지원해요.</p>
                <p>이 작업은 취소할 수 없어요.</p>
            </>,
            imageUrl: DangerIcon,
            showCancelButton: true,
            focusCancel: true,
        }).then(questionResult => {
            if (!questionResult.isConfirmed) return
            return applyCircle(_id, answers as Record<string, string>)
        }).then(apply => {
            if (apply?.circle !== _id) throw new Error("")
            toast.success(`${name} 동아리에 지원했어요`)
        }).catch(() => {
            toast.error(`${name} 동아리에 지원하지 못했어요. 다시 시도해주세요.`)
        }).finally(() => close())
    }, [answers, name, _id, close])

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
            {questions && questions.map(({ question, maxLength, _id }, index) =>
                <React.Fragment
                    key={_id}
                >
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
                    <LengthCounter>
                        {answers?.[_id]?.length || 0} / {maxLength}
                    </LengthCounter>
                </React.Fragment>)}
        </FormWrapper>
        <SubmitButton onClick={submit}>지원하기</SubmitButton>
    </ContentWrapper>
}

const FormWrapper = styled.div`
    flex: 1;
`

const LengthCounter = styled.p`
    color: #9A9A9A;
`

export const NewApply: React.FC<Doc<Circle> & {
    close(): void;
    isModal?: boolean;
}> = ({ close, isModal, ...circle }) => {
    return <Card css={wrapperStyle}>
        <HeaderWrapper>
            <Title>
                <b>{circle.name}</b> 지원서류
            </Title>
            <CloseIcon onClick={close} />
        </HeaderWrapper>
        <Content close={close} {...circle} />
    </Card>
}
