import { useEffect, useState } from "react"
import { DailyMeal, getDailyMeal } from "../../api"

export const useMeal = (date?: Date) => {
    const [meal, setMeal] = useState<DailyMeal | null>(null)
    useEffect(() => {
        getDailyMeal(date).then(setMeal)
    }, [date]);
    return meal
}
