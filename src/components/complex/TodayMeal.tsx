import React from 'react';
import styled from '@emotion/styled';
import css from '@emotion/css';
import Card from '../basic/Card';
import { DAILY_TIME_PERIOD, getTimePeriod } from '../../utils';
import { NoData } from '../basic';
import useConsole from '../../hooks/useConsole';
import Skeleton from 'react-loading-skeleton';
import { DailyMeal } from '../../constants/types';
import { SMALL_SCREEN_THRESHOLD } from '../../constants';

const MealItem: React.FC<MealItemSelected> = ({
  highlight: selected = false,
  name = '',
  menu = '',
}) => (
  <MealItemContainer highlight={selected}>
    <MealNameText highlight={selected}>{name}</MealNameText>
    <MealMenuText highlight={selected}>{menu}</MealMenuText>
  </MealItemContainer>
);

const Loader = () => (
  <MealItemContainer>
    <MealMenuText>
      <Skeleton count={2} />
    </MealMenuText>
  </MealItemContainer>
);

interface TodayMealProps {
  meals?: DailyMeal | null;
}

const NO_MEAL_DATA = '급식 정보가 없습니다';

export const TodayMeal: React.FC<TodayMealProps> = ({ meals, ...props }) => {
  const period = getTimePeriod();
  useConsole('MEALMEAL', meals);
  return (
    <MealCard
      {...props}
      css={
        meals === null &&
        css`
          padding: 25px;
        `
      }
    >
      {meals?.breakfast.length ||
      meals?.dinner.length ||
      meals?.lunch.length ? (
        <>
          <MealItem
            highlight={period === DAILY_TIME_PERIOD.MORNING}
            name="아침"
            menu={meals?.breakfast.join(', ') || NO_MEAL_DATA}
          />
          <MealItem
            highlight={period === DAILY_TIME_PERIOD.BEFORE_NOON}
            name="점심"
            menu={meals?.lunch.join(', ') || NO_MEAL_DATA}
          />
          <MealItem
            highlight={period === DAILY_TIME_PERIOD.EVENING}
            name="저녁"
            menu={meals?.dinner.join(', ') || NO_MEAL_DATA}
          />
        </>
      ) : meals === null ? (
        <NoData>{NO_MEAL_DATA}</NoData>
      ) : (
        <>
          <Loader />
          <Loader />
          <Loader />
        </>
      )}
    </MealCard>
  );
};

interface MealItemSelected {
  highlight?: boolean;
  name?: string;
  menu?: string;
}

const MealCard = styled(Card)`
  padding: 0;
  display: flex;
  flex-direction: column;
  & > * {
    flex: 1;
  }
`;

const MealItemContainer = styled.div<MealItemSelected>`
  width: calc(100% - 78px);
  flex-grow: 1;
  border-left: 5px solid transparent;
  padding: 24px 36px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${({ highlight: selected = false }) =>
    selected &&
    css`
      background-color: var(--main-theme-accent-background);
      border-left-color: var(--main-theme-accent);
    `}
`;

const MealNameText = styled.span<MealItemSelected>`
  font-size: 18px;
  font-weight: bold;
  line-height: 1.17;
  color: #d1d1d1;

  ${({ highlight: selected = false }) =>
    selected &&
    css`
      color: var(--main-theme-accent);
    `}

  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    font-size: 16px;
  }
`;

export const MealMenuText = styled.p<MealItemSelected>`
  font-size: 16px;
  font-weight: bold;
  line-height: 1.38;
  word-break: keep-all;
  margin-top: 12px;
  color: #d1d1d1;

  ${({ highlight: selected = false }) =>
    selected &&
    css`
      color: #111111;
    `}

  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    font-size: 14px;
  }
`;

export default TodayMeal;
