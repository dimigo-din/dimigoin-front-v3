import css from "@emotion/css";
import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { toast } from "react-toastify";
import {
    HeaderWrapper, CardGroupHeader, Dropdown, Checkbox,
    RadioButtonGroup, Input, DropdownItem, FormHeader,
    Horizontal, Button, RadioButtonItem, IconOnlyButton
} from "../../components";
import { Doc, EngDay, Grade, HourAndMinute, Mentoring } from "../../constants/types";
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg'
import { getAllTeachers } from "../../api/user";
import { days, engDays } from "../../constants";
import { getCheckedIndex, RegisterButtonWrapper } from "../Afterschool/AfterschoolEditor";
import useInput, { useTextInput } from "../../hooks/useInput";
import { RequestableMentoring } from "../../api/interfaces/mentoring";
import { createMentoringProgram, deleteMentoringProgram, editMentoringInfo } from "../../api/mentoring";
import { ReactComponent as _TrashIcon } from '../../assets/icons/trash.svg'
import { swal } from "../../functions/swal";
import DangerIcon from "../../assets/icons/danger.svg"

const toInputTime = (time: HourAndMinute) => `${time.hour.toString().padStart(2, '0')}:${time.minute}`
const toStructTime = (time: string): HourAndMinute => {
    const [hour, minute] = time.split(':')
    return { hour: +hour, minute }
}

