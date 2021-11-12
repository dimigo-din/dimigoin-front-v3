import bob from "@dimigo/dimibob-parser"
import { registerWeeklyMeal } from "../../../api"
import { engDays } from "../../../constants"
import { formatRequestableDate } from "../../../utils"

export const registerMealFromBytes = async (file: File) => {
    const parsed = await bob.parse(Buffer.from(await file.arrayBuffer()))
    const weeklyMeals = engDays.map((day, index) => ({
        ...parsed[day],
        date: parsed[day]?.date && formatRequestableDate(new Date(parsed[day].date))
    })).filter(e => e.date)
    return await registerWeeklyMeal(weeklyMeals)
}
