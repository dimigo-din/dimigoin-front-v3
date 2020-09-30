import css from '@emotion/css'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { IMeal } from '../constants/types'
import { Horizontal } from './Atomics'
import { Title as CardTitle } from './CardGroupHeader'
import DimiCard from './dimiru/DimiCard'
import { ResponsiveWrapper, SmallDivider } from './grids/Cols'

interface IDailyMealProps {
  header: string;
  meals: string[]
}
const DailyMeal: React.FC<IDailyMealProps> = ({ header, meals }) => <DailyMealWrapper threshold={960}>
  <DailyMealHeader>{DailyMeal}</DailyMealHeader>
  {meals.map(meal =>
    <>
      <SmallDivider />
      <DailyMealItem>
        {meal}
      </DailyMealItem>
    </>
  )}

</DailyMealWrapper>

const DailyMealWrapper = styled(ResponsiveWrapper)`
  padding: 24px 0px;
  justify-content: space-between;
  align-items: center;
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

const MealList: React.FC = () => {
  const [meals, setMeals] = useState<IMeal[]>();
  useEffect(() => {
    // getMeals()
  }, [])
  return <DimiCard css={css`
    border-top: 5px solid #3c70e8;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    padding: 36px 72px;
  `}>
    <Horizontal>
      <CardTitle>주간 급식표</CardTitle>
      <CardTitle css={css`font-weight: 400; margin-left: 24px;`}>13월 3274째 주</CardTitle>
    </Horizontal>

    {/* <DailyMeal /> */}
  </DimiCard>
}

export default MealList