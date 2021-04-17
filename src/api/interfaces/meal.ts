import { DailyMeal } from '../../constants/types';

export interface AllMeal {
  method: 'GET';
  endpoint: '/meal';
  req: {};
  res: {
    meals: DailyMeal[];
  };
}

export interface GetDailyMeal {
  method: 'GET';
  endpoint: string;
  req: {};
  res: {
    meal: DailyMeal;
  };
}

export interface WeeklyMeals {
  method: 'GET';
  endpoint: '/meal/weekly';
  req: {};
  res: {
    meals: DailyMeal[];
  };
}
