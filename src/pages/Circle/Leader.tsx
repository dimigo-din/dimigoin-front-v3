import css from '@emotion/css';
import styled from '@emotion/styled';
import React, { useCallback, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getApplications,
  hasRegisteredCircle,
  setApplicationStatus,
} from '../../api/circle';
import { ApplicationForSubmiter } from '../../api/interfaces/circle';
import DangerIcon from '../../assets/icons/danger.svg';
import {
  Button,
  Card,
  CardGroupHeader,
  Checkbox,
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
  Table as _Table,
} from '../../components';
import {
  circleApplicationStatusKorMapper,
  CircleApplicationStatusLevelTree,
  CircleApplicationStatusValues,
} from '../../constants';
import {
  CircleApplication,
  CirclePeriod,
  Doc,
  Merge,
  Student,
} from '../../constants/types';
import { swal } from '../../functions/swal';
import { useConfig } from '../../hooks/api';
import { MyApplication } from './Applier/MyApplication';

const submitTypeValues = ['PASS', 'FAIL'] as const;
type SubmitType = typeof submitTypeValues[number];

const isChangable = (
  currentPeriod: keyof typeof CirclePeriod,
  applicationStatus: typeof CircleApplicationStatusValues[number],
) => {
  return (
    { application: 1, interview: 3, final: 0 }[currentPeriod] >
    CircleApplicationStatusValues.indexOf(applicationStatus)
  );
};

const ApplicationList: React.FC<{
  applications?: Doc<ApplicationForSubmiter>[] | null;
  changeState(
    submitType: SubmitType,
    selectedApplications: Doc<ApplicationForSubmiter>[],
  ): void;
  openDetail(index: number): void;
  currentPeriod?: string;
}> = ({ applications, changeState, openDetail, currentPeriod }) => {
  const [checks, setChecks] = useState<boolean[]>(
    Array(applications?.length).fill(false),
  );
  const [buttonVisible, setButtonVisible] = useState(false);

  useEffect(() => {
    setButtonVisible(() => checks.some((c) => c));
  }, [checks]);

  useEffect(() => {
    setChecks(() => Array(applications?.length).fill(false));
  }, [applications]);

  const submit = useCallback(
    (type: SubmitType) => {
      if (!checks.some((check) => check)) {
        toast.error('지원서가 선택되지 않았어요');
        return;
      }
      if (!applications?.length) {
        toast.error('변경할 지원서가 없어요');
        return;
      }
      // if()
      changeState(
        type,
        checks
          .map((checks, index) => checks && applications[index])
          .filter((e): e is Doc<ApplicationForSubmiter> => !!e),
      );
    },
    [applications, changeState, checks],
  );

  return (
    <TableWrapper>
      <Table buttonVisible={buttonVisible}>
        <HeadRow>
          <tr>
            <HeadData></HeadData>
            <HeadData>이름</HeadData>
            <HeadData>학번</HeadData>
            <HeadData>상태</HeadData>
            {/* <HeadData>함께 지원한 동아리</HeadData> */}
          </tr>
        </HeadRow>
        <tbody>
          {applications ? (
            applications.length ? (
              applications.map((application, index) => (
                <Row key={application._id} onClick={() => openDetail(index)}>
                  <Data>
                    <Checkbox
                      disabled={
                        currentPeriod
                          ? !isChangable(
                              currentPeriod as keyof typeof CirclePeriod,
                              application.status,
                            )
                          : undefined
                      }
                      checked={checks[index]}
                      onChange={({ target: { checked } }) =>
                        setChecks((beforeState) => [
                          ...beforeState.slice(0, index),
                          checked,
                          ...beforeState.slice(index + 1),
                        ])
                      }
                    />
                  </Data>
                  <Data>{application.applier.name}</Data>
                  <Data>{application.applier.serial}</Data>
                  <Data>
                    {circleApplicationStatusKorMapper[application.status]}
                  </Data>
                  {/* <Data>이누, 유니콘, 프레직</Data> */}
                </Row>
              ))
            ) : (
              <Data colSpan={7}>
                <NoData> 지원자가 없습니다 </NoData>
              </Data>
            )
          ) : applications === null ? (
            <Data colSpan={7}>
              <NoData> 지원자를 불러올 수 없습니다 </NoData>
            </Data>
          ) : (
            <Row>
              <Data>
                <Skeleton />
              </Data>
              <Data>
                <Skeleton />
              </Data>
              <Data>
                <Skeleton />
              </Data>
              <Data>
                <Skeleton />
              </Data>
              {/* <Data><Skeleton /></Data> */}
            </Row>
          )}
        </tbody>
      </Table>
      <StateChangerWrapper visible={buttonVisible}>
        <Button onClick={() => submit('PASS')} text>
          불합격
        </Button>
        <Button onClick={() => submit('FAIL')}>합격</Button>
      </StateChangerWrapper>
    </TableWrapper>
  );
};

