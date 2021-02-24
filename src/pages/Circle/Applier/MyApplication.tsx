import css from "@emotion/css"
import styled from "@emotion/styled"
import React, { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import { getApplyQuestion } from "../../../api/circle"
import { Card, CardGroupHeader, FormHeader as _FormHeader, Textarea } from "../../../components"
import { CircleApplyQuestionItem, Doc } from "../../../constants/types"
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg'

export const MyApplication: React.FC<{
    form?: Record<string, string>;
    name: string;
    close(): void;
}> = ({ form, name, close }) => {
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

    return <div>
        <HeaderWrapper>
            <CardGroupHeader css={css`flex: 1; margin: 0px;`}>{name} 지원서류</CardGroupHeader>
            <CloseIcon onClick={close} />
        </HeaderWrapper>
        {Object.entries(form).map(([question, answer]) => <>
            <FormHeader>
                {`${questions?.[question].question} (최대 ${questions?.[question].maxLength}자)`
                    || <Skeleton width={100} />}
            </FormHeader>
            <Textarea disabled value={answer} />
        </>)}
    </div>
}

const FormHeader = styled(_FormHeader)`
    margin-top: 20px !important;
`

const HeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-top: 12px;
    margin-bottom: 32px;
`
