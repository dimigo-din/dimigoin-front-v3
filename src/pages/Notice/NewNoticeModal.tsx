import css from "@emotion/css"
import styled from "@emotion/styled"
import React, { useCallback, useEffect } from "react"
import { toast } from "react-toastify"
import { registerNewNotice } from "../../api/notice"
import {
    Card, Checkbox, CompactButton, RadioButtonGroup, RadioButtonItem, ResponsiveWrapper
} from "../../components"
import { useTinyDateRangeSelector } from "../../components/complex/time/TinyDateRangeSelector"
import { Grade } from "../../constants/types"
import useInput, { useCheckbox } from "../../hooks/useInput"

export const NewNoticeModal: React.FC = () => {
    const titleInput = useInput()
    const contentInput = useInput()
    // const noticeTypeInput = useInput<RadioButtonItem>()
    const grade1Checkbox = useCheckbox(),
        grade2Checkbox = useCheckbox(),
        grade3Checkbox = useCheckbox()
    const {
        element: TinyDateRangeSelector,
        dates
    } = useTinyDateRangeSelector()

    const titleValue = titleInput.value
    const contentValue = contentInput.value
    // const noticeTypeValue = noticeTypeInput.value

    const submit = useCallback(() => {
        const alerts = [
            !titleValue && "제목",
            !contentValue && "내용",
            ![grade1Checkbox, grade2Checkbox, grade3Checkbox].some(checkbox => checkbox.checked) && "대상 학년",
            !dates && "게시 일자"
        ].filter(Boolean)
        if(alerts.length) {
            toast.error(alerts.join(', ').을를 + " 다시 확인해주세요")
            return
        }
        registerNewNotice({
            title: titleValue!!,
            content: contentValue!!,
            targetGrade: [grade1Checkbox, grade2Checkbox, grade3Checkbox]
                .map((e, i) => e.checked && (i + 1))
                .filter<Grade>((e): e is Grade => [1, 2, 3].includes(Number(e))),
            startDate: dates!![0],
            endDate: dates!![1]
        })
    }, [titleValue, contentValue, grade1Checkbox, grade2Checkbox, grade3Checkbox, dates])

    return <NoticeModalWrapper>
        <HeaderWrapper>
            <TitleInput placeholder="이곳을 눌러 제목을 입력하세요" {...titleInput} />
            {/* <NoticeTypeRadioSelector items={[{
                name: "글까지",
                key: "ARTICLE_ONLY"
            }, {
                name: "제목만",
                key: "WITH_CONTENT"
            }]} name="IsIncludingContent" {...noticeTypeInput} /> */}
        </HeaderWrapper>
        <ContentInput {...contentInput} />
        <BottomControls threshold={500}>
            <FormWrapper>
                <FormRow>
                    <FormHeader>게시일</FormHeader>
                    <CheckboxesWrapper>
                        {TinyDateRangeSelector}
                    </CheckboxesWrapper>
                </FormRow>
                <FormRow>
                    <FormHeader>대상</FormHeader>
                    <CheckboxesWrapper>
                        <Checkbox text="1학년" {...grade1Checkbox} />
                        <Checkbox text="2학년" {...grade2Checkbox} />
                        <Checkbox text="3학년" {...grade3Checkbox} />
                    </CheckboxesWrapper>
                </FormRow>
            </FormWrapper>
                <SubmitButton onClick={submit}>게시</SubmitButton>
        </BottomControls>
    </NoticeModalWrapper>
}

const SubmitButton = styled(CompactButton)`
    margin-top: 12px;
`

const CheckboxesWrapper = styled.div`
    display: flex;
`

const BottomControls = styled(ResponsiveWrapper)`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    ${({ threshold }) => threshold && css`
        @media screen and (max-width: ${threshold}px) {
            align-items: flex-start;
        }
    `}
`

const NoticeModalWrapper = styled(Card)`
    flex: 1;
    display: flex;
    flex-direction: column;
    border-top: 5px solid var(--main-theme-accent);
`

const NoticeTypeRadioSelector = styled(RadioButtonGroup)`
    flex-shrink: 0;
    &>*+* {
        margin-left: 12px;
    }
`

const HeaderWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 24px;
    padding-bottom: 12px;
    border-bottom: 1px solid #D1D1D1;
`

const TitleInput = styled.input`
    font-weight: 900;
    font-size: 27px;
    border: none;
    outline: none;
    display: block;
    margin: 0px;
    flex: 1;
    color: black;
    max-width: 100%;
    min-width: 100px;
    /* 100px보다 가로길이가 짧은 기기에서
    디미고인에 접속하시는분이 없기를 바라겠습니다 제발... */
    width: 100%;
    text-overflow: ellipsis;
    margin-bottom: 12px;
`

const ContentInput = styled.textarea`
    border: none;
    outline: none;
    display: block;
    width: 100%;
    flex: 1;
    font-size: 22px;
`

const FormRow = styled.div`
    display: flex;
    align-items: center;
    &+& {
        margin-top: 10px;
    }
`

const FormHeader = styled.p`
    font-size: 20px;
    font-weight: 700;
    margin-right: 10px;
    flex-shrink: 0;
`

const FormWrapper= styled.div`
    flex: 1;
`
