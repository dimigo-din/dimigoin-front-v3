import { useEffect, useState } from "react"
import { getDailyMeal } from "../../api"
import { DailyMeal } from "../../constants/types"

export const useMeal = (dateStamp?: number) => {
    const [meal, setMeal] = useState<DailyMeal | undefined | null>(undefined)

    useEffect(() => {
        getDailyMeal(dateStamp ? new Date(dateStamp) : new Date())
            .then(setMeal)
            .catch(() => setMeal(() => null))
    }, [dateStamp])
    return meal
}
