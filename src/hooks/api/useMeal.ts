import { useEffect, useState } from "react"
import { getDailyMeal } from "../../api"
import { DailyMeal } from "../../constants/types"

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
