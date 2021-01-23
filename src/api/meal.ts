import { DailyMealProps } from "../components/complex/MealList"
import { IMeal } from "../constants/serverResource"
import api from "./api"
import { toast } from 'react-toastify'

const DAYS = ['월', '화', '수', '목', '금', '토', '일']

export const getWeeklyMeals = async (date: Date): Promise<DailyMealProps[]> => {
  const { data } = (await api.get<IMeal[]>(`meal/${date.toISOString().substr(0, 10)}`))
  try {
    return data.map(e => {
      const parsedDay = new Date(e.date).getDay()
      return {
        header: DAYS[parsedDay],
        meals: [e.breakfast.join(' | '), e.lunch.join(' | '), e.dinner.join(' | ')],
        highlighted: parsedDay === date.getDay()
      }
    })
  } catch (e) {
    toast('알 수 없는 처리 오류입니다 : Frontend', {
      type: 'error'
    })
    throw e
  }
}
