import css from '@emotion/css'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { ReactComponent as CloseSvg } from '../assets/icons/close.svg'
import getMeals from '../functions/getMeals'
import useConsole from '../hooks/useConsole'
import { Horizontal } from './Atomics'
import { Title as CardTitle } from './CardGroupHeader'
import DimiCard from './dimiru/DimiCard'
import { Divider, ResponsiveWrapper } from './grids/Cols'

export interface IDailyMealProps {
  header: string;
  meals: string[];
  highlighted?: boolean;
}
const DailyMeal: React.FC<IDailyMealProps> = ({ header, meals, highlighted }) => <DailyMealWrapper highlighted={highlighted} threshold={960}>
  <DailyMealHeader>{header}요일</DailyMealHeader>
  {meals.map(meal =>
    <>
      <Divider data-divider small />
      <DailyMealItem>
        {meal}
      </DailyMealItem>
    </>
  )}

</DailyMealWrapper>

const DailyMealWrapper = styled(ResponsiveWrapper) <{ highlighted?: boolean }>`
  padding: 24px 72px;
  justify-content: space-between;
  align-items: center;
  &:last-of-type {
    padding-bottom: 36px;
  }
  @media screen and (max-width: 960px) {
    align-items: unset;
  }
  ${({ highlighted }) => highlighted && css`
    background-color: var(--main-theme-accent-background);
    & h2 {
      color: var(--main-theme-accent);
    }
    & p {
      color: #333333;
      font-weight: 700;
    }
  `}
`
const DailyMealHeader = styled.h2`
  color: #8a8a8a;
  font-weight: 700;
  font-size: 22px;
  flex-basis: 1;
  flex-shrink: 0;
`
const DailyMealItem = styled.p` 
  font-size: 18px;
  line-height: 36px;
  color: #8a8a8a;
  max-width: 20vw;
  @media screen and (max-width: 960px) {
    max-width: unset;
  }
`

const getThisWeek = (date: Date) => Math.ceil((date.getDate() - date.getDay() + 4) / 7)

const MealList: React.FC<{ goBack(): void }> = ({ goBack }) => {
  const [meals, setMeals] = useState<IDailyMealProps[]>();
  const date = new Date()
  useEffect(() => {
    getMeals(date)
      .then(setMeals)
      .catch(goBack)
  }, [])
  useConsole('meals', meals)
  if (!meals) return <></>
  return <DimiCard css={css`
    border-top: 5px solid var(--main-theme-accent);
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    padding: 0px;
  `}>
    <Horizontal css={css`margin: 36px 72px 24px;`}>
      <CardTitle>주간 급식표</CardTitle>
      <CardTitle css={css`font-weight: 400; margin-left: 24px;`}>{date.getMonth() + 1}월 {getThisWeek(date)}째 주</CardTitle>
      {goBack && <CloseWrapper><CloseSvg onClick={goBack} /></CloseWrapper>}
    </Horizontal>
    {meals?.map(meal => <DailyMeal {...meal} />)}

  </DimiCard>
}

const CloseWrapper = styled.div`
  flex: 1;
  text-align: right;
  color: #8a8a8a;
`

export default MealList