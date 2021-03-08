import css from '@emotion/css';
import React, { useCallback, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';
import {
  getAllCircles,
  getAppliedCircles,
  finalSelect as _finalSelect,
} from '../../../api/circle';
import {
  showModal,
  PageWrapper,
  ResponsiveWrapper,
  Col,
  CardGroupHeader,
  Divider,
  NoData,
  TextCard,
} from '../../../components';
import {
  CircleApplicationStatusValues,
  SMALL_SCREEN_THRESHOLD,
} from '../../../constants';
import {
  CirclePeriod,
  Circle,
  Doc,
  CircleApplication,
} from '../../../constants/types';
import { swal } from '../../../functions/swal';
import { useConfig } from '../../../hooks/api';
import DangerIcon from '../../../assets/icons/danger.svg';
import { CircleCard, DummyCircleCard } from './CircleCard';
import { CircleDetail } from './CircleDetail';
import { MyApplication } from './MyApplication';
import { NewApply } from './NewApply';
import { toast } from 'react-toastify';
import { LocalstorageKeys } from '../../../constants/localstorageKeys';

const getSubheaderText = (
  currentPeriod: CirclePeriod,
  maxApplyAmount: number,
) =>
  ({
    [CirclePeriod.registering]: '동아리 등록기간입니다.',
    [CirclePeriod.submitting]: '현재 동아리 미리보기 기간입니다',
    [CirclePeriod.application]: `동아리 지원은 최대 ${maxApplyAmount}개까지 가능합니다.`,
    [CirclePeriod.interview]: '면접은 동아리 개별적으로 진행됩니다.',
    [CirclePeriod.final]: '최종 선택은 되돌릴 수 없으니 신중하게 생각해주세요.',
  }[currentPeriod]);

export interface CircleWithApplication extends Circle {
  status?: typeof CircleApplicationStatusValues[number] | null;
  form?: Record<string, string> | null;
  applicationId?: string | null;
}

const CircleDetailBrancher: React.FC<{
  circle: Doc<CircleWithApplication>;
  type: 'DETAIL' | 'NEW_APPLY' | 'VIEW_APPLICATION';
  close(): void;
  isModal: boolean;
  goApply(): void;
  refetch(): void;
}> = ({ circle, type, close, isModal, goApply, refetch }) => {
  return {
    DETAIL: (
      <CircleDetail
        close={() => close()}
        isModal={isModal}
        goApply={goApply}
        {...circle}
        chair={circle.chair.name}
      />
    ),
    NEW_APPLY: (
      <NewApply
        close={() => {
          close();
          refetch();
        }}
        isModal={isModal}
        {...circle}
      />
    ),
    VIEW_APPLICATION: (
      <MyApplication
        name={circle.name}
        form={circle.form ? circle.form : undefined}
        close={close}
        isModal={isModal}
      />
    ),
  }[type];
};

type SIDE_DETAIL_TYPE = 'DETAIL' | 'NEW_APPLY' | 'VIEW_APPLICATION';

export const Applier: React.FC = () => {
  const config = useConfig();

  const [circles, setCircles] = useState<Doc<CircleWithApplication>[] | null>();
  const [sideDetail, setSideDetail] = useState<{
    type: 'DETAIL' | 'NEW_APPLY' | 'VIEW_APPLICATION';
    selectedIndex: number;
    title?: string;
  } | null>(null);

  useEffect(() => {
    if (!localStorage.getItem(LocalstorageKeys.CIRCLE_INFO1_ALERT_CLOSED))
      swal({
        html: (
          <>
            <p>
              3월 4일 6시 35분부터 3월 8일 13시까지는 동아리 미리보기
              기간입니다.
            </p>
            <p>동아리 신청은 8일 13시 이후로 가능합니다.</p>
          </>
        ),
      });
    if (!localStorage.getItem(LocalstorageKeys.CIRCLE_INFO2_ALERT_CLOSED))
      swal({
        html: (
          <>
            <p>
              동아리 신청 서류가 정상적으로 뜨지 않으면 프로필사진을 클릭하고
              임시파일을 제거해주세요
            </p>
          </>
        ),
      });
    localStorage.setItem(LocalstorageKeys.CIRCLE_INFO1_ALERT_CLOSED, 'closed');
    localStorage.setItem(LocalstorageKeys.CIRCLE_INFO2_ALERT_CLOSED, 'closed');
  }, []);

  const fetchData = useCallback(async () => {
    if (!config) return;
    const fetchedCircles = (await getAllCircles()).sort(
      () => Math.random() - 0.5,
    );
    if (config.CIRCLE_PERIOD === CirclePeriod.submitting) {
      setCircles(() => fetchedCircles);
      return;
    }
    const fetchedAppliedCircles = (
      await getAppliedCircles()
    ).applications.reduce(
      (matched, current) => {
        if (!current.circle) return matched;
        return {
          ...matched,
          [current.circle._id]: current,
        };
      },
      {} as {
        [key: string]: Doc<CircleApplication> | undefined;
      },
    );
    const circlesListWithAppliedStatus = fetchedCircles.reduce<
      Doc<CircleWithApplication>[]
    >(
      (matched, current, index) => [
        ...matched.slice(0, index),
        {
          ...current,
          status: fetchedAppliedCircles[current._id]?.status || null,
          form: fetchedAppliedCircles[current._id]?.form || null,
          applicationId: fetchedAppliedCircles[current._id]?._id || null,
        },
        ...matched.slice(index + 1),
      ],
      fetchedCircles,
    );
    if (config.CIRCLE_PERIOD === CirclePeriod.application)
      setCircles(() => circlesListWithAppliedStatus);
    else
      setCircles(() =>
        circlesListWithAppliedStatus.filter((circle) => circle.applied),
      );
  }, [config]);

  const openDetail = useCallback(
    (
      index: number,
      type: SIDE_DETAIL_TYPE = circles?.[index].applied
        ? 'VIEW_APPLICATION'
        : 'DETAIL',
    ) => {
      if (!circles) return;
      if (window.innerWidth < 1100) {
        showModal(
          (close) => (
            <CircleDetailBrancher
              isModal
              circle={circles[index]}
              type={type}
              goApply={() => {
                close().then(() => openDetail(index, 'NEW_APPLY'));
              }}
              refetch={() => fetchData()}
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
                @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
                  padding: 0px;
                }
              `,
            },
            backdropProps: {
              css: css`
                overflow-y: auto;
              `,
            },
          },
        );
      } else
        setSideDetail(() => ({
          type,
          selectedIndex: index,
        }));
    },
    [circles, fetchData],
  );

  const finalSelect = useCallback(
    async (index: number) => {
      const selected = circles?.[index];
      if (!selected) return;
      if (!selected.applicationId) {
        toast.error('해당 동아리에 지원한 이력이 없어요');
        return;
      }
      const { isConfirmed } = await swal({
        title: `${selected.name}을 선택하시겠어요?`,
        html: (
          <>
            <p>"{selected.name}"를 최종 동아리로 선택해요.</p>
            <p>이 작업은 취소할 수 없어요.</p>
          </>
        ),
        imageUrl: DangerIcon,
        showCancelButton: true,
        focusCancel: true,
      });
      if (!isConfirmed) return;
      await _finalSelect(selected.applicationId);
      await fetchData();
    },
    [circles, fetchData],
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <PageWrapper>
      <CardGroupHeader
        subButton={
          config
            ? {
                text: getSubheaderText(
                  config.CIRCLE_PERIOD,
                  config.CIRCLE_MAX_APPLY,
                ),
              }
            : {
                component: <Skeleton />,
              }
        }
      >
        동아리 지원
      </CardGroupHeader>
      <ResponsiveWrapper>
        <Col width={sideDetail ? 4 : 10}>
          {circles ? (
            circles.length ? (
              <GridWrapper>
                {circles.map((circle, index) => (
                  <CircleCard
                    isPreview={
                      config?.CIRCLE_PERIOD === CirclePeriod.submitting
                    }
                    key={circle._id}
                    {...circle}
                    finalSelect={() => finalSelect(index)}
                    openSideDetail={() =>
                      !(config?.CIRCLE_PERIOD === CirclePeriod.submitting) &&
                      openDetail(index)
                    }
                  />
                ))}
              </GridWrapper>
            ) : (
              <TextCard>
                <NoData>
                  {config?.CIRCLE_PERIOD === CirclePeriod.application
                    ? '신청 가능한 동아리가 없어요'
                    : config?.CIRCLE_PERIOD === CirclePeriod.registering
                    ? '동아리 등록기간이에요. 동아리 목록은 3월 4일 방과후 시간 이후에 공개돼요.'
                    : '상태 변경 가능한 동아리가 없어요'}
                </NoData>
              </TextCard>
            )
          ) : (
            <>
              <GridWrapper>
                {[...Array(20)].map((_, index) => (
                  <DummyCircleCard key={`dummy${index}`} />
                ))}
              </GridWrapper>
            </>
          )}
        </Col>
        {sideDetail && circles && (
          <>
            <Divider data-divider />
            <Col width={6}>
              <CircleDetailBrancher
                isModal={false}
                goApply={() => {
                  setSideDetail(() => null);
                  openDetail(sideDetail.selectedIndex, 'NEW_APPLY');
                }}
                circle={circles[sideDetail.selectedIndex]}
                type={sideDetail.type}
                refetch={() => fetchData()}
                close={() => setSideDetail(() => null)}
              />
            </Col>
          </>
        )}
      </ResponsiveWrapper>
    </PageWrapper>
  );
};

const GridWrapper = styled.div`
  margin: -15px;
  /* padding-top: 14px; */
  display: flex;
  flex-wrap: wrap;
  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    flex-direction: column;
    margin: 0px;
  }
`;

export default Applier;
