import css from "@emotion/css"
import styled from "@emotion/styled"
import React, { useCallback, useEffect, useState } from "react"
import { Afterschool } from ".."
import { editAfterschoolClassInfo, getAfterschoolClassList, registerNewAfterschoolClass } from "../../api/afterschool"
import { getPlaceList } from "../../api/place"
import { getAllTeachers } from "../../api/user"
import { ReactComponent as _DownloadIcon } from '../../assets/icons/download.svg'
import { ReactComponent as _NewIcon } from '../../assets/icons/edit.svg'
import { ReactComponent as _CloseIcon } from '../../assets/icons/close.svg'
import {
    CardGroupHeader, Col, Data, HeadData, HeadRow, Horizontal,
    Row, MoreCompactButton, NoData, PageWrapper, ResponsiveWrapper,
    Table, Card, Divider, FormHeader as _FormHeader, Input, Dropdown, DropdownItem, Checkbox, showModal, showCardModal, Button
} from "../../components"
import { dayEngKorMapper, days } from "../../constants"
import { AfterschoolClass, Doc, EngDay, Grade, Place, SelfStudyTime, SelfStudyTimeEngKor } from "../../constants/types"
import useInput, { useCheckbox } from "../../hooks/useInput"
import { toast } from "react-toastify"

const getCheckedIndex = (arr: {
    checked: boolean;
}[]): number[] => arr.map((checkbox, index) => checkbox.checked && index).filter((e): e is number => typeof e === 'number')

