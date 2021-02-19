import css from '@emotion/css'
import styled from '@emotion/styled'
import React, { useCallback } from 'react'
import { Card, PageWrapper, CardGroupHeader, ResponsiveWrapper, Divider, MoreCompactButton } from '../../components'
import { ReactComponent as _DownloadIcon } from '../../assets/icons/download.svg'
import { requestExcelFile } from '../../api/ingangsil'
import { downloadFileFromDownloadble } from '../../functions/downloadById'

const ApplierListCard: React.FC<{ onClickDownload(): void }> = ({ onClickDownload }) => {
    return <Card disableSpace css={css`padding: 0px;`}>
        <CardTitle>
            1학년
            <DownloadIconWrapper>
                <DownloadIcon onClick={() => onClickDownload()} />
            </DownloadIconWrapper>
        </CardTitle>
        <SectionHeader>
            <SectionName>1타임</SectionName>
            <SectionName>2타임</SectionName>
        </SectionHeader>
        <SectionsWrapper>
            <Section>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
            </Section>
            <Section>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
                <Name>2414 박정한</Name>
            </Section>
        </SectionsWrapper>
    </Card>
}

export const IngangsilManager: React.FC = () => {
    const downloadExcel = useCallback(async (grade: number) => {
        const request = await requestExcelFile(grade)
        downloadFileFromDownloadble(request)
    }, [])
    return <PageWrapper>
        <CardGroupHeader>인강실 신청자</CardGroupHeader>
        <ResponsiveWrapper threshold={1200}>
            <ApplierListCard onClickDownload={() => downloadExcel(1)} />
            <Divider data-divider small />
            <ApplierListCard onClickDownload={() => downloadExcel(2)} />
            <Divider data-divider small />
            <ApplierListCard onClickDownload={() => downloadExcel(3)} />
        </ResponsiveWrapper>
    </PageWrapper>
}

const CardTitle = styled.h2`
    display: flex;
    font-size: 20px;
    font-weight: 800;
    text-align: center;
    padding-top: 20px;
    justify-content: center;
`

const SectionHeader = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    color: #9A9A9A;
    padding: 10px 40px;
    border-bottom: 1px solid #D1D1D1;
`

const SectionName = styled.h3`
    font-size: 18px;
    font-weight: 700;
`

const SectionsWrapper = styled.div`
    padding: 10px 20px;
    display: flex;
`

const Section = styled.div`
    flex: 1;
`

const DownloadIconWrapper = styled.div`
    position: absolute;
    margin-right: -90px;
    width: 16px;
    height: 16px;
    display: block;
`

const DownloadIcon = styled(_DownloadIcon)`
    stroke: rgba(0,0,0,0.2);
`

const Name = styled.div`
    padding: 10px 20px;
    font-size: 20px;
    font-weight: 700;
    color: #707070;
    text-align: center;
    white-space: nowrap;
`

export default IngangsilManager
