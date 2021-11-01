// import { DailyMealProps } from "../components/complex/MealList"
import { DailyMeal } from '../constants/types';
import { formatRequestableDate } from '../utils';
import { api } from './api';
// import { toast } from 'react-toastify'

// const DAYS = ['월', '화', '수', '목', '금', '토', '일']

// const today = +new Date()

export const getWeeklyMeals = async (date: Date): Promise<DailyMeal[]> =>
  (await api<'weeklyMeals'>('GET', '/meal/weekly')).meals;

export const getDailyMeal = (date: Date = new Date()) =>
  api<'dailyMeal'>('GET', `/meal/date/${formatRequestableDate(date)}`).then(
    (e) => e.meal,
  );

export const requestMentoringApplyInfoSheet = () =>
  api<'requestMentoringApplyInfoSheet'>(
    'POST',
    '/mentoring-application/export',
  ).then((e) => e.exportedFile);

export const registerWeeklyMeal = (meals: DailyMeal[]) => api<'registerWeeklyMeal'>('POST', '/meal/xlsxfile', {
  weeklyMeals: meals.map(meal => ({
    date: meal.date,
    meals: meal
  }))
}).then(e => e.meals)
