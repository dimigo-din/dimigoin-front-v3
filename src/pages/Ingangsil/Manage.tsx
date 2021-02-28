import css from '@emotion/css'
import styled from '@emotion/styled'
import React, { useCallback, useEffect, useState } from 'react'
import { Card, PageWrapper, CardGroupHeader, ResponsiveWrapper, Divider, NoData } from '../../components'
import { ReactComponent as _DownloadIcon } from '../../assets/icons/download.svg'
import { getEntireTicket, requestExcelFile } from '../../api/ingangsil'
import { downloadFileFromDownloadble } from '../../functions/downloadById'
import { NightSelfStudyTimeKey, Student } from '../../constants/types'
import Skeleton from 'react-loading-skeleton'
import { SMALL_SCREEN_THRESHOLD } from '../../constants'
// import { group } from 'console'

const ApplierListCard: React.FC<{
    students?: {
        [key in NightSelfStudyTimeKey]: Student[]
    };
    grade: number;
    onClickDownload(): void
}> = ({ onClickDownload, students, grade }) => {
    return <Card disableSpace css={css`padding: 0px;`}>
        <CardTitle>
            {grade}학년
            <DownloadIconWrapper>
                <DownloadIcon onClick={() => onClickDownload()} />
            </DownloadIconWrapper>
        </CardTitle>
        <SectionHeader>
            <SectionName>1타임</SectionName>
            <SectionName>2타임</SectionName>
        </SectionHeader>
        <SectionsWrapper>
            {(students?.NSS1.length === 0) && (students.NSS2.length === 0) ? <NoApplier>신청 인원이 없습니다</NoApplier> : (<>
                <Section>
                    {students ?
                        students.NSS1.map(student => <Name>{student.serial} {student.name}</Name>)
                        : <Skeleton width={148} />}
                </Section>
                <Section>
                    {students ? students.NSS1.map(student => <Name>{student.serial} {student.name}</Name>) : <Skeleton width={148} />}
                </Section>
            </>
            )}
        </SectionsWrapper>
    </Card>
}

interface TicketsGroupedByGradeAndTime {
    [key: number]: {
        [key in NightSelfStudyTimeKey]: Student[]
    }
}

export const IngangsilManager: React.FC = () => {
    const [ticketsByGrade, setTicketsByGrade] = useState<TicketsGroupedByGradeAndTime>()
    const downloadExcel = useCallback(async (grade: number) => {
        const request = await requestExcelFile(grade)
        downloadFileFromDownloadble(request)
    }, [])
    useEffect(() => {
        (async () => {
            const entireTickets = await getEntireTicket()
            const groupedTicket = entireTickets.reduce<TicketsGroupedByGradeAndTime>((grouped, current) => {
                return {
                    ...grouped,
                    [current.applier.grade]: {
                        ...grouped[current.applier.grade],
                        [current.time]: [...grouped[current.applier.grade][current.time], current.applier]
                    }
                }
            }, {
                1: {
                    [NightSelfStudyTimeKey.NSS1]: [],
                    [NightSelfStudyTimeKey.NSS2]: [],
                },
                2: {
                    [NightSelfStudyTimeKey.NSS1]: [],
                    [NightSelfStudyTimeKey.NSS2]: [],
                },
                3: {
                    [NightSelfStudyTimeKey.NSS1]: [],
                    [NightSelfStudyTimeKey.NSS2]: [],
                }
            })
            
            setTicketsByGrade(() => groupedTicket)
        })()
    }, [])
    return <PageWrapper>
        <CardGroupHeader>인강실 신청자</CardGroupHeader>
        <ResponsiveWrapper threshold={1200}>
            {
                [...Array(3)].map((_, index) => <>
                        {(index !== 0) && <Divider data-divider small />}
                        <ApplierListCard
                            onClickDownload={() => downloadExcel(index + 1)}
                            students={ticketsByGrade?.[index + 1]}
                            grade={index + 1}  
                        />
                    </>
                )
            }
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

    @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
        font-size: 16px;
    }
`

const SectionHeader = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    color: #9A9A9A;
    padding: 10px 40px;
    border-bottom: 1px solid #D1D1D1;

    @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
        margin-top: 12px;
    }
`

const SectionName = styled.h3`
    font-size: 18px;
    font-weight: 700;

    @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
        font-size: 14px;
    }
`

const SectionsWrapper = styled.div`
    padding: 10px 20px;
    display: flex;
`

const Section = styled.div`
    flex: 1;
`

const DownloadIconWrapper = styled.div`
    /* position: absolute;
    margin-right: -90px; */
    margin-left: 12px;
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

export const NoApplier = styled(NoData)`
    width: 300px;
    box-sizing: border-box;
    flex: 1;
`

export default IngangsilManager
