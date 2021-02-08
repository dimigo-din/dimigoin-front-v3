import { useEffect, useState } from "react"
import { DailyMeal, getDailyMeal } from "../../api"

export const useMeal = (date?: Date) => {
    const [meal, setMeal] = useState<DailyMeal | undefined | null>(undefined)
    const dateKey = +(date||0)

    useEffect(() => {
        getDailyMeal(date)
            .then(setMeal)
            .catch(() => setMeal(() => null))
    }, [dateKey])
    return meal
}
