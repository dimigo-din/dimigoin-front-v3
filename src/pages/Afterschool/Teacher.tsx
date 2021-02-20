import css from "@emotion/css"
import styled from "@emotion/styled"
import React, { useEffect, useState } from "react"
import { getAfterschoolClassList } from "../../api/afterschool"
import { ReactComponent as _DownloadIcon } from '../../assets/icons/download.svg'
import { ReactComponent as _NewIcon } from '../../assets/icons/edit.svg'
import { CardGroupHeader, Col, Data, HeadData, HeadRow, Horizontal, MoreCompactButton, NoData, PageWrapper, ResponsiveWrapper, Row, Table } from "../../components"
import { dayEngKorMapper } from "../../constants"
import { AfterschoolClass, Doc } from "../../constants/types"

const AfterschoolMangement: React.FC = () => {
    const [afterschoolClassList, setAfterschoolClassList] = useState<Doc<AfterschoolClass>[]>()

    useEffect(() => {
        getAfterschoolClassList()
            .then(setAfterschoolClassList)
    }, [])

    return <PageWrapper>
        <ResponsiveWrapper>
            <Col width={10}>
                <HeaderWrapper>
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
                    </HeadRow>
                    {afterschoolClassList?.length === 0 ?
                        <NoData> 개설된 강의가 없습니다 </NoData>
                        : afterschoolClassList?.map(afterschoolClass =>
                            <Row key={afterschoolClass._id}>
                                <Data>{afterschoolClass.name}</Data>
                                <Data>{afterschoolClass.teacher} 선생님</Data>
                                <Data>{afterschoolClass.day.map(day => dayEngKorMapper[day])}</Data>
                                <Data>아직안나와요</Data>
                                <Data>{afterschoolClass.capacity}</Data>
                                <Data>아직안나와요</Data>
                            </Row>)}
                </Table>
            </Col>
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
