import React from "react";
import styled from "@emotion/styled";
import css from "@emotion/css";
import Card from "../basic/Card";
import { DailyMeal } from "../../api/serverResource";

const MealItem: React.FC<MealItem> = ({
  selected = false,
  name = "",
  menu = "",
}) => (
    <MealItemContainer selected={selected}>
      <MealNameText selected={selected}>{name}</MealNameText>
      <MealMenuText selected={selected}>{menu}</MealMenuText>
    </MealItemContainer>
  );

interface TodayMealProps {
  meals: DailyMeal | null;
}

export const TodayMeal: React.FC<TodayMealProps> = ({ meals, ...props }) => (
  <MealCard {...props}>
    <MealItem name="아침" menu={meals?.breakfast.join(', ')} />
    <MealItem name="점심" menu={meals?.lunch.join(', ')} />
    <MealItem name="저녁" menu={meals?.dinner.join(', ')} />
  </MealCard>
);

interface MealItemSelected {
  selected?: boolean;
}

interface MealItem extends MealItemSelected {
  name?: string;
  menu?: string;
}

const MealCard = styled(Card)`
  /* height: 100%; */
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const MealItemContainer = styled.div<MealItemSelected>`
  width: calc(100% - 78px);
  flex-grow: 1;
  border-left: 5px solid transparent;
  padding: 24px 39px 24px 34px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${({ selected = false }) =>
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

  ${({ selected = false }) =>
    selected &&
    css`
      color: var(--main-theme-accent);
    `}
`;

export const MealMenuText = styled.p<MealItemSelected>`
  font-size: 16px;
  font-weight: bold;
  line-height: 1.38;
  word-break: keep-all;
  margin-top: 12px;
  color: #d1d1d1;

  ${({ selected = false }) =>
    selected &&
    css`
      color: #111111;
    `}
`;

export default TodayMeal;
