// import { DailyMealProps } from "../components/complex/MealList"
import { DailyMeal } from "../constants/types"
import { formatRequestableDate } from "../utils"
import { api } from "./api"
// import { toast } from 'react-toastify'

// const DAYS = ['월', '화', '수', '목', '금', '토', '일']

// const today = +new Date()

export const getWeeklyMeals = async (date: Date): Promise<DailyMeal[]> => {
  const raw = (await api<"weeklyMeals">("GET", "/meal/weekly")).meals
  return raw
    .reduce<DailyMeal[]>((matched, current) => {
      const index = (new Date(current.date)).getDay()
      return [
        ...matched.slice(0, index),
        current,
        ...matched.slice(index + 1)
      ]
    }, [...Array(7)]) 
  
  // return []
}

export const getDailyMeal = (date: Date = new Date()) => {
  return api<"dailyMeal">('GET', `/meal/date/${formatRequestableDate(date)}`).then(e => e.meal)
}

export const requestMentoringApplyInfoSheet = () =>
  api<"requestMentoringApplyInfoSheet">("POST", "/mentoring-application/export").then(e => e.exportedFile)
