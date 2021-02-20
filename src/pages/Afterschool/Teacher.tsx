import css from "@emotion/css"
import styled from "@emotion/styled"
import React, { useCallback, useEffect, useState } from "react"
import { getAfterschoolClassList } from "../../api/afterschool"
import { getPlaceList } from "../../api/place"
import { getAllTeachers } from "../../api/user"
import { ReactComponent as _DownloadIcon } from '../../assets/icons/download.svg'
import { ReactComponent as _NewIcon } from '../../assets/icons/edit.svg'
import {
    CardGroupHeader, Col, Data, HeadData, HeadRow, Horizontal,
    Row, MoreCompactButton, NoData, PageWrapper, ResponsiveWrapper,
    Table, Card, Divider, FormHeader as _FormHeader, Input, Dropdown, DropdownItem, Checkbox
} from "../../components"
import { dayEngKorMapper, days } from "../../constants"
import { AfterschoolClass, Doc, Place } from "../../constants/types"
import useInput, { useCheckbox } from "../../hooks/useInput"

const AfterschoolEditor: React.FC<{
    type?: | "REGISTER" | "EDIT";
    data?: AfterschoolClass;
}> = ({ type, data }) => {
    const [teachersList, setTeachersList] = useState<DropdownItem[]>();
    const [ places, setPlaces ] = useState<Doc<Place>[]>()
    const placeDropdown = useInput<DropdownItem>();
    const teacherDropdown = useInput<DropdownItem>();
    const afterschoolClassName = useInput(data?.name);
    const descriptionInput = useInput(data?.description);
    const capacityInput = useInput(data?.capacity.toString(), v => (+v).toString() === v || v === '');

    const weekdayCheckboxes = [useCheckbox(), useCheckbox(), useCheckbox(), useCheckbox(), useCheckbox(), useCheckbox()]

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
        
    }, [])

    return (<>
        <CardGroupHeader>
            {type === 'EDIT' ? "정보 수정" : "새 방과후 추가"}
        </CardGroupHeader>
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
        <FormHeader>여일</FormHeader>
        <Horizontal>
            {days.slice(0, -1).map((day, i) => <Checkbox text={day} {...weekdayCheckboxes[i]} />)}
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
    </>)
}

const AfterschoolMangement: React.FC = () => {
    const [afterschoolClassList, setAfterschoolClassList] = useState<Doc<AfterschoolClass>[]>()
    const [sideDetail, setSideDetail] = useState<{
        type: | "REGISTER" | "EDIT";
        data?: AfterschoolClass;
    }>()

    useEffect(() => {
        getAfterschoolClassList()
            .then(setAfterschoolClassList)
    }, [])

    const openEdit = useCallback((classData: AfterschoolClass) => {
        if (window.innerWidth < 1300) { }
        else {
            setSideDetail(() => ({
                type: "EDIT",
                data: classData
            }))
        }
    }, [])

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
                        <HeaderButton>
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
                                선생님
                            </HeadData>
                            <HeadData>
                                요일
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
                                    <Data>{afterschoolClass.teacher.name}</Data>
                                    <Data>{afterschoolClass.days?.map(day => dayEngKorMapper[day])}</Data>
                                    <Data>방과후 3실</Data>
                                    <Data>{afterschoolClass.capacity}명</Data>
                                    <Data>3명</Data>
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
                            type={sideDetail?.type}
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

export default AfterschoolMangement
