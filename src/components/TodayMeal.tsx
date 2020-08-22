import React from "react";
import styled from "@emotion/styled";
import DimiCard from "./dimiru/DimiCard";
import css from "@emotion/css";

const MealItem: React.FC<IMealItem> = ({
  selected = false,
  name = "",
  menu = "",
}) => (
  <MealItemContainer selected={selected}>
    <MealNameText selected={selected}>{name}</MealNameText>
    <MealMenuText selected={selected}>{menu}</MealMenuText>
  </MealItemContainer>
);

export interface IMeal {
  name: string;
  menu: string;
  selected?: boolean;
}

interface IProps {
  meals: IMeal[];
}

const TodayMeal: React.FC<IProps> = ({ meals }) => (
  <MealCard>
    {meals.map((meal) => (
      <MealItem key={meal.name} {...meal} />
    ))}
  </MealCard>
);

interface IMealItemSelected {
  selected?: boolean;
}

interface IMealItem extends IMealItemSelected {
  name?: string;
  menu?: string;
}

const MealCard = styled(DimiCard)`
  /* height: 100%; */
  padding: 0;
  display: flex;
  flex-direction: column;
`;
const MealItemContainer = styled.div<IMealItemSelected>`
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
      background-color: rgba(60, 112, 232, 0.04);
      border-left-color: #3c70e8;
    `}
`;

const MealNameText = styled.span<IMealItemSelected>`
  font-size: 18px;
  font-weight: bold;
  line-height: 1.17;
  color: #d1d1d1;

  ${({ selected = false }) =>
    selected &&
    css`
      color: #3c70e8;
    `}
`;

const MealMenuText = styled.p<IMealItemSelected>`
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
