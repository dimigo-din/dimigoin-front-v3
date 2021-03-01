import css from '@emotion/css';
import React, { useCallback, useEffect, useState } from 'react';
import { getMentoringList } from '../../api/mentoring';
import {
  Card,
  CardGroupHeader,
  CardGroupHeaderButton,
  CardGroupHeaderWrapper,
  Col,
  Data,
  Divider,
  HeadData,
  HeadRow,
  NoData,
  PageWrapper,
  ResponsiveWrapper,
  Row,
  showModal,
  Table,
} from '../../components';
import { ReactComponent as _DownloadIcon } from '../../assets/icons/download.svg';
import { Doc, Mentoring } from '../../constants/types';
import { ReactComponent as _NewIcon } from '../../assets/icons/edit.svg';
import styled from '@emotion/styled';
import { MentoringEditor } from './MentoringEditor';
import { dayEngKorMapper } from '../../constants';
import Skeleton from 'react-loading-skeleton';
import { toast } from 'react-toastify';
import { requestMentoringApplyInfoSheet } from '../../api';
import { downloadFileFromDownloadble } from '../../functions/downloadById';

const Teacher: React.FC = () => {
  const [mentoringList, setMentoringList] = useState<Doc<Mentoring>[] | null>();
  const [sideDetail, setSideDetail] = useState<Doc<Mentoring> | null>();

  const fetchData = useCallback(() => {
    getMentoringList()
      .then(setMentoringList)
      .catch(() => setMentoringList(() => null));
  }, []);

  const openEdit = useCallback(
    (classData?: Doc<Mentoring>) => {
      if (window.innerWidth < 1300) {
        showModal(
          (close) => (
            <Card
              css={css`
                flex: 1;
                overflow: auto;
              `}
            >
              <MentoringEditor
                close={close}
                data={classData}
                fetchData={() => {
                  fetchData();
                  close();
                }}
              />
            </Card>
          ),
          {
            wrapperProps: {
              css: css`
                max-width: min(720px, 100vw);
                width: 100vw;
                height: 100vh;
                display: flex;
                padding: 60px 20px 20px;
              `,
            },
            backdropProps: {
              css: css`
                overflow-y: auto;
              `,
            },
          },
        );
      } else {
        setSideDetail(() => classData || null);
      }
    },
    [fetchData],
  );

  const downloadSheet = useCallback(() => {
    requestMentoringApplyInfoSheet()
      .then((downloadable) => {
        downloadFileFromDownloadble(downloadable);
        toast.success('멘토링 신청 내역 시트를 다운로드했어요');
      })
      .catch(() => {
        toast.error('파일을 다운로드하지 못했어요');
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <PageWrapper>
      <CardGroupHeaderWrapper>
        <CardGroupHeader
          css={css`
            flex: 1;
          `}
        >
          멘토링 관리
        </CardGroupHeader>
        <CardGroupHeaderButton onClick={() => downloadSheet()}>
          <DownloadIcon />
          엑셀 다운로드
        </CardGroupHeaderButton>
        <CardGroupHeaderButton onClick={() => openEdit()}>
          <NewIcon />새 멘토링
        </CardGroupHeaderButton>
      </CardGroupHeaderWrapper>
      <ResponsiveWrapper>
        <Col width={sideDetail ? 5 : 10}>
          <Table>
            <HeadRow>
              <tr>
                <HeadData>이름</HeadData>
                <HeadData>선생님</HeadData>
                <HeadData>대상 학년</HeadData>
                <HeadData>과목</HeadData>
                <HeadData>요일</HeadData>
                <HeadData>시간</HeadData>
              </tr>
            </HeadRow>
            <tbody>
              {mentoringList ? (
                mentoringList.length !== 0 ? (
                  mentoringList.map((mentoring) => (
                    <Row
                      key={mentoring._id}
                      onClick={() => openEdit(mentoring)}
                    >
                      <Data>{mentoring.name}</Data>
                      <Data>{mentoring.teacher.name}</Data>
                      <Data>{mentoring.targetGrade}</Data>
                      <Data>{mentoring.subject}</Data>
                      <Data>
                        {mentoring.days.map((day) => dayEngKorMapper[day])}
                      </Data>
                      <Data>
                        {mentoring.duration.start.hour}:
                        {mentoring.duration.start.minute} ~{' '}
                        {mentoring.duration.end.hour}:
                        {mentoring.duration.end.minute}
                      </Data>
                    </Row>
                  ))
                ) : (
                  <Row>
                    <Data colSpan={6}>
                      <NoData> 개설된 강의가 없습니다 </NoData>
                    </Data>
                  </Row>
                )
              ) : (
                <>
                  <Row>
                    <Data>
                      <Skeleton width={100} />
                    </Data>
                    <Data>
                      <Skeleton width={100} />
                    </Data>
                    <Data>
                      <Skeleton width={100} />
                    </Data>
                    <Data>
                      <Skeleton width={100} />
                    </Data>
                    <Data>
                      <Skeleton width={100} />
                    </Data>
                    <Data>
                      <Skeleton width={100} />
                    </Data>
                  </Row>
                  <Row>
                    <Data>
                      <Skeleton width={100} />
                    </Data>
                    <Data>
                      <Skeleton width={100} />
                    </Data>
                    <Data>
                      <Skeleton width={100} />
                    </Data>
                    <Data>
                      <Skeleton width={100} />
                    </Data>
                    <Data>
                      <Skeleton width={100} />
                    </Data>
                    <Data>
                      <Skeleton width={100} />
                    </Data>
                  </Row>
                </>
              )}
            </tbody>
          </Table>
        </Col>
        {sideDetail !== undefined ? (
          <>
            <Divider data-divider />
            <Col width={5}>
              <Card>
                <MentoringEditor
                  fetchData={() => {
                    fetchData();
                    setSideDetail(() => undefined);
                  }}
                  data={sideDetail}
                  close={() => setSideDetail(() => undefined)}
                />
              </Card>
            </Col>
          </>
        ) : (
          <></>
        )}
      </ResponsiveWrapper>
    </PageWrapper>
  );
};

export default Teacher;

const NewIcon = styled(_NewIcon)`
  fill: white;
  margin-right: 12px;
`;

const DownloadIcon = styled(_DownloadIcon)`
  stroke: white;
  margin-right: 12px;
`;