export const MentoringEditor: React.FC<{
    data?: Doc<Mentoring> | null;
    close(): void;
    fetchData(): void;
}> = ({ data, close, fetchData }) => {
    const [teachersList, setTeachersList] = useState<DropdownItem[]>();
    const [dayChecks, setDayChecks] = useState<boolean[]>([...Array(5)].map((_, index) => !!data?.days.includes(Object.keys(EngDay)[index] as EngDay)))
    const gradeInput = useInput<RadioButtonItem>(data ? {
        name: data.targetGrade + "학년",
        key: data.targetGrade.toString()
    } : undefined);

    useEffect(() => {
        setDayChecks(() => [...Array(5)].map((_, index) => !!data?.days.includes(Object.keys(EngDay)[index] as EngDay)))
    }, [ data ])

    useEffect(() => {
        getAllTeachers().then(teacherList => setTeachersList(() => teacherList.map(teacher => ({
            name: [teacher.name, '선생님'].join(' '),
            key: teacher._id
        }))))
    }, [setTeachersList]);

    const [nameInput] = useTextInput(data?.name)
    const [subjectInput] = useTextInput(data?.subject)
    const [startTimeInput] = useTextInput(data ? toInputTime(data.duration.start) : undefined)
    const [endTimeInput] = useTextInput(data ? toInputTime(data.duration.end) : undefined)
    const teacherDropdown = useInput<DropdownItem>(data ? {
        key: data.teacher._id,
        name: data.teacher.name
    } : undefined);

    const register = useCallback(() => {
        const checks = [
            !nameInput.value && "멘토링 이름",
            !teacherDropdown.value?.key && "선생님",
            !gradeInput.value?.key && "대상 학년",
            !subjectInput.value && "과목 이름",
            getCheckedIndex(dayChecks.map(checked => ({ checked }))).length === 0 && "요일",
            !startTimeInput.value && "시작 시간",
            !endTimeInput.value && "끝나는 시간",
        ].filter(Boolean)

        if (checks.length) {
            toast.info(`${checks.join(', ').을를} 확인해주세요`)
            return
        }

        const newData: RequestableMentoring = {
            days: getCheckedIndex(dayChecks.map(checked => ({ checked }))).map(index => engDays[index] as EngDay),
            duration: {
                start: toStructTime(startTimeInput.value!!),
                end: toStructTime(endTimeInput.value!!)
            },
            name: nameInput.value!!,
            subject: subjectInput.value!!,
            targetGrade: +gradeInput.value!.key!! as Grade,
            teacher: teacherDropdown.value!.key!!
        };

        (data ? editMentoringInfo(data._id, newData) : createMentoringProgram(newData))
            .then(e => {
                toast.success(data ? "멘터링 정보를 수정했어요" : "새 멘토링을 등록했어요")
            }).catch(e => {
                toast.error(data ? "멘토링 정보를 수정하지 못했어요" : "멘토링을 등록하지 못했어요")
            }).finally(() => fetchData())

    }, [
        dayChecks,
        endTimeInput.value,
        gradeInput.value,
        nameInput.value,
        startTimeInput.value,
        subjectInput.value,
        teacherDropdown.value,
        data,
        fetchData
    ])

    const showRemovePrompt = useCallback(async () => {
        if (!data) return

        const alertQuestionResult = await swal({
            title: "멘토링을 지우시겠어요?",
            html: <>
                <p>"{data?.name}"를 삭제해요.</p>
                <p>이 작업은 취소할 수 없어요.</p>
            </>,
            imageUrl: DangerIcon,
            showCancelButton: true,
            focusCancel: true
        })
        if (!alertQuestionResult.isConfirmed) return
        try {
            const removeRequest = await deleteMentoringProgram(data._id)
            if (removeRequest._id === data._id) toast.success("멘토링을 지웠어요")
            else toast.error("멘토링을 지우지 못했어요.")
        } catch (e) {
            toast.error("멘토링을 지우지 못했어요. 에러 : " + e)
        } finally {
            fetchData()
        }
    }, [ fetchData, data ])

    return (<>
        <HeaderWrapper>
            <CardGroupHeader css={css`flex: 1; margin: 0px;`}>
                {data ? "정보 수정" : "새 멘토링"}
            </CardGroupHeader>
            {data && <TrachIcon onClick={() => showRemovePrompt()} />}
            <CloseIcon onClick={close} />
        </HeaderWrapper>
        <FormHeader>이름</FormHeader>
        <Input {...nameInput} />
        <FormHeader>선생님</FormHeader>
        <Dropdown
            initIndex={teachersList?.findIndex(teacher => teacher.key === data?.teacher._id)}
            placeholder="선생님을 선택해주세요"
            items={teachersList}
            {...teacherDropdown}
        />
        <FormHeader>대상학년</FormHeader>
        <RadioButtonGroup
            name="GRADE_SELECTOR"
            items={[{
                name: "1학년",
                key: '1'
            }, {
                name: "2학년",
                key: '2'
            }, {
                name: "3학년",
                key: '3'
            }]}
            {...gradeInput}
        />
        <FormHeader>과목</FormHeader>
        <Input {...subjectInput} />
        <FormHeader>요일</FormHeader>
        <Horizontal>
            {[...Array(5)].map((_, index) => <Checkbox
                key={`day${index}`}
                defaultChecked={data?.days.includes(Object.keys(EngDay)[index] as EngDay)}
                checked={dayChecks[index]}
                onChange={({ target: { checked } }) => setDayChecks(beforeState => [
                    ...beforeState.slice(0, index),
                    checked,
                    ...beforeState.slice(index + 1)
                ])}
                text={days[index]}
            />)}
        </Horizontal>
        <FormHeader>시간</FormHeader>
        <Horizontal>
            <Input
                type="time"
                {...startTimeInput}
            /> <Separator>~</Separator>
            <Input
                type="time"
                {...endTimeInput}
            />
        </Horizontal>
        <RegisterButtonWrapper>
            <Button
                text
                onClick={register}
            >등록</Button>
        </RegisterButtonWrapper>
    </>)
}

const TrachIcon = styled(_TrashIcon)`
    ${IconOnlyButton}
    fill: rgba(0, 0, 0, 0.7);
    width: 16px;
    margin-right: 12px;
`

const Separator = styled.p`
    display: flex;
    align-items: center;
    font-size: 24px;
    margin: 0px 12px;
`
