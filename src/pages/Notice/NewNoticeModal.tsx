import styled from "@emotion/styled"
import React, { useCallback, useEffect } from "react"
import {
    Card, Checkbox, CompactButton, RadioButtonGroup, RadioButtonItem
} from "../../components"
import useInput, { useCheckbox } from "../../hooks/useInput"

export const NewNoticeModal: React.FC = () => {
    const titleInput = useInput()
    const contentInput = useInput()
    const noticeTypeInput = useInput<RadioButtonItem>()
    const grade1Checkbox = useCheckbox(),
        grade2Checkbox = useCheckbox(),
        grade3Checkbox = useCheckbox()

    const titleValue = titleInput.value
    const contentValue = contentInput.value
    const noticeTypeValue = noticeTypeInput.value

    const submit = useCallback(() => {
        console.log({
            title: titleValue,
            content: contentValue,
            targetGrade: [grade1Checkbox, grade2Checkbox, grade3Checkbox].map((e, i) => e.checked && (i + 1)).filter(Boolean)
        })
    }, [titleValue, contentValue, grade1Checkbox, grade2Checkbox, grade3Checkbox])

    return <NoticeModalWrapper>
        <HeaderWrapper>
            <TitleInput placeholder="이곳을 눌러 제목을 입력하세요" {...titleInput} />
            <NoticeTypeRadioSelector items={[{
                name: "글까지",
                key: "ARTICLE_ONLY"
            }, {
                name: "제목만",
                key: "WITH_CONTENT"
            }]} name="IsIncludingContent" {...noticeTypeInput} />
        </HeaderWrapper>
        <ContentInput {...contentInput} />
        <FormWrapper>
            <CheckboxesWrapper>
                <Checkbox text="1학년" {...grade1Checkbox} />
                <Checkbox text="2학년" {...grade2Checkbox} />
                <Checkbox text="3학년" {...grade3Checkbox} />
            </CheckboxesWrapper>
            <div>
                <CompactButton onClick={submit}>게시</CompactButton>
            </div>
        </FormWrapper>
    </NoticeModalWrapper>
}

const CheckboxesWrapper = styled.div`
    flex: 1;
    display: flex;
    margin: 0px -6px;
    flex-shrink: 0;
    flex-wrap: wrap;
    &>*{
        margin: 6px;
    }
`

const FormWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    /* @media screen and (max-width: 440px) {
        flex-direction: column;
    } */
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
    디미고인에 접속하시는분이 없기를 바라겠습니다 */
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