const AfterschoolEditor: React.FC<{
    data?: Doc<AfterschoolClass>;
    close(): void;
}> = ({ data, close }) => {
    const [teachersList, setTeachersList] = useState<DropdownItem[]>();
    const [places, setPlaces] = useState<Doc<Place>[]>()
    const placeDropdown = useInput<DropdownItem>();
    const teacherDropdown = useInput<DropdownItem>(data ? {
        key: data.teacher._id,
        name: data.teacher.name
    } : undefined);
    const afterschoolClassName = useInput(data?.name);
    const descriptionInput = useInput(data?.description);
    const capacityInput = useInput(data?.capacity.toString(), v => (+v).toString() === v || v === '');
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
    }, [setTeachersList]);

    useEffect(() => {
        (async () => {
            const placeList = await getPlaceList()
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
            !afterschoolClassName.value && "강의명",
            targetClassCheckboxes.length === 0 && "대상 반",
            targetGrades.length === 0 && "대상 학년",
            !teacherDropdown.value?.key && "담당 선생님",
            times.length === 0 && "시간"
        ].filter(Boolean)
        if (validations.length) {
            toast.error(validations.join(', ').을를 + " 다시 확인해주세요")
            return
        }

        const newInfo = {
            capacity: +capacityInput.value!!,
            days: getCheckedIndex(weekdayCheckboxes).map(index => (Object.keys(EngDay) as EngDay[])[index]),
            description: descriptionInput.value!!,
            name: afterschoolClassName.value!!,
            targetClasses: getCheckedIndex(targetClassCheckboxes).map(index => [1, 2, 3, 4, 5, 6][index]),
            targetGrades,
            teacher: teacherDropdown.value?.key!!,
            times
        };

        (data ? editAfterschoolClassInfo(data._id, newInfo) : registerNewAfterschoolClass(newInfo))
            .then(() => {
                toast.success(data ? "방과후 정보를 업데이트했어요" : "새 방과후를 등록했어요")
                close()
            })
            .catch(() => toast.error("방과후 정보를 업데이트하지 못했어요"))

    }, [
        afterschoolClassName.value,
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
            {...afterschoolClassName}
            placeholder="강의명을 입력해주세요"
        />
        <FormHeader css={css`margin-top: 36px;`}>설명</FormHeader>
        <Input
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
            initIndex={3}
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

const RegisterButtonWrapper = styled(Horizontal)`
    justify-content: center;
    margin-top: 24px;
`

const AfterschoolMangement: React.FC = () => {
    const [afterschoolClassList, setAfterschoolClassList] = useState<Doc<AfterschoolClass>[]>()
    const [sideDetail, setSideDetail] = useState<{
        data?: Doc<AfterschoolClass>;
    }>()

    const fetchData = useCallback(() => {
        getAfterschoolClassList()
            .then(setAfterschoolClassList)
    }, [setAfterschoolClassList])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const openEdit = useCallback((classData?: Doc<AfterschoolClass>) => {
        if (window.innerWidth < 1300) {
            showModal(close => <Card css={css`flex: 1; overflow: auto;`}>
                <AfterschoolEditor close={() => {
                    fetchData()
                    close()
                }} data={classData} />
            </Card>, {
                wrapperProps: {
                    css: css`max-width: min(720px, 100vw); width: 100vw; height: 100vh; display: flex; padding: 60px 20px 20px;`
                },
                backdropProps: {
                    css: css`overflow-y: auto;`
                }
            })
        }
        else {
            setSideDetail(() => ({
                data: classData
            }))
        }
    }, [fetchData])

    return <PageWrapper>
        <ResponsiveWrapper>
            <Col width={sideDetail ? 5 : 10}>
                <HeaderWrapper css={css`flex-grow: 0;`}>
                    <CardGroupHeader css={css`flex: 1;`}>
                        방과후 관리
                    </CardGroupHeader>
                    <Horizontal>
                        <HeaderButton>
                            <DownloadIcon />
                            엑셀 다운로드
                        </HeaderButton>
                        <HeaderButton onClick={() => openEdit()}>
                            <NewIcon />
                            신규 등록
                        </HeaderButton>
                    </Horizontal>
                </HeaderWrapper>
                <Table>
                    <HeadRow>
                        <tr>
                            <HeadData>
                                강좌명
                            </HeadData>
                            <HeadData>
                                대상
                            </HeadData>
                            <HeadData>
                                선생님
                            </HeadData>
                            <HeadData>
                                시간
                            </HeadData>
                            <HeadData>
                                강의실
                            </HeadData>
                            <HeadData>
                                정원
                            </HeadData>
                            <HeadData>
                                신청자
                            </HeadData>
                        </tr>
                    </HeadRow>
                    {afterschoolClassList?.length === 0 ?
                        <Data colSpan={7}>
                            <NoData> 개설된 강의가 없습니다 </NoData>
                        </Data>
                        : <tbody>
                            {afterschoolClassList?.map(afterschoolClass =>
                                <Row
                                    key={afterschoolClass._id}
                                    onClick={() => openEdit(afterschoolClass)}
                                >
                                    <Data>{afterschoolClass.name}</Data>
                                    <Data>
                                        {afterschoolClass.targetGrades.length === 3 ? "전" : afterschoolClass.targetGrades.join(', ')}학년&nbsp;
                                        {afterschoolClass.targetClasses.length === 6 ? "모든" : afterschoolClass.targetClasses.join(', ')}반
                                    </Data>
                                    <Data>{afterschoolClass.teacher.name}</Data>
                                    <Data>
                                        {afterschoolClass.days?.map(day => dayEngKorMapper[day])},
                                        {afterschoolClass.times.map(time => SelfStudyTimeEngKor[time])}
                                    </Data>
                                    <Data>방과후 3실</Data>
                                    <Data>{afterschoolClass.capacity}명</Data>
                                    <Data>X명</Data>
                                </Row>
                            )}
                        </tbody>
                    }
                </Table>
            </Col>
            {sideDetail ? <>
                <Divider data-divider />
                <Col width={5}>
                    <Card>
                        <AfterschoolEditor
                            close={() => {
                                fetchData()
                                setSideDetail(() => undefined)
                            }}
                            data={sideDetail?.data}
                        />
                    </Card>
                </Col>
            </> : <>
                </>}
        </ResponsiveWrapper>
    </PageWrapper>
}

const HeaderWrapper = styled(Horizontal)`
    flex-wrap: wrap;
    flex: 1;
    margin-bottom: 14px;
`

const HeaderButton = styled(MoreCompactButton)`
    flex-shrink: 0;
    &+& {
        margin-left: 12px;
    }
`

const DownloadIcon = styled(_DownloadIcon)`
    stroke: white;
    margin-right: 12px;
`

const NewIcon = styled(_NewIcon)`
    fill: white;
    margin-right: 12px;
`

const FormHeader = styled(_FormHeader)`
    margin-top: 20px;
`

const CloseIcon = styled(_CloseIcon)`
    /* justify-self: flex-end; */
`

export default AfterschoolMangement
