import css from '@emotion/css';
import React from 'react';
import { toast } from 'react-toastify';
import { DisplayPlace } from '.';
import { getPlaceList, getPrimaryPlaceList } from '../../api/place';
import { showModal } from '../../components';
import { LocalstorageKeys } from '../../constants/localstorageKeys';
import { Student, Doc, Place } from '../../constants/types';
import { InputFormModal } from '../Main/InputFormModal';
import { OtherPlaceModal } from '../Main/OtherPlaceModal';

const getHomeroom = async (grade?: number, clas?: number) => {
  try {
    if (grade) throw new Error('올바르지 않은 접근입니다');
    const primaryPlaces = await getPrimaryPlaceList();
    const homeroom = primaryPlaces.find((place) => place.label === '교실');
    if (homeroom) return homeroom;
    throw new Error('교실 정보를 찾을 수 없습니다');
  } catch (e) {
    if (!(grade && clas)) throw e;
    const queriedHomeroom = (await getPlaceList()).find(
      (place) => place.name === `${grade}학년 ${clas}반`,
    );
    if (queriedHomeroom) return queriedHomeroom;
    throw e;
  }
};

const queryPlaceByName = async (name: string) => {
  return (await getPlaceList()).find((place) => place.name.includes(name));
};

export const getIngangsil = (grade: number): Promise<Doc<Place>> =>
  Promise.all([queryPlaceByName('영어 전용'), queryPlaceByName('비즈쿨')]).then(
    (ingangsilPlaces) => {
      if (ingangsilPlaces.some((place) => !place?._id)) {
        throw new Error('인강실을 찾을 수 없어요');
      }
      return (ingangsilPlaces as Doc<Place>[])[grade];
    },
  );

export const getTargetPlaceByLabelAndStudent = (
  student: Student,
  { name: placeName }: DisplayPlace,
  isTeacher?: boolean,
) =>
  new Promise<{
    placeId: string;
    reason?: string;
  }>((success, fail) => {
    if (placeName === '교실')
      getHomeroom(...(isTeacher ? [student.grade, student.class] : [])).then(
        (e) => {
          if (e)
            success({
              placeId: e._id,
            });
        },
      );
    if (placeName === '인강실') {
      getIngangsil(student.grade)
        .then((ingangsilPlace) =>
          success({
            placeId: ingangsilPlace._id,
          }),
        )
        .catch((e) => fail(e));
    }
    // if (placeName === '세탁') {
    //   if (student.gender === Gender.F) {
    //     queryPlaceByName('우정').then((place) => {
    //       if (place)
    //         return success({
    //           placeId: place._id,
    //         });
    //     });
    //   } else {
    //     queryPlaceByName('학봉').then((place) => {
    //       if (place)
    //         return success({
    //           placeId: place._id,
    //         });
    //     });
    //   }
    // }
    if (placeName === '안정실') {
      queryPlaceByName('안정').then((place) => {
        if (place)
          return success({
            placeId: place._id,
          });
      });
    }
    if (placeName === '동아리실')
      showModal(
        (close) => (
          <OtherPlaceModal
            showOnly="CIRCLE"
            onSubmit={(name, placeId, reason) => {
              success({
                placeId,
                reason,
              });
              close();
            }}
          />
        ),
        {
          wrapperProps: {
            css: css`
              max-width: min(1080px, 100vw);
              padding: 60px 20px 20px;
            `,
          },
        },
      );
    if (placeName === '기타')
      return showModal(
        (close) => (
          <OtherPlaceModal
            onSubmit={(name, placeId, reason) => {
              success({
                placeId,
                reason,
              });
              close();
            }}
          />
        ),
        {
          wrapperProps: {
            css: css`
              max-width: min(1080px, 100vw);
              padding: 60px 20px 20px;
            `,
          },
        },
      );
    if (placeName === '결석') {
      queryPlaceByName('결석').then((place) => {
        if (!place) return;
        return showModal(
          (close) => (
            <InputFormModal
              form={[
                {
                  label: '사유',
                  placeholder: '사유를 입력해주세요',
                  required: true,
                },
              ]}
              onSubmit={(values) => {
                success({
                  placeId: place._id,
                  reason: values[0],
                });
                close();
              }}
            />
          ),
          {
            wrapperProps: {
              css: css`
                max-width: min(1080px, 100vw);
                padding: 60px 20px 20px;
              `,
            },
          },
        );
      });
    }
    if (placeName === '이동반') {
      const rawStored = getStoredMovingClass();
      if (!rawStored) {
        toast.info('이동반 정보를 찾을 수 없어요. 이동반 위치를 지정해주세요.');
        showModal(
          (close) => (
            <OtherPlaceModal
              presetReason="이동반"
              onSubmit={(name, placeId, reason) => {
                localStorage.setItem(
                  LocalstorageKeys.MOVINGCLASS,
                  JSON.stringify({
                    id: placeId,
                    name,
                  }),
                );
                success({
                  placeId,
                  reason,
                });
                close();
              }}
            />
          ),
          {
            wrapperProps: {
              css: css`
                max-width: min(1080px, 100vw);
                padding: 60px 20px 20px;
              `,
            },
          },
        );
        return;
      }
      return success({
        placeId: rawStored.id,
        reason: '이동반',
      });
    }
  });

export const getStoredMovingClass = (): { name: string; id: string } | null => {
  const stored = localStorage.getItem(LocalstorageKeys.MOVINGCLASS);
  if (stored) return JSON.parse(stored);
  else return null;
};
