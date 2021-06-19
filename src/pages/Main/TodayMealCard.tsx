import React, { useCallback } from 'react';
import css from '@emotion/css';
import {
  CardGroupHeader,
  MealList,
  showModal,
  TodayMeal,
} from '../../components';
import { SMALL_SCREEN_THRESHOLD } from '../../constants';
import { useMeal } from '../../hooks/api';

export const TodayMealCard: React.FC = () => {
  const meals = useMeal();
  const openWeekly = useCallback(() => {
    showModal((close) => <MealList goBack={close} />, {
      wrapperProps: {
        css: css`
          max-width: 1600px;
          width: 100%;
          padding: 60px 20px 20px;
          @media screen and (max-width: 960px) {
            padding-top: 40px;
          }
          @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
            padding: 0px;
          }
        `,
      },
    });
  }, []);
  return (
    <>
      <CardGroupHeader
        subButton={{
          text: '더보기',
          action: () => openWeekly(),
        }}
      >
        오늘의 급식
      </CardGroupHeader>
      <TodayMeal
        css={css`
          flex: 1;
        `}
        meals={meals}
      />
    </>
  );
};

export const fullHeight = css`
  display: flex;
  flex-direction: column;
`;
