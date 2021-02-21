import css from "@emotion/css"
import styled from "@emotion/styled"
import React, { useCallback, useEffect, useState } from "react"
import { getAfterschoolClassList } from "../../api/afterschool"
import { ReactComponent as _DownloadIcon } from '../../assets/icons/download.svg'
import { ReactComponent as _NewIcon } from '../../assets/icons/edit.svg'
import {
    CardGroupHeader, Col, Data, HeadData, HeadRow, Horizontal,
    Row, MoreCompactButton, NoData, PageWrapper, ResponsiveWrapper,
    Table, Card, Divider, showModal} from "../../components"
import { dayEngKorMapper } from "../../constants"
import { AfterschoolClass, Doc, SelfStudyTimeEngKor } from "../../constants/types"
import Skeleton from "react-loading-skeleton"
import { AfterschoolEditor } from "./AfterschoolEditor"


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
                    {afterschoolClassList !== undefined ? afterschoolClassList?.length === 0 ?
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
                                    <Data>{afterschoolClass.place?.name || "정보없음"}</Data>
                                    <Data>{afterschoolClass.capacity}명</Data>
                                    <Data>X명</Data>
                                </Row>
                            )}
                        </tbody> : <Row>
                            <Data><Skeleton /></Data>
                        </Row>
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

export default AfterschoolMangement
