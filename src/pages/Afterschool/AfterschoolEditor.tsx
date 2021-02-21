import css from "@emotion/css";
import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { editAfterschoolClassInfo, registerNewAfterschoolClass } from "../../api/afterschool";
import { getPlaceList } from "../../api/place";
import { getAllTeachers } from "../../api/user";
import {
    Button, CardGroupHeader, Checkbox, Dropdown,
    DropdownItem, Horizontal, Input, FormHeader as _FormHeader
} from "../../components";
import { days } from "../../constants";
import { Doc, AfterschoolClass, EngDay, SelfStudyTime, Grade, SelfStudyTimeEngKor } from "../../constants/types";
import useInput, { useCheckbox, useTextInput } from "../../hooks/useInput";
import { ReactComponent as _CloseIcon } from '../../assets/icons/close.svg'
import styled from "@emotion/styled";
import { ReqAfterschoolClass } from "../../api";

const getCheckedIndex = (arr: {
    checked?: boolean;
}[]): number[] => arr.map((checkbox, index) => checkbox.checked && index).filter((e): e is number => typeof e === 'number')

export const AfterschoolEditor: React.FC<{
    data?: Doc<AfterschoolClass>;
    close(): void;
}> = ({ data, close }) => {
    const [ teachersList, setTeachersList ] = useState<DropdownItem[]>();
    const [ places, setPlaces ] = useState<DropdownItem[]>()
    const placeDropdown = useInput<DropdownItem>(data ? {
        key: data.place._id,
        name: data.place.name
    } : undefined);
    const teacherDropdown = useInput<DropdownItem>(data ? {
        key: data.teacher._id,
        name: data.teacher.name
    } : undefined);
    const [ afterschoolClassNameValue ] = useTextInput(data?.name);
    const [ descriptionInput ] = useTextInput(data?.description);
    const [ capacityInput ] = useTextInput(data?.capacity.toString(), v => (+v).toString() === v || v === '');
    const grade1Checkbox = useCheckbox(data?.targetGrades?.includes(1)),
        grade2Checkbox = useCheckbox(data?.targetGrades?.includes(2)),
        grade3Checkbox = useCheckbox(data?.targetGrades?.includes(3))

    const weekdayCheckboxes = [
        useCheckbox(data?.days?.includes(EngDay.mon)),
        useCheckbox(data?.days?.includes(EngDay.tue)),
        useCheckbox(data?.days?.includes(EngDay.wed)),
        useCheckbox(data?.days?.includes(EngDay.thr)),
        useCheckbox(data?.days?.includes(EngDay.fri)),
        useCheckbox(data?.days?.includes(EngDay.sat)),
    ]

    const targetClassCheckboxes = [
        useCheckbox(data?.targetClasses?.includes(1)),
        useCheckbox(data?.targetClasses?.includes(2)),
        useCheckbox(data?.targetClasses?.includes(3)),
        useCheckbox(data?.targetClasses?.includes(4)),
        useCheckbox(data?.targetClasses?.includes(5)),
        useCheckbox(data?.targetClasses?.includes(6)),
    ]

    const timesCheckboxes = {
        [SelfStudyTime.AFSC1]: useCheckbox(data?.times?.includes(SelfStudyTime.AFSC1)),
        [SelfStudyTime.AFSC2]: useCheckbox(data?.times?.includes(SelfStudyTime.AFSC2)),
    }

    useEffect(() => {
        getAllTeachers().then(teacherList => setTeachersList(() => teacherList.map(teacher => ({
            name: [teacher.name, '선생님'].join(' '),
            key: teacher._id
        }))))
    }, [ setTeachersList ]);

    useEffect(() => {
        (async () => {
            const placeList = (await getPlaceList()).map(place => ({
                name: place.name,
                key: place._id
            }))
            setPlaces(() => placeList)
        })()
    }, [])

    const register = useCallback(() => {
        // if(data) editAfterschoolClassInfo(data._id, )
        const targetGrades = getCheckedIndex([grade1Checkbox, grade2Checkbox, grade3Checkbox])
            .map(index => ([1, 2, 3] as Grade[])[index])
        const times = getCheckedIndex(
            [timesCheckboxes.AFSC1, timesCheckboxes.AFSC2]
        ).map(index => [SelfStudyTime.AFSC1, SelfStudyTime.AFSC2, SelfStudyTime.NSS1, SelfStudyTime.NSS2][index])
        const validations = [
            !capacityInput.value && "정원",
            days?.length === 0 && "요일",
            !descriptionInput.value && "설명",
            !afterschoolClassNameValue.value && "강의명",
            targetClassCheckboxes.length === 0 && "대상 반",
            targetGrades.length === 0 && "대상 학년",
            !placeDropdown.value?.key && "강의실",
            !teacherDropdown.value?.key && "담당 선생님",
            times.length === 0 && "시간"
        ].filter(Boolean)
        if (validations.length) {
            console.log(placeDropdown.value)
            toast.error(validations.join(', ').을를 + " 다시 확인해주세요")
            return
        }

        const newInfo: ReqAfterschoolClass = {
            capacity: +capacityInput.value!!,
            days: getCheckedIndex(weekdayCheckboxes).map(index => (Object.keys(EngDay) as EngDay[])[index]),
            description: descriptionInput.value!!,
            name: afterschoolClassNameValue.value!!,
            targetClasses: getCheckedIndex(targetClassCheckboxes).map(index => [1, 2, 3, 4, 5, 6][index]),
            targetGrades,
            teacher: teacherDropdown.value?.key!!,
            times,
            place: placeDropdown.value?.key!!
        };

        (data ? editAfterschoolClassInfo(data._id, newInfo) : registerNewAfterschoolClass(newInfo))
            .then(() => {
                toast.success(data ? "방과후 정보를 업데이트했어요" : "새 방과후를 등록했어요")
                close()
            })
            .catch(() => toast.error("방과후 정보를 업데이트하지 못했어요"))

    }, [
        afterschoolClassNameValue.value,
        capacityInput.value,
        descriptionInput.value,
        grade1Checkbox,
        grade2Checkbox,
        grade3Checkbox,
        targetClassCheckboxes,
        teacherDropdown.value,
        timesCheckboxes.AFSC1,
        timesCheckboxes.AFSC2,
        weekdayCheckboxes,
        placeDropdown.value,
        data,
        close
    ])

    return (<>
        <Horizontal>
            <CardGroupHeader css={css`flex: 1;`}>
                {data ? "정보 수정" : "새 방과후 추가"}
            </CardGroupHeader>
            <CloseIcon onClick={close} />
        </Horizontal>
        <FormHeader css={css`margin-top: 36px;`}>강의명</FormHeader>
        <Input
            defaultValue={data?.name}
            {...afterschoolClassNameValue}
            placeholder="강의명을 입력해주세요"
        />
        <FormHeader css={css`margin-top: 36px;`}>설명</FormHeader>
        <Input
            defaultValue={data?.description}
            {...descriptionInput}
            placeholder="설명을 입력해주세요"
        />
        <FormHeader>선생님</FormHeader>
        <Dropdown
            initIndex={teachersList?.findIndex(teacher => teacher.key === data?.teacher._id)}
            placeholder="선생님을 선택해주세요"
            items={teachersList}
            {...teacherDropdown}
        />
        <FormHeader>요일</FormHeader>
        <Horizontal>
            {days.slice(0, -1).map((day, i) => <Checkbox text={day} {...weekdayCheckboxes[i]} />)}
        </Horizontal>
        <FormHeader>시간</FormHeader>
        <Horizontal>
        <Checkbox {...timesCheckboxes.AFSC1} text={SelfStudyTimeEngKor[SelfStudyTime.AFSC1]} />
        <Checkbox {...timesCheckboxes.AFSC2} text={SelfStudyTimeEngKor[SelfStudyTime.AFSC2]} />
        </Horizontal>
        <FormHeader>대상 학년</FormHeader>
        <Horizontal>
            <Checkbox text="1학년" {...grade1Checkbox} />
            <Checkbox text="2학년" {...grade2Checkbox} />
            <Checkbox text="3학년" {...grade3Checkbox} />
        </Horizontal>
        <FormHeader>대상 반</FormHeader>
        <Horizontal>
            {targetClassCheckboxes.map((checkbox, index) => <Checkbox text={`${index + 1}반`} {...checkbox} />)}
        </Horizontal>
        <FormHeader>강의실</FormHeader>
        <Dropdown
            initIndex={places?.findIndex(place => place.key === data?.place?._id)}
            placeholder="강의실을 선택해주세요"
            items={places}
            {...placeDropdown}
        />
        <FormHeader>정원</FormHeader>
        <Input
            {...capacityInput}
            placeholder="정원을 입력해주세요"
        />
        <RegisterButtonWrapper>
            <Button text onClick={register}>등록</Button>
        </RegisterButtonWrapper>
    </>)
}

const FormHeader = styled(_FormHeader)`
    margin-top: 20px;
`

const CloseIcon = styled(_CloseIcon)`
    /* justify-self: flex-end; */
`

const RegisterButtonWrapper = styled(Horizontal)`
    justify-content: center;
    margin-top: 24px;
`
