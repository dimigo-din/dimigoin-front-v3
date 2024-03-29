import { DailyMeal } from '../../constants/types';

export interface AllMeal {
  method: 'GET';
  endpoint: '/meal';
  needAuth: false;
  req: {};
  res: {
    meals: DailyMeal[];
  };
}

export interface GetDailyMeal {
  method: 'GET';
  endpoint: string;
  needAuth: false;
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

interface BEDailyMeal {
  date: string, // YYYY-MM-DD
  meals: {
    breakfast: string[],
    lunch: string[],
    dinner: string[],
  }
}

export interface RegisterWeeklyMeal {
  method: 'POST';
  endpoint: '/meal/date/:date';
  req: {
    weeklyMeals: BEDailyMeal[]
  }
  res: {
    meals: DailyMeal[]
  }
}
