import css from '@emotion/css';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { ReactComponent as CloseSvg } from '../../assets/icons/close.svg';
import { HeaderIconWrapper, Horizontal, NoData } from '../basic/Atomics';
import { Title as CardTitle } from '../basic/CardGroupHeader';
import Card from '../basic/Card';
import { ResponsiveWrapper } from '../layout/Cols';
import { getThisWeek } from '../../utils';
import { getWeeklyMeals } from '../../api';
import { days, SMALL_SCREEN_THRESHOLD } from '../../constants';

export interface DailyMealProps {
  header: string;
  meals?: string[];
  highlighted?: boolean;
  greyDivision: boolean;
}

const PERIOD_LABEL = ['아침', '점심', '저녁'];

const DailyMeal: React.FC<DailyMealProps> = ({
  header,
  meals,
  highlighted,
  greyDivision,
}) => (
  <DailyMealWrapper
    highlighted={highlighted}
    threshold={960}
    greyDivision={greyDivision}
  >
    <DailyMealHeader>{header}요일</DailyMealHeader>
    {meals ? (
      meals.map((meal, index) => (
        <React.Fragment key={meal}>
          <Label>{PERIOD_LABEL[index]}</Label>
          <DailyMealItem>
            {meal || <NoMealData>정보가 없습니다</NoMealData>}
          </DailyMealItem>
          <div
            css={css`
              margin: 0px 15px;
              @media screen and (max-width: 960px) {
                margin: 6px 0px;
              }
            `}
          />
        </React.Fragment>
      ))
    ) : (
      <NoMealData>정보가 없습니다</NoMealData>
    )}
  </DailyMealWrapper>
);

const NoMealData = styled(NoData)`
  @media screen and (max-width: 960px) {
    padding: 24px 0px;
  }
`;

const Label = styled.p`
  font-weight: 700;
  font-size: 18px;
  margin: 12px 0px 8px;
  display: none;

  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    font-size: 16px;
  }
`;

const DailyMealWrapper = styled(ResponsiveWrapper) <{
  highlighted?: boolean;
  greyDivision: boolean;
}>`
  padding: 24px 72px;
  justify-content: space-between;
  align-items: center;
  &:last-of-type {
    padding-bottom: 36px;
  }
  @media screen and (max-width: 960px) {
    align-items: unset;
    padding: 24px 36px;
    & > p {
      display: block;
    }
  }
  ${({ greyDivision }) =>
    greyDivision &&
    css`
      background-color: #fbfbfb;
    `}
  ${({ highlighted }) =>
    highlighted &&
    css`
      background-color: var(--main-theme-accent-background);
      & h2 {
        color: var(--main-theme-accent);
      }
      & p {
        color: #333333;
        font-weight: 700;
      }
    `}
`;
const DailyMealHeader = styled.h2`
  color: #8a8a8a;
  font-weight: 600;
  font-size: 22px;
  flex-basis: 1;
  flex-shrink: 0;

  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    font-size: 16px;
  }
`;
const DailyMealItem = styled.p`
  font-size: 18px;
  line-height: 36px;
  color: #8a8a8a;
  max-width: 20vw;
  @media screen and (max-width: 960px) {
    max-width: unset;
  }
  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    font-size: 14px;
    line-height: 20px;
  }
`;
const date = new Date();
const day = date.getDay() - 1;

export const MealList: React.FC<{ goBack(): void }> = ({ goBack }) => {
  const [meals, setMeals] = useState<DailyMealProps[]>();
  useEffect(() => {
    getWeeklyMeals(date)
      .then((meals) =>
        setMeals(() =>
          meals.map((meal, index) => ({
            header: days[index],
            meals:
              meal &&
              [meal.breakfast, meal.lunch, meal.dinner].map((meals) =>
                meals.join(' | '),
              ),
            highlighted: day === index,
            greyDivision: index % 2 === 0,
          })),
        ),
      )
      .catch(goBack);
  }, [goBack]);
  if (!meals) return <></>;
  return (
    <Card
      css={css`
        border-top: 5px solid var(--main-theme-accent);
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
        padding: 0px;
      `}
    >
      <HeaderWrapper>
        <CardTitle>주간 급식표</CardTitle>
        <ThisWeek>
          {date.getMonth() + 1}월 {getThisWeek(date)}째 주
        </ThisWeek>
        {goBack && (
          <HeaderIconWrapper>
            <CloseSvg onClick={goBack} />
          </HeaderIconWrapper>
        )}
      </HeaderWrapper>
      {meals.length ? meals.map((meal) => (
        <DailyMeal key={meal.header} {...meal} />
      )) : <NoData>등록된 급식이 없습니다</NoData>}
    </Card>
  );
};

const HeaderWrapper = styled(Horizontal)`
  margin: 36px 72px 24px;
  @media screen and (max-width: 960px) {
    margin: 24px 36px 18px;
  }
`;

const ThisWeek = styled(CardTitle)`
  font-weight: 400;
  margin-left: 24px;
  @media screen and (max-width: 540px) {
    display: none;
  }
`;

export default MealList;