export const Leader: React.FC = () => {
  const [applications, setApplications] = useState<
    Doc<ApplicationForSubmiter>[] | null
  >();
  const config = useConfig();

  const [sideDetail, setSideDetail] = useState<number | null>(null);
  const [hasRegistered, setHasRegistered] = useState<boolean>();

  const fetchData = useCallback(
    () =>
      getApplications()
        .then(setApplications)
        .catch(() => setApplications(() => null)),
    [],
  );

  useEffect(() => {
    hasRegisteredCircle().then((_hasRegistered) => {
      setHasRegistered(_hasRegistered);
      if (_hasRegistered === true) {
        fetchData();
      }
    });
  }, [fetchData]);

  const changeState = useCallback(
    async (
      submitType: SubmitType,
      selectedApplications: Doc<ApplicationForSubmiter>[],
    ) => {
      // CircleApplicationStatusValues

      if (!config) {
        toast.error('현재 선발 단계를 불러올 수 없어요. 다시 시도해주세요');
        return;
      }

      const nextLevel = CircleApplicationStatusLevelTree[config.CIRCLE_PERIOD];
      if (!nextLevel) {
        toast.error('지정할 수 없는 상태입니다');
        return;
      }

      const changeTo = nextLevel[submitTypeValues.indexOf(submitType)];
      if (!changeTo) {
        toast.error('지정할 수 없는 상태입니다');
        return;
      }
      const { isConfirmed } = await swal({
        title: '상태를 변경하시겠어요?',
        html: (
          <>
            <p>
              {selectedApplications.map((e) => e.applier.name).join(', ')}{' '}
              지원자의 상태를 {circleApplicationStatusKorMapper[changeTo].으로}{' '}
              변경해요.
            </p>
            <p>이 작업은 취소할 수 없어요.</p>
          </>
        ),
        imageUrl: DangerIcon,
        showCancelButton: true,
        focusCancel: true,
      });

      if (!isConfirmed) return;

      const res = await Promise.allSettled(
        selectedApplications.map((application) =>
          setApplicationStatus(application._id, changeTo),
        ),
      );

      const { fulfilled, rejected } = res.reduce<{
        fulfilled: PromiseFulfilledResult<
          Doc<
            Merge<
              CircleApplication,
              {
                circle: string;
                applier: Student;
                index: number;
              }
            >
          >
        >[];
        rejected: (PromiseRejectedResult & {
          index: number;
        })[];
      }>(
        (matched, current, index) => ({
          ...matched,
          [current.status]: [
            ...(matched[current.status] || []),
            {
              ...current,
              index,
            },
          ],
        }),
        { fulfilled: [], rejected: [] },
      );
      if (fulfilled.length)
        toast.success(
          `${fulfilled
            .map((e) => e.value.applier.name)
            .join(', ')} 지원자의 상태를 ${
            circleApplicationStatusKorMapper[changeTo].으로
          } 변경했어요`,
        );
      if (rejected.length)
        toast.info(
          `${rejected
            .map((e) => selectedApplications[e.index].applier.name)
            .join(', ')} 지원자의 상태를 변경하지 못했어요`,
        );
      fetchData();
    },
    [config, fetchData],
  );

  const openDetail = useCallback(
    (index: number) => {
      if (!applications) return;
      if (window.innerWidth < 1100) {
        showModal(
          (close) => (
            <MyApplication
              isModal
              form={applications[index].form}
              name={`${applications[index].applier.serial} ${applications[index].applier.name}`}
              close={() => close()}
            />
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
      } else setSideDetail(() => index);
    },
    [applications],
  );

  if (hasRegistered === false) return <Redirect to="/circle/new" />;

  return (
    <PageWrapper>
      <ResponsiveWrapper>
        <Col width={sideDetail ? 10 : 5}>
          <CardGroupHeader>동아리 지원자 관리</CardGroupHeader>
          <ApplicationList
            currentPeriod={config?.CIRCLE_PERIOD.toLowerCase()}
            openDetail={openDetail}
            changeState={changeState}
            applications={applications}
          />
        </Col>
        {applications && sideDetail !== null && (
          <>
            <Divider data-divider />
            <Col width={5}>
              <MyApplication
                close={() => setSideDetail(() => null)}
                name={`${applications[sideDetail].applier.serial} ${applications[sideDetail].applier.name}`}
                form={applications[sideDetail].form}
                isModal={false}
              />
            </Col>
          </>
        )}
      </ResponsiveWrapper>
    </PageWrapper>
  );
};

export default Leader;

const TableWrapper = styled(Card)`
  padding: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

const StateChangerWrapper = styled.div<{ visible: boolean }>`
  position: absolute;
  visibility: hidden;
  background-color: white;
  margin-bottom: -15px;
  transition: 300ms cubic-bezier(0, 0.46, 0.12, 0.98);
  opacity: 0;
  border-radius: 5px;
  box-shadow: 0px 0px 20px rgba(146, 146, 146, 0.1);

  ${({ visible }) =>
    visible &&
    css`
      visibility: visible;
      opacity: 1;
      margin-bottom: 15px;
    `}
`;

const Table = styled(_Table)<{ buttonVisible: boolean }>`
  box-shadow: none;
  align-self: stretch;

  ${({ buttonVisible }) =>
    buttonVisible &&
    css`
      margin-bottom: 72px;
    `}
`;
