import bob from "@dimigo/dimibob-parser"
import { registerWeeklyMeal } from "../../../api"
import { engDays } from "../../../constants"
import { DailyMeal, EngDay } from "../../../constants/types"
import { formatRequestableDate } from "../../../utils"

const daySymbolToDate = (symbol: EngDay) => {
    const date = new Date()
    const thisWeekMon = new Date(+date + (-date.getDay() + engDays.indexOf(symbol) + 1) * 1000 * 60 * 60 * 24)
    return thisWeekMon
}

export const registerMealFromBytes = async (file: File) => {
    const parsed = await bob.parse(Buffer.from(await file.arrayBuffer()))
    const weeklyMeals: DailyMeal[] = (engDays as EngDay[]).map((day, index) => ({
        ...parsed[day],
        date: formatRequestableDate(daySymbolToDate(day))
    }))
    return await registerWeeklyMeal(weeklyMeals)
}
