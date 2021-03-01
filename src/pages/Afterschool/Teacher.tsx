import css from '@emotion/css';
import styled from '@emotion/styled';
import React, { useCallback, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { toast } from 'react-toastify';
import { getAfterschoolClassList, requestSheetByGrade } from '../../api';
import { ReactComponent as _DownloadIcon } from '../../assets/icons/download.svg';
import { ReactComponent as _NewIcon } from '../../assets/icons/edit.svg';
import {
  CardGroupHeader,
  Col,
  Data,
  HeadData,
  HeadRow,
  Horizontal,
  Row,
  NoData,
  PageWrapper,
  ResponsiveWrapper,
  Table,
  Card,
  Divider,
  showModal,
  CardGroupHeaderButton,
  CardGroupHeaderWrapper,
} from '../../components';
import { dayEngKorMapper } from '../../constants';
import { AfterschoolClass, Doc } from '../../constants/types';
import { downloadFileFromDownloadble } from '../../functions/downloadById';
import { selfStudyTimesToString } from '../../utils';
import { AfterschoolEditor } from './AfterschoolEditor';

const AfterschoolMangement: React.FC = () => {
  const [afterschoolClassList, setAfterschoolClassList] = useState<
    Doc<AfterschoolClass>[]
  >();
  const [sideDetail, setSideDetail] = useState<{
    data?: Doc<AfterschoolClass>;
  }>();
  const [gradeButtonOpened, setGradeButtonOpenedState] = useState(false);

  const fetchData = useCallback(() => {
    getAfterschoolClassList().then(setAfterschoolClassList);
  }, [setAfterschoolClassList]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openEdit = useCallback(
    (classData?: Doc<AfterschoolClass>) => {
      if (window.innerWidth < 1300) {
        showModal(
          (close) => (
            <Card
              css={css`
                flex: 1;
                overflow: auto;
              `}
            >
              <AfterschoolEditor
                close={() => {
                  fetchData();
                  close();
                }}
                data={classData}
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
        setSideDetail(() => ({
          data: classData,
        }));
      }
    },
    [fetchData],
  );

  const downloadSheetByGrade = useCallback(
    (grade: number, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation();
      requestSheetByGrade(grade)
        .then((downloadable) => {
          downloadFileFromDownloadble(downloadable);
          toast.success('방과후 신청 내역 시트를 다운로드했어요');
        })
        .catch(() => {
          toast.error('파일을 다운로드하지 못했어요');
        });
      setGradeButtonOpenedState(() => false);
    },
    [],
  );

  return (
    <PageWrapper>
      <CardGroupHeader
        css={css`
          flex: 1;
        `}
      >
        방과후 관리
      </CardGroupHeader>
      <ResponsiveWrapper>
        <Col width={sideDetail ? 5 : 10}>
          <CardGroupHeaderWrapper
            css={css`
              flex-grow: 0;
            `}
          >
            <Horizontal>
              <CardGroupHeaderButton
                onClick={() =>
                  setGradeButtonOpenedState((beforeState) => !beforeState)
                }
              >
                <DownloadIcon />
                엑셀 다운로드
                <GradeButtonWrapper isOpened={gradeButtonOpened}>
                  <GradeButton
                    onClick={(event) => downloadSheetByGrade(1, event)}
                  >
                    1
                  </GradeButton>
                  <GradeButton
                    onClick={(event) => downloadSheetByGrade(2, event)}
                  >
                    2
                  </GradeButton>
                  <GradeButton
                    onClick={(event) => downloadSheetByGrade(3, event)}
                  >
                    3
                  </GradeButton>
                </GradeButtonWrapper>
              </CardGroupHeaderButton>
              <CardGroupHeaderButton onClick={() => openEdit()}>
                <NewIcon />
                신규 등록
              </CardGroupHeaderButton>
            </Horizontal>
          </CardGroupHeaderWrapper>
          <Table>
            <HeadRow>
              <tr>
                <HeadData>강좌명</HeadData>
                <HeadData>대상</HeadData>
                <HeadData>선생님</HeadData>
                <HeadData>시간</HeadData>
                <HeadData>강의실</HeadData>
                <HeadData>정원</HeadData>
                <HeadData>신청자</HeadData>
              </tr>
            </HeadRow>
            {afterschoolClassList !== undefined ? (
              afterschoolClassList?.length === 0 ? (
                <Data colSpan={7}>
                  <NoData> 개설된 강의가 없습니다 </NoData>
                </Data>
              ) : (
                <tbody>
                  {afterschoolClassList?.map((afterschoolClass) => (
                    <Row
                      key={afterschoolClass._id}
                      onClick={() => openEdit(afterschoolClass)}
                    >
                      <Data>{afterschoolClass.name}</Data>
                      <Data>
                        {afterschoolClass.targetGrades.length !== 0
                          ? (afterschoolClass.targetGrades.length === 3
                              ? '전'
                              : afterschoolClass.targetGrades.join(', ')) +
                            '학년'
                          : '학년정보없음,'}
                        &nbsp;
                        {afterschoolClass.targetClasses.length === 6
                          ? '모든'
                          : afterschoolClass.targetClasses.join(', ')}
                        반
                      </Data>
                      <Data>{afterschoolClass.teacher.name}</Data>
                      <Data>
                        {afterschoolClass.days?.map(
                          (day) => dayEngKorMapper[day],
                        )}
                        ,&nbsp;
                        {selfStudyTimesToString(afterschoolClass.times)}
                      </Data>
                      <Data>{afterschoolClass.place?.name || '정보없음'}</Data>
                      <Data>{afterschoolClass.capacity}명</Data>
                      <Data>{afterschoolClass.applierCount}명</Data>
                    </Row>
                  ))}
                </tbody>
              )
            ) : (
              <Row>
                <Data>
                  <Skeleton />
                </Data>
              </Row>
            )}
          </Table>
        </Col>
        {sideDetail ? (
          <>
            <Divider data-divider />
            <Col width={5}>
              <Card>
                <AfterschoolEditor
                  close={() => {
                    fetchData();
                    setSideDetail(() => undefined);
                  }}
                  data={sideDetail?.data}
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

const DownloadIcon = styled(_DownloadIcon)`
  stroke: white;
  margin-right: 12px;
`;

const NewIcon = styled(_NewIcon)`
  fill: white;
  margin-right: 12px;
`;

const GradeButtonWrapper = styled.div<{ isOpened: boolean }>`
  position: absolute;
  box-shadow: 0px 0px 36px rgba(0, 0, 0, 0.2);
  display: flex;
  margin-bottom: -64px;
  border-radius: 24px;
  overflow: hidden;
  transition: 300ms cubic-bezier(0, 0.76, 0.12, 0.98);
  ${({ isOpened }) =>
    !isOpened &&
    css`
      margin-bottom: -48px;
      visibility: hidden;
      opacity: 0;
    `}
`;

const GradeButton = styled.div`
  background-color: #fff;
  color: black;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:first-of-type {
    padding-left: 6px;
  }

  &:last-of-type {
    padding-right: 6px;
  }
`;

export default AfterschoolMangement;
