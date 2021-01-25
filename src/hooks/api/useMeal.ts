import { useEffect, useMemo, useState } from "react"
import { DailyMeal, getDailyMeal } from "../../api"

export const useMeal = (date?: Date) => {
    const [meal, setMeal] = useState<DailyMeal | null>(null)
    const dateKey = +(date||0)

    useEffect((...d) => {
        console.log('리렌더..', d)
        getDailyMeal(date).then(setMeal)
    }, [dateKey])
    return meal
}
